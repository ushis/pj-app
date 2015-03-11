'use strict';

angular
  .module('pjApp')
  .controller('CarsReservationsEditCtrl',
    function(_, moment, $scope, $state, Reservation) {

    $scope.tmpReservation = _.extend({}, $scope.reservation, {
      startsAt: moment($scope.reservation.startsAt),
      endsAt: moment($scope.reservation.endsAt)
    });

    $scope.submit = function() {
      var params = {
        carId: $scope.car.id,
        reservationId: $scope.reservation.id
      };

      var data = {
        startsAt: $scope.tmpReservation.startsAt.toString(),
        endsAt: $scope.tmpReservation.endsAt.toString()
      };

      Reservation.update(params, {reservation: data}).$promise
        .then(function(resp) {
          _.extend($scope.reservation, resp.reservation);
          $scope.reloadCar();
          $state.go('app.car.reservation.comments', params);
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  });
