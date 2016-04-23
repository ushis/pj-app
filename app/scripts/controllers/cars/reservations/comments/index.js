'use strict';

angular
  .module('pjApp')
  .controller('CarsReservationsCommentsIndexCtrl',
    function($scope, $q, moment, comments, ReservationComment) {

    $scope.comments = comments.comments;

    $scope.meta = comments.meta;

    $scope.comment = {comment: null};

    $scope.update = function(comment) {
      var deferred = $q.defer();

      var params = {
        carId: $scope.car.id,
        reservationId: $scope.reservation.id,
        commentId: comment.id
      };

      if ($scope.pending) {
        return $q.reject();
      }

      ReservationComment.update(params, {comment: comment}).$promise
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
        reservationId: $scope.reservation.id,
        commentId: comment.id
      };

      if ($scope.pending) {
        return;
      }

      ReservationComment.delete(params).$promise
        .finally(function() {
          $scope.reload();
        });
    };

    $scope.submit = function() {
      var params = {
        carId: $scope.car.id,
        reservationId: $scope.reservation.id
      };

      var data = $scope.comment;

      if ($scope.pending) {
        return;
      }

      ReservationComment.save(params, {comment: data}).$promise
        .then(function(resp) {
          $scope.comment.comment = null;
          $scope.reloadReservation();
          $scope.reload();
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.reload = function() {
      var params = _.extend({
        carId: $scope.car.id,
        reservationId: $scope.reservation.id
      }, $scope.meta);

      ReservationComment.query(params).$promise
        .then(function(resp) {
          $scope.comments = resp.comments;
          $scope.meta = resp.meta;
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  });
