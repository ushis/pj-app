'use strict';

angular
  .module('pjApp')
  .controller('CarsRidesIndexCtrl', function(_, moment, $scope, rides, Ride) {

    $scope.rides = rides.rides;
    $scope.meta = rides.meta;

    $scope.clearBefore = function() {
      $scope.meta.before = null;
      $scope.reload();
    };

    $scope.clearAfter = function() {
      $scope.meta.after = null;
      $scope.reload();
    };

    $scope.reload = function() {
      var params = _.clone($scope.meta);
      params.before = (params.before) ? moment(params.before).format('YYYY-MM-DD') : null;
      params.after = (params.after) ? moment(params.after).format('YYYY-MM-DD') : null;
      params.carId = $scope.car.id;

      Ride.query(params).$promise
        .then(function(resp) {
          $scope.rides = resp.rides;
          $scope.meta = resp.meta;
        });
    };
  });
