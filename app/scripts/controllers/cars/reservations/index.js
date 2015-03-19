'use strict';

angular
  .module('pjApp')
  .controller('CarsReservationsIndexCtrl',
    function(moment, $scope, $state, Reservation) {

    $scope.items = [];

    $scope.buildItems = function(reservations) {
      $scope.items = reservations.map(function(reservation) {
        return {
          id: reservation.id,
          title: reservation.user.username,
          startsAt: moment(reservation.startsAt),
          endsAt: moment(reservation.endsAt)
        };
      });
    };

    $scope.goTo = function(item) {
      $state.go('app.car.reservation.comments', {
        carId: $scope.car.id,
        reservationId: item.id
      });
    };

    $scope.reload = function(moment) {
      var params = {
        carId: $scope.car.id,
        after: moment.startOf('month').format(),
        before: moment.endOf('month').format(),
        orderBy: 'starts_at',
        perPage: 100
      };

      Reservation.query(params).$promise
        .then(function(resp) {
          $scope.buildItems(resp.reservations);
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  });
