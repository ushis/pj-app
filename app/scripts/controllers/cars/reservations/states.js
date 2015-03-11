'use strict';

angular
  .module('pjApp')
  .config(function($stateProvider) {

    $stateProvider
      .state('app.car.reservations', {
        url: '/reservations',
        templateUrl: 'views/cars/reservations/index.html',
        controller: 'CarsReservationsIndexCtrl',
        resolve: {
          reservations: function(_, Reservation, $stateParams) {
            var params = _.extend({
              after: moment().startOf('month').format(),
              before: moment().endOf('month').format(),
              orderBy: 'starts_at',
              perPage: 100
            }, $stateParams);

            return Reservation.query(params).$promise;
          }
        }
      })
      .state('app.car.reservation-new', {
        url: '/reservations/new',
        templateUrl: 'views/cars/reservations/new.html',
        controller: 'CarsReservationsNewCtrl'
      })
      .state('app.car.reservation', {
        url: '/reservations/:reservationId',
        abstract: true,
        templateUrl: 'views/cars/reservations/show.html',
        controller: 'CarsReservationsShowCtrl',
        resolve: {
          reservation: function(Reservation, $stateParams) {
            return Reservation.get($stateParams).$promise;
          }
        }
      })
      .state('app.car.reservation.edit', {
        url: '/edit',
        templateUrl: 'views/cars/reservations/edit.html',
        controller: 'CarsReservationsEditCtrl'
      });
  });
