'use strict';

angular
  .module('pjApp')
  .config(function($stateProvider) {

    $stateProvider
      .state('app.car.reservation.comments', {
        url: '/comments',
        templateUrl: 'views/cars/reservations/comments/index.html',
        controller: 'CarsReservationsCommentsIndexCtrl',
        resolve: {
          comments: function(ReservationComment, $stateParams) {
            var params = _.extend({
              orderBy: 'created_at',
              order: 'desc'
            }, $stateParams);

            return ReservationComment.query(params).$promise;
          }
        }
      });
  });
