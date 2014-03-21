'use strict';

angular.module('partybotWebApp')
  .service('Message', function ($resource) {
    return $resource('api/messages/:messageId', {
      messageId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
