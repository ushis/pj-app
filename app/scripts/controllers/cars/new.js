'use strict';

angular
  .module('pjApp')
  .controller('CarsNewCtrl', function($scope, $state, Car) {

    $scope.tmpCar = {
      name: null
    };

    $scope.submit = function() {
      Car.save({car: $scope.tmpCar}).$promise
        .then(function(resp) {
          $state.go('app.car.location', {carId: resp.car.id});
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  });
