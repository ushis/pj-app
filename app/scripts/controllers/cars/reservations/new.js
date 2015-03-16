'use strict';

angular
  .module('pjApp')
  .controller('CarsReservationsNewCtrl',
    function(_, $q, $scope, $state, Reservation,
             ReservationComment, ValidationErrors) {

    $scope.tmpReservation = {
      startsAt: null,
      endsAt: null
    };

    $scope.comment = {
      comment: null
    };

    $scope.errors = {};

    var saveReservation = function(params) {
      var params = {
        carId: $scope.car.id
      };

      var data = _.mapValues($scope.tmpReservation, function(val) {
        return (val) ? val.toString() : val;
      });

      return Reservation.save(params, {reservation: data}).$promise;
    };

    var saveComment = function(reservationId) {
      var params = {
        carId: $scope.car.id,
        reservationId: reservationId
      };

      if (_.trim($scope.comment.comment).length === 0) {
        return $q.when(true);
      }
      return ReservationComment.save(params, {comment: $scope.comment}).$promise;
    };

    $scope.submit = function() {
      saveReservation()
        .then(function(resp) {
          saveComment(resp.reservation.id)
            .finally(function() {
              $state.go('app.car.reservation.comments', {
                carId: $scope.car.id,
                reservationId: resp.reservation.id
              });
            });
        })
        .catch(function(err) {
          $scope.errors = ValidationErrors.format(err.data.details);
        });
    };
  });
