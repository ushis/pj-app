'use strict';

angular
  .module('pjApp')
  .config(function($stateProvider) {

    $stateProvider
      .state('app.signup', {
        url: '/signup',
        templateUrl: 'views/profile/new.html',
        controller: 'ProfileNewCtrl'
      })
      .state('app.profile', {
        url: '/profile',
        abstract: true,
        templateUrl: 'views/profile/show.html'
      })
      .state('app.profile.edit', {
        url: '/edit',
        templateUrl: 'views/profile/edit.html',
        controller: 'ProfileEditCtrl'
      })
      .state('app.profile.password', {
        url: '/password',
        templateUrl: 'views/profile/password.html',
        controller: 'ProfilePasswordCtrl'
      })
      .state('app.profile.delete', {
        url: '/delete',
        templateUrl: 'views/profile/delete.html',
        controller: 'ProfileDeleteCtrl'
      });
  });
