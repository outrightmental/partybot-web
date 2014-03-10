'use strict';

angular.module('partybotWebApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
