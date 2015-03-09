'use strict';

angular
  .module('pjApp')
  .config(function($stateProvider) {

    $stateProvider
      .state('app.car.location', {
        url: '/location',
        templateUrl: 'views/cars/location/show.html',
        controller: 'CarsLocationShowCtrl'
      });
  });
