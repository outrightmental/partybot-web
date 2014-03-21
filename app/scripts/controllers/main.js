'use strict';

angular.module('partybotWebApp')
  .controller('MainCtrl', function ($scope, $timeout, Message) {

    $scope.messages = [];
    $scope.mainMessage = null;

    // watch the messages array for changes and update the counts
    $scope.$watch('messages', function () {
    }, true);

    // Poll server to regularly update messages
    (function refreshMessages() {
      Message.query(function (response) {
        $scope.messages = response;
        if ($scope.messages.length) {
          processMessage($scope.messages.pop());
        } else {
          reset();
        }
        $scope.promise = $timeout(refreshMessages, 1000);
      });
    })();

    /**
     *
     * @param message
     */
    function processMessage(message) {
      if (message && message.content && message.content.length) {
        $scope.mainMessage = message.content;
      }
      message.state = 'completed';
      message.$update();
    }

    /**
     *
     */
    function reset() {
      $scope.mainMessage = null;
    }

    // when the controller is destroyed, cancel the polling
    $scope.$on('destroy', function () {
      $timeout.cancel($scope.promise);
    });
  });
