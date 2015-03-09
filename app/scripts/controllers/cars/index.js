'use strict';

angular
  .module('pjApp')
  .controller('CarsIndexCtrl', function($scope, cars, Car) {

    $scope.cars = cars.cars;
    $scope.meta = cars.meta;

    $scope.reload = function() {
      Car.query($scope.meta).$promise
        .then(function(resp) {
          $scope.cars = resp.cars;
          $scope.meta = resp.meta;
        });
    };
  });

