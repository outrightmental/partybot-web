'use strict';

angular.module('partybotWebApp')
  .controller('BroadcastIndexCtrl', function ($scope, $timeout, Broadcast, filterFilter, $location) {
    $scope.broadcasts = [];
    $scope.newBroadcast = '';
    $scope.editedBroadcast = null;
    // set the filter status to the initial search query if it exists
    $scope.status = $location.search().q || '';

    // watch the broadcasts array for changes and update the counts
    $scope.$watch('broadcasts', function () {
      $scope.remainingCount = filterFilter($scope.broadcasts, { completed: false }).length;
      $scope.completedCount = $scope.broadcasts.length - $scope.remainingCount;
      $scope.allChecked = !$scope.remainingCount;
    }, true);

    // monitor the current location for changes and adjust the filter accordingly
    $scope.$on('$locationChangeSuccess', function () {
      var status = $scope.status = $location.search().q || '';
      $scope.statusFilter = (status === 'active') ?
      { completed: false } : (status === 'completed') ?
      { completed: true } : null;
    });

    // create a new broadcast locally save it remotely
    $scope.addBroadcast = function () {
      var broadcastName = $scope.newBroadcast.trim();
      if (!broadcastName.length) {
        return;
      }

      var newBroadcast = new Broadcast({
        content: broadcastName
      });
      newBroadcast.$save();
      $scope.broadcasts.unshift(newBroadcast);
      $scope.newBroadcast = '';
    };

    // remove broadcast locally and remotely
    $scope.removeBroadcast = function (id) {
      /*
      if (!confirm('Are you sure you want to delete this Broadcast?')) {
        return;
      }
      */
      $scope.broadcasts[id].$remove();
      $scope.broadcasts.splice(id, 1);
    };

    // begin editing a broadcast, save the original in case of cancel
    $scope.editBroadcast = function (id) {
      $location.path('/broadcast/' + $scope.broadcasts[id]._id);
      /*
       $scope.editedBroadcast = $scope.broadcasts[id];
       $scope.originalBroadcast = angular.extend({}, $scope.editedBroadcast);
       */
    };

    /*
     $scope.isEditing = function (id) {
     if ($scope.editedBroadcast) {
     console.log($scope.editedBroadcast._id == $scope.broadcasts[id]._id);
     return $scope.editedBroadcast._id == $scope.broadcasts[id]._id;
     }
     return false;
     }
     */

    /*
     // update when done editing, or if name is erased remove the broadcast
     $scope.doneEditing = function (id) {
     $scope.editedBroadcast = null;
     var name = $scope.broadcasts[id].name.trim();
     if (name) {
     $scope.broadcasts[id].$update();
     } else {
     $scope.removeBroadcast(id);
     }
     };

     // revert the edited broadcast back to what it was
     $scope.revertEditing = function (id) {
     $scope.broadcasts[id] = $scope.originalBroadcast;
     $scope.doneEditing(id);
     };
     */

    // toggle broadcast completed, and update remotely
    $scope.toggleCompleted = function (id) {
      var broadcast = $scope.broadcasts[id];
      broadcast.completed = !broadcast.completed;
      broadcast.$update();
    };

    // remove completed broadcasts locally and from server
    $scope.clearCompletedBroadcasts = function () {
      var remainingBroadcasts = [];
      angular.forEach($scope.broadcasts, function (broadcast) {
        if (broadcast.completed) {
          broadcast.$remove();
        } else {
          remainingBroadcasts.push(broadcast);
        }
      });
      $scope.broadcasts = remainingBroadcasts;
    };

    // mark all as completed or not, then update remotely
    $scope.markAll = function (allCompleted) {
      angular.forEach($scope.broadcasts, function (broadcast) {
        broadcast.completed = !allCompleted;
        broadcast.$update();
      });
    };

    // Poll server to regularly update broadcasts
    (function refreshBroadcasts() {
      Broadcast.query(function (response) {
        // Update broadcasts if a broadcast is not being edited
        if ($scope.editedBroadcast === null) {
          $scope.broadcasts = response;
        }
        $scope.promise = $timeout(refreshBroadcasts, 1000);
      });
    })();

    // when the controller is destroyed, cancel the polling
    $scope.$on('destroy', function () {
      $timeout.cancel($scope.promise);
    });
  });