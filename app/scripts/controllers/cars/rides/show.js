'use strict';

angular
  .module('pjApp')
  .controller('CarsRidesShowCtrl', function($scope, $state, ride, Ride) {

    $scope.ride = ride.ride;

    $scope.delete = function() {
      Ride.delete({carId: $scope.car.id, rideId: $scope.ride.id}).$promise
        .then(function() {
          $scope.reloadCar();
          $state.go('app.car.rides', {carId: $scope.car.id});
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.reloadRide = function() {
      var params = {
        carId: $scope.car.id,
        rideId: $scope.ride.id
      };

      Ride.get(params).$promise
        .then(function(resp) {
          $scope.ride = resp.ride;
        });
    };
  });
