'use strict';

angular.module('partybotWebApp')
  .service('BroadcastNow', function ($resource) {
    return $resource('api/broadcasts/now', {
    }, {
      update: {
        method: 'GET'
      }
    });
  });
