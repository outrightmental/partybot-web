angular.module('partybotWebApp')
  .factory('socket', function ($rootScope) {
    'use strict';
    var socket = {};
    /* jshint ignore:start */
    if (typeof io !== 'undefined') {
      socket = io.connect();
    } else {
      return {};
    }
    /* jshint ignore:end */
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }
    };
  });
