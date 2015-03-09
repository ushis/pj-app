'use strict';

angular
  .module('pjApp')
  .controller('CarsRidesCommentsIndexCtrl',
    function($scope, comments, RideComment) {

    $scope.comments = comments.comments;

    $scope.meta = comments.meta;

    $scope.comment = {comment: null};

    $scope.submit = function() {
      var params = {
        carId: $scope.car.id,
        rideId: $scope.ride.id
      };

      var data = $scope.comment;

      RideComment.save(params, {comment: data}).$promise
        .then(function(resp) {
          $scope.comment.comment = null;
          $scope.reload();
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.reload = function() {
      var params = _.extend({
        carId: $scope.car.id,
        rideId: $scope.ride.id
      }, $scope.meta);

      RideComment.query(params).$promise
        .then(function(resp) {
          $scope.comments = resp.comments;
          $scope.meta = resp.meta;
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  });
