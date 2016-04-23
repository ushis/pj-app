'use strict';

angular
  .module('pjApp')
  .controller('CarsNewCtrl', function($scope, $state, Car, ValidationErrors) {

    $scope.tmpCar = {
      name: null
    };

    $scope.errors = {};

    $scope.submit = function() {
      if ($scope.pending) {
        return;
      }

      Car.save({car: $scope.tmpCar}).$promise
        .then(function(resp) {
          $state.go('app.car.location', {carId: resp.car.id});
        })
        .catch(function(err) {
          $scope.errors = ValidationErrors.format(err.data.details);
        });
    };
  });
