'use strict';

angular
  .module('pjApp')
  .controller('CarsReservationsCommentsIndexCtrl',
    function($scope, moment, comments, ReservationComment) {

    $scope.comments = comments.comments;

    $scope.meta = comments.meta;

    $scope.comment = {comment: null};

    $scope.isEditable = function(comment) {
      return $scope.currentUser.is(comment.user) &&
        moment().subtract(9, 'minutes').isBefore(moment(comment.createdAt));
    };

    $scope.delete = function(comment) {
      var params = {
        carId: $scope.car.id,
        reservationId: $scope.reservation.id,
        commentId: comment.id
      };

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
