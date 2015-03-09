'use strict';

angular
  .module('pjApp')
  .controller('CarsReservationsNewCtrl',
    function($q, $scope, $state, Reservation, ReservationComment) {

    $scope.tmpReservation = {
      startsAt: null,
      endsAt: null
    };

    $scope.comment = {
      comment: null
    };

    var saveReservation = function(params) {
      var params = {
        carId: $scope.car.id
      };

      var data = {
        startsAt: $scope.tmpReservation.startsAt.toString(),
        endsAt: $scope.tmpReservation.endsAt.toString()
      };

      return Reservation.save(params, {reservation: data}).$promise;
    };

    var saveComment = function(reservationId) {
      var params = {
        carId: $scope.car.id,
        reservationId: reservationId
      };

      if (_.trim($scope.comment.comment).length === 0) {
        return $q.resolve(true);
      }
      return ReservationComment.save(params, {comment: $scope.comment}).$promise;
    };

    $scope.submit = function() {
      saveReservation()
        .then(function(resp) {
          saveComment(resp.reservation.id)
            .finally(function() {
              //$state.go('app.car.reservation', {
              //  carId: $scope.car.id,
              //  reservationId: resp.reservation.id
              //});
              $state.go('app.car.reservations', {carId: $scope.car.id});
            });
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  });
