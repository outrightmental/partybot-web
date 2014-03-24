'use strict';

angular.module('partybotWebApp')
  .controller('MainCtrl', function ($scope, $timeout, BroadcastNow) {

    $scope.broadcast = null;

    // watch the broadcasts array for changes and update the counts
    $scope.$watch('broadcast', function () {
    }, true);

    // Poll server to regularly update broadcasts
    (function refreshBroadcasts() {

      BroadcastNow.get({}, function (broadcast) {
        if (broadcast && broadcast._id) {
          $scope.broadcast = broadcast;
        } else {
          $scope.broadcast = null;
        }
      });

      $scope.promise = $timeout(refreshBroadcasts, 1000);

      /*
       BroadcastNow.query(function (response) {
       //        $scope.broadcasts = response;
       if (response && response.length) {
       console.log('BALLS', response);
       } else {
       $scope.broadcast = null;
       }

       });
       */
    })();

    /**
     * get template of broadcast
     * @param broadcast
     * @returns string
     */
    $scope.template = function (broadcast) {
      if (broadcast && 'type' in broadcast) {
        return 'partials/broadcast/type/' + broadcast.type;
      }
      return null;
    };

  });
