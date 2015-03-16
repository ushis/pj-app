'use strict';

angular
  .module('pjApp')
  .controller('CarsShowCtrl', function($scope, $state, car, Car) {

    $scope.car = car.car;

    $scope.isActiveState = function(name) {
      switch (name) {
        case 'reservations':
          return $state.includes('app.car.reservations') ||
            $state.includes('app.car.reservation-new') ||
            $state.includes('app.car.reservation');
        case 'rides':
          return $state.includes('app.car.rides') ||
            $state.includes('app.car.ride-new') ||
            $state.includes('app.car.ride');
        case 'drivers':
          return $state.includes('app.car.owners') ||
            $state.includes('app.car.borrowers') ||
            $state.includes('app.car.driver-new');
        default:
          return $state.includes('app.car.' + name);
      }
    };

    $scope.reloadCar = function() {
      Car.get({carId: $scope.car.id}).$promise
        .then(function(resp) {
          $scope.car = resp.car;
        });
    };
  });
