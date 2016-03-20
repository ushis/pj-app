'use strict';

angular
  .module('pjApp')
  .config(function($stateProvider, moment) {

    $stateProvider
      .state('app.car.reservations', {
        url: '/reservations/{date:[0-9]{4}-[0-9]{2}}',
        templateUrl: 'views/cars/reservations/index.html',
        controller: 'CarsReservationsIndexCtrl',
        params: {
          date: {
            value: function() {
              return moment().format('YYYY-MM');
            }
          }
        },
        resolve: {
          date: function($stateParams) {
            return moment($stateParams.date).startOf('month');
          },
          reservations: function(Reservation, $stateParams, date) {
            return Reservation.query({
              carId: $stateParams.carId,
              after: date.format(),
              before: date.clone().endOf('month').format(),
              orderBy: 'starts_at',
              perPage: 100
            }).$promise;
          }
        }
      })
      .state('app.car.reservation-new', {
        url: '/reservations/new',
        templateUrl: 'views/cars/reservations/new.html',
        controller: 'CarsReservationsNewCtrl'
      })
      .state('app.car.reservation', {
        url: '/reservations/{reservationId:int}',
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
