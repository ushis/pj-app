'use strict';

angular
  .module('pjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.cars', {
        url: '/cars',
        templateUrl: 'views/cars/index.html',
        controller: 'CarsIndexCtrl',
        resolve: {
          cars: function(Car) {
            return Car.query({orderBy: 'name'}).$promise;
          }
        }
      })
      .state('app.car-new', {
        url: '/cars/new',
        templateUrl: 'views/cars/new.html',
        controller: 'CarsNewCtrl'
      })
      .state('app.car', {
        url: '/cars/:carId',
        abstract: true,
        templateUrl: 'views/cars/show.html',
        controller: 'CarsShowCtrl',
        resolve: {
          car: function(Car, $stateParams) {
            return Car.get($stateParams).$promise;
          }
        }
      })
      .state('app.car.edit', {
        url: '/edit',
        templateUrl: 'views/cars/edit.html',
        controller: 'CarsEditCtrl'
      })
      .state('app.car.delete', {
        url: '/delete',
        templateUrl: 'views/cars/delete.html',
        controller: 'CarsDeleteCtrl'
      });
  });
