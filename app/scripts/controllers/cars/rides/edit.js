'use strict';

angular
  .module('pjApp')
  .controller('CarsRidesEditCtrl', function(_, moment, $scope, $state, Ride) {

    $scope.tmpRide = _.extend({}, $scope.ride, {
      startedAt: moment($scope.ride.startedAt),
      endedAt: moment($scope.ride.endedAt)
    });

    $scope.submit = function() {
      var params = {
        carId: $scope.car.id,
        rideId: $scope.ride.id
      };

      var data = {
        distance: $scope.tmpRide.distance,
        startedAt: $scope.tmpRide.startedAt.toString(),
        endedAt: $scope.tmpRide.endedAt.toString()
      };

      Ride.update(params, {ride: data}).$promise
        .then(function(resp) {
          _.extend($scope.ride, resp.ride);
          $scope.reloadCar();
          $state.go('app.car.ride.comments', params);
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  });
