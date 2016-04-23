'use strict';

angular
  .module('pjApp')
  .controller('CarsReservationsEditCtrl',
    function(_, moment, $scope, $state, Reservation, ValidationErrors) {

    $scope.tmpReservation = _.clone($scope.reservation);

    $scope.errors = {};

    $scope.submit = function() {
      var params = {
        carId: $scope.car.id,
        reservationId: $scope.reservation.id
      };

      var data = {
        startsAt: $scope.tmpReservation.startsAt.toString(),
        endsAt: $scope.tmpReservation.endsAt.toString()
      };

      if ($scope.pending) {
        return;
      }

      Reservation.update(params, {reservation: data}).$promise
        .then(function(resp) {
          _.extend($scope.reservation, resp.reservation);
          $scope.reloadCar();
          $state.go('app.car.reservation.comments', params);
        })
        .catch(function(err) {
          $scope.errors = ValidationErrors.format(err.data.details);
        });
    };
  });
