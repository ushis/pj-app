'use strict';

angular
  .module('pjApp')
  .controller('CarsEditCtrl', function(_, $scope, $state, Car) {

    $scope.tmpCar = _.clone($scope.car);

    $scope.submit = function() {
      Car.update({carId: $scope.car.id}, {car: $scope.tmpCar}).$promise
        .then(function(resp) {
          _.extend($scope.car, resp.car);
          $state.go('app.car.location', {carId: $scope.car.id});
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  });
