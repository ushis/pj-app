'use strict';

angular
  .module('pjApp')
  .controller('CarsReservationsShowCtrl',
    function(moment, $scope, $state, reservation, Reservation, Cancelation) {

    $scope.reservation = reservation.reservation;

    $scope.title = function() {
      var startsAt = moment($scope.reservation.startsAt);
      var endsAt = moment($scope.reservation.endsAt);
      var parts = [startsAt.format('D MMM YYYY, HH:mm')];

      if (startsAt.endOf('day').isBefore(endsAt)) {
        parts.push(endsAt.format('D MMM YYYY, HH:mm'));
      } else {
        parts.push(endsAt.format('HH:mm'));
      }

      return parts.join(' - ');
    };

    $scope.delete = function() {
      var params = {
        carId: $scope.car.id,
        reservationId: $scope.reservation.id
      };

      if ($scope.pending) {
        return;
      }

      Reservation.delete(params).$promise
        .then(function() {
          $scope.reloadCar();
          $state.go('app.car.reservations', {carId: $scope.car.id});
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.reloadReservation = function() {
      var params = {
        carId: $scope.car.id,
        reservationId: $scope.reservation.id
      };

      Reservation.get(params).$promise
        .then(function(resp) {
          $scope.reservation = resp.reservation;
        });
    };

    $scope.cancel = function() {
      var params = {
        carId: $scope.car.id,
        reservationId: $scope.reservation.id
      };

      Cancelation.save(params, {}).$promise
        .then(function(cancelation) {
          $scope.reservation.cancelation = cancelation.cancelation;
        });
    };

    $scope.uncancel = function() {
      var params = {
        carId: $scope.car.id,
        reservationId: $scope.reservation.id
      };

      Cancelation.delete(params).$promise
        .then(function() {
          $scope.reservation.cancelation = null;
        })
        .catch(function() {
          $scope.reloadReservation();
        });
    };
  });
