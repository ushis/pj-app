'use strict';

angular
  .module('pjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.signin', {
        url: '/signin',
        templateUrl: 'views/sessions/new.html',
        controller: 'SessionsNewCtrl'
      });
  });
