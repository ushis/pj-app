'use strict';

angular
  .module('pjApp')
  .controller('CarsShowCtrl', function($scope, car, Car) {

    $scope.car = car.car;

    $scope.reloadCar = function() {
      Car.get({carId: $scope.car.id}).$promise
        .then(function(resp) {
          $scope.car = resp.car;
        });
    };
  });
