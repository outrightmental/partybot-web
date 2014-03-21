'use strict';

angular.module('partybotWebApp')
  .controller('MainCtrl', function ($scope, $timeout, Message, $) {

    var $party = $('#party');
    $scope.messages = [];

    // watch the messages array for changes and update the counts
    $scope.$watch('messages', function () {
      console.log('messages updated');
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
      $party.html('<h1>' + message.content + '</h1>');
      message.state = 'completed';
      message.$update();
    }

    /**
     *
     */
    function reset() {
      $party.html('<div class="logo"></div>');
    }

    // when the controller is destroyed, cancel the polling
    $scope.$on('destroy', function () {
      $timeout.cancel($scope.promise);
    });
  });
