'use strict';

angular
  .module('pjApp')
  .controller('CarsReservationsIndexCtrl',
    function(moment, $scope, $state, reservations, date) {

    $scope.date = date;

    $scope.items = reservations.reservations.map(function(reservation) {
      return {
        id: reservation.id,
        title: reservation.user.username,
        cancelled: !!reservation.cancelation,
        startsAt: moment(reservation.startsAt),
        endsAt: moment(reservation.endsAt)
      };
    });

    $scope.goTo = function(item) {
      $state.go('app.car.reservation.comments', {
        carId: $scope.car.id,
        reservationId: item.id
      });
    };
  });
