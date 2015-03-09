'use strict';

angular
  .module('pjApp')
  .factory('ReservationComment', function($resource, ENV) {
    return $resource(ENV.API + '/cars/:carId/reservations/:reservationId/comments/:commentId', {}, {
      update: {method: 'PATCH'},
      query: {method: 'GET'}
    });
  });
