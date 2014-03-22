'use strict';

angular.module('partybotWebApp')
  .service('Broadcast', function ($resource) {
    return $resource('api/broadcasts/:broadcastId', {
      broadcastId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
