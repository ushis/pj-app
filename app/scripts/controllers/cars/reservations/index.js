'use strict';

angular
  .module('pjApp')
  .controller('CarsReservationsIndexCtrl',
    function($scope, reservations, Reservation) {

    $scope.reservations = reservations.reservations;
    $scope.meta = reservations.meta;

  });
