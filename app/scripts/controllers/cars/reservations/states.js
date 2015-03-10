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
      });
  });
