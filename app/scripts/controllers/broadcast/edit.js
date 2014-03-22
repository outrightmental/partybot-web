'use strict';

angular.module('partybotWebApp')
  .controller('BroadcastEditCtrl', function ($scope, $timeout, Broadcast, filterFilter, $location, $route) {
    if ($route && $route.current && $route.current.params)
      $scope.broadcastId = $route.current.params.broadcastId;

    if (!$scope.broadcastId)
      $location.path('/admin/broadcast');

    $scope.broadcast = Broadcast.get({broadcastId: $scope.broadcastId}, function(broadcast) {
    });

    // watch the broadcast object for changes
    $scope.$watch('broadcast', function () {

    }, true);

    // remove broadcast locally and remotely
    $scope.removeBroadcast = function () {
      if (!confirm('Are you sure you want to delete this Broadcast?')) {
        return;
      }
      $scope.broadcast.$remove();
      $location.path('/admin/broadcast')
    };

    // update broadcast
    $scope.saveBroadcast = function() {
      $scope.broadcast.$update();
      $location.path('/admin/broadcast')
    }


    /*
     $scope.matches = [];
     $scope.newMatch = '';
     $scope.editedMatch = null;
     // set the filter status to the initial search query if it exists
     $scope.status = $location.search().q || '';

     // watch the matches array for changes and update the counts
     $scope.$watch('matches', function () {
     $scope.remainingCount = filterFilter($scope.matches, { completed: false }).length;
     $scope.completedCount = $scope.matches.length - $scope.remainingCount;
     $scope.allChecked = !$scope.remainingCount;
     }, true);

     // monitor the current location for changes and adjust the filter accordingly
     $scope.$on('$locationChangeSuccess', function () {
     var status = $scope.status = $location.search().q || '';
     $scope.statusFilter = (status === 'active') ?
     { completed: false } : (status === 'completed') ?
     { completed: true } : null;
     });

     // create a new match locally save it remotely
     $scope.addMatch = function () {
     var matchTitle = $scope.newMatch.trim();
     if (!matchTitle.length) {
     return;
     }

     var newMatch = new Match({
     title: matchTitle,
     completed: false
     });
     newMatch.$save();
     $scope.matches.push(newMatch);
     $scope.newMatch = '';
     };

     // remove match locally and remotely
     $scope.removeMatch = function (id) {
     if (!confirm('Are you sure you want to delete this Match?')) {
     return;
     }
     $scope.matches[id].$remove();
     $scope.matches.splice(id, 1);
     };

     // begin editing a match, save the original in case of cancel
     $scope.editMatch = function (id) {
     $location.path('/admin/match/'+$scope.matches[id]._id);
     };

     $scope.isEditing = function (id) {
     if ($scope.editedMatch) {
     console.log($scope.editedMatch._id == $scope.matches[id]._id);
     return $scope.editedMatch._id == $scope.matches[id]._id;
     }
     return false;
     }

     // update when done editing, or if title is erased remove the match
     $scope.doneEditing = function (id) {
     $scope.editedMatch = null;
     var title = $scope.matches[id].title.trim();
     if (title) {
     $scope.matches[id].$update();
     } else {
     $scope.removeMatch(id);
     }
     };

     // revert the edited match back to what it was
     $scope.revertEditing = function (id) {
     $scope.matches[id] = $scope.originalMatch;
     $scope.doneEditing(id);
     };

     // toggle match completed, and update remotely
     $scope.toggleCompleted = function (id) {
     var match = $scope.matches[id];
     match.completed = !match.completed;
     match.$update();
     };

     // remove completed matches locally and from server
     $scope.clearCompletedMatches = function () {
     var remainingMatches = [];
     angular.forEach($scope.matches, function (match) {
     if (match.completed) {
     match.$remove();
     } else {
     remainingMatches.push(match);
     }
     });
     $scope.matches = remainingMatches;
     };

     // mark all as completed or not, then update remotely
     $scope.markAll = function (allCompleted) {
     angular.forEach($scope.matches, function (match) {
     match.completed = !allCompleted;
     match.$update();
     });
     };

     // Poll server to regularly update matches
     (function refreshMatches() {
     Match.query(function (response) {
     // Update matches if a match is not being edited
     if ($scope.editedMatch === null) {
     $scope.matches = response;
     }
     $scope.promise = $timeout(refreshMatches, 5000);
     });
     })();

     // when the controller is destroyed, cancel the polling
     $scope.$on('destroy', function () {
     $timeout.cancel($scope.promise);
     });
     */
  });