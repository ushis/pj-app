'use strict';

angular
  .module('pjApp')
  .controller('CarsDeleteCtrl', function($scope, $state, Car) {

    $scope.carName = null;

    $scope.submit = function() {
      if ($scope.car.name !== $scope.carName) {
        return;
      }

      Car.delete({carId: $scope.car.id}).$promise
        .then(function() {
          $state.go('app.cars');
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  });
