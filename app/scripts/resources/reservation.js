'use strict';

angular
  .module('pjApp')
  .factory('Reservation', function($resource, ENV) {
    return $resource(ENV.API + '/cars/:carId/reservations/:reservationId', {}, {
      update: {method: 'PATCH'},
      query: {method: 'GET'}
    });
  });
