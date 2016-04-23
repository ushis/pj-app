'use strict';

angular
  .module('pjApp')
  .controller('CarsRidesCommentsIndexCtrl',
    function($scope, $q, moment, comments, RideComment) {

    $scope.comments = comments.comments;

    $scope.meta = comments.meta;

    $scope.comment = {comment: null};

    $scope.update = function(comment) {
      var deferred = $q.defer();

      var params = {
        carId: $scope.car.id,
        rideId: $scope.ride.id,
        commentId: comment.id
      };

      if ($scope.pending) {
        return $q.reject();
      }

      RideComment.update(params, {comment: comment}).$promise
        .then(function(resp) {
          deferred.resolve(resp.comment);
        })
        .catch(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    };

    $scope.delete = function(comment) {
      var params = {
        carId: $scope.car.id,
        rideId: $scope.ride.id,
        commentId: comment.id
      };

      if ($scope.pending) {
        return;
      }

      RideComment.delete(params).$promise
        .finally(function() {
          $scope.reload();
        });
    };

    $scope.submit = function() {
      var params = {
        carId: $scope.car.id,
        rideId: $scope.ride.id
      };

      var data = $scope.comment;

      if ($scope.pending) {
        return;
      }

      RideComment.save(params, {comment: data}).$promise
        .then(function(resp) {
          $scope.comment.comment = null;
          $scope.reloadRide();
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
