'use strict';

angular.module('partybotWebApp')
  .controller('AdminMessageIndexCtrl', function ($scope, $timeout, Message, filterFilter, $location) {
    $scope.messages = [];
    $scope.newMessage = '';
    $scope.editedMessage = null;
    // set the filter status to the initial search query if it exists
    $scope.status = $location.search().q || '';

    // watch the messages array for changes and update the counts
    $scope.$watch('messages', function () {
      $scope.remainingCount = filterFilter($scope.messages, { completed: false }).length;
      $scope.completedCount = $scope.messages.length - $scope.remainingCount;
      $scope.allChecked = !$scope.remainingCount;
    }, true);

    // monitor the current location for changes and adjust the filter accordingly
    $scope.$on('$locationChangeSuccess', function () {
      var status = $scope.status = $location.search().q || '';
      $scope.statusFilter = (status === 'active') ?
      { completed: false } : (status === 'completed') ?
      { completed: true } : null;
    });

    // create a new message locally save it remotely
    $scope.addMessage = function () {
      var messageName = $scope.newMessage.trim();
      if (!messageName.length) {
        return;
      }

      var newMessage = new Message({
        content: '{message: "' + messageName + '"}'
      });
      newMessage.$save();
      $scope.messages.push(newMessage);
      $scope.newMessage = '';
    };

    /*
     // remove message locally and remotely
     $scope.removeMessage = function (id) {
     if (!confirm('Are you sure you want to delete this Message?')) {
     return;
     }
     $scope.messages[id].$remove();
     $scope.messages.splice(id, 1);
     };
     */

    // begin editing a message, save the original in case of cancel
    $scope.editMessage = function (id) {
      $location.path('/admin/message/' + $scope.messages[id]._id);
      /*
       $scope.editedMessage = $scope.messages[id];
       $scope.originalMessage = angular.extend({}, $scope.editedMessage);
       */
    };

    /*
     $scope.isEditing = function (id) {
     if ($scope.editedMessage) {
     console.log($scope.editedMessage._id == $scope.messages[id]._id);
     return $scope.editedMessage._id == $scope.messages[id]._id;
     }
     return false;
     }
     */

    /*
     // update when done editing, or if name is erased remove the message
     $scope.doneEditing = function (id) {
     $scope.editedMessage = null;
     var name = $scope.messages[id].name.trim();
     if (name) {
     $scope.messages[id].$update();
     } else {
     $scope.removeMessage(id);
     }
     };

     // revert the edited message back to what it was
     $scope.revertEditing = function (id) {
     $scope.messages[id] = $scope.originalMessage;
     $scope.doneEditing(id);
     };
     */

    // toggle message completed, and update remotely
    $scope.toggleCompleted = function (id) {
      var message = $scope.messages[id];
      message.completed = !message.completed;
      message.$update();
    };

    // remove completed messages locally and from server
    $scope.clearCompletedMessages = function () {
      var remainingMessages = [];
      angular.forEach($scope.messages, function (message) {
        if (message.completed) {
          message.$remove();
        } else {
          remainingMessages.push(message);
        }
      });
      $scope.messages = remainingMessages;
    };

    // mark all as completed or not, then update remotely
    $scope.markAll = function (allCompleted) {
      angular.forEach($scope.messages, function (message) {
        message.completed = !allCompleted;
        message.$update();
      });
    };

    // Poll server to regularly update messages
    (function refreshMessages() {
      Message.query(function (response) {
        // Update messages if a message is not being edited
        if ($scope.editedMessage === null) {
          $scope.messages = response;
        }
        $scope.promise = $timeout(refreshMessages, 1000);
      });
    })();

    // when the controller is destroyed, cancel the polling
    $scope.$on('destroy', function () {
      $timeout.cancel($scope.promise);
    });
  });