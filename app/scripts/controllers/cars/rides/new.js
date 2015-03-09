'use strict';

angular
  .module('pjApp')
  .controller('CarsRidesNewCtrl',
    function(_, $q, $scope, $state, Ride, RideComment) {

    $scope.tmpRide = {
      distance: null,
      startedAt: null,
      endedAt: null
    };

    $scope.comment = {
      comment: null
    };

    var saveRide = function() {
      var params = {
        carId: $scope.car.id
      };

      var data = {
        distance: $scope.tmpRide.distance,
        startedAt: $scope.tmpRide.startedAt.toString(),
        endedAt: $scope.tmpRide.endedAt.toString()
      };

      return Ride.save(params, {ride: data}).$promise;
    };

    var saveComment = function(rideId) {
      var params = {
        carId: $scope.car.id,
        rideId: rideId
      };

      if (_.trim($scope.comment.comment).length === 0) {
        return $q.when(true);
      }
      return RideComment.save(params, {comment: $scope.comment}).$promise;
    };

    $scope.submit = function() {
      saveRide()
        .then(function(resp) {
          $scope.reloadCar();

          saveComment(resp.ride.id)
            .finally(function() {
              $state.go('app.car.ride.comments', {rideId: resp.ride.id});
            });
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  });
