'use strict';

angular.module('partybotWebApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/chat', {
        templateUrl: 'partials/chat',
        controller: 'ChatCtrl'
      })
    /**
     * Admin Messages
     */
      .when('/admin/message', {
        templateUrl: 'partials/admin/message/index',
        controller: 'AdminMessageIndexCtrl',
      })
      .when('/admin/message/:messageId', {
        templateUrl: 'partials/admin/message/edit',
        controller: 'AdminMessageEditCtrl',
      })

    /**
     *  Broadcasts
     */
      .when('/broadcast', {
        templateUrl: 'partials/broadcast/index',
        controller: 'BroadcastIndexCtrl'
      })
      .when('/broadcast/:broadcastId', {
        templateUrl: 'partials/broadcast/edit',
        controller: 'BroadcastEditCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
      
    
    $locationProvider.html5Mode(true);
      
    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  });