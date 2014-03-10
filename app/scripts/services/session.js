'use strict';

angular.module('fngbVideotournamentWebApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
