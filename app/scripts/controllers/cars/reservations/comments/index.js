'use strict';

angular
  .module('pjApp')
  .controller('CarsReservationsCommentsIndexCtrl',
    function($scope, comments, ReservationComment) {

    $scope.comments = comments.comments;

    $scope.meta = comments.meta;

    $scope.comment = {comment: null};

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
