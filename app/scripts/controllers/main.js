'use strict';

angular.module('partybotWebApp')
  .controller('MainCtrl', function ($scope, $timeout, BroadcastNow) {

    $scope.mainBroadcast = null;

    // watch the broadcasts array for changes and update the counts
    $scope.$watch('mainBroadcast', function () {
    }, true);

    // Poll server to regularly update broadcasts
    (function refreshBroadcasts() {

      BroadcastNow.get({}, function (broadcast) {
        if (broadcast && broadcast._id) {
          $scope.mainBroadcast = broadcast;
        } else {
          $scope.mainBroadcast = null;
        }
      });

      $scope.promise = $timeout(refreshBroadcasts, 1000);

      /*
       BroadcastNow.query(function (response) {
       //        $scope.broadcasts = response;
       if (response && response.length) {
       console.log('BALLS', response);
       } else {
       $scope.mainBroadcast = null;
       }

       });
       */
    })();

  });
