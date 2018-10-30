  'use strict';

angular
  .module('pjApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.select',
    'ui.bootstrap.datetimepicker',
    'monospaced.elastic',
    'config'
  ])
  .constant('_', window._)
  .constant('str', window.s)
  .constant('moment', window.moment)
  .constant('markdown', window.markdown)
  .config(function ($httpProvider, $urlRouterProvider) {

    /* Prepare all API calls */
    $httpProvider.interceptors.push('ApiInterceptor');

    /* Redirect to /login if no route matches */
    $urlRouterProvider.otherwise('/signin');
  })
  .run(function($rootScope, $state) {

    /* Assume that we couldn't change state because of missing authorization */
    $rootScope.$on('$stateChangeError', function() {
      $state.go('app.signin');
    });
  });
