'use strict';

angular
  .module('pjApp')
  .config(function($stateProvider) {

    $stateProvider
      .state('app.password-forgot', {
        url: '/password/forgot',
        templateUrl: '/views/password/forgot.html',
        controller: 'PasswordForgotCtrl'
      })
      .state('app.password-reset', {
        url: '/password/reset/:token',
        templateUrl: '/views/password/reset.html',
        controller: 'PasswordResetCtrl',
        resolve: {
          token: function($stateParams) {
            return $stateParams.token;
          }
        }
      });
  });
