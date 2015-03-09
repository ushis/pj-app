'use strict';

angular
  .module('pjApp')
  .config(function($stateProvider) {

    $stateProvider
      .state('app.car.rides', {
        url: '/rides',
        templateUrl: 'views/cars/rides/index.html',
        controller: 'CarsRidesIndexCtrl',
        resolve: {
          rides: function(_, Ride, $stateParams) {
            var params = _.extend({
              orderBy: 'started_at',
              order: 'desc'
            }, $stateParams);

            return Ride.query(params).$promise;
          }
        }
      })
      .state('app.car.ride-new', {
        url: '/rides/new',
        templateUrl: 'views/cars/rides/new.html',
        controller: 'CarsRidesNewCtrl'
      })
      .state('app.car.ride', {
        url: '/ride/:rideId',
        abstract: true,
        templateUrl: 'views/cars/rides/show.html',
        controller: 'CarsRidesShowCtrl',
        resolve: {
          ride: function(Ride, $stateParams) {
            return Ride.get($stateParams).$promise;
          }
        }
      })
      .state('app.car.ride.edit', {
        url: '/edit',
        templateUrl: 'views/cars/rides/edit.html',
        controller: 'CarsRidesEditCtrl'
      });
  });
