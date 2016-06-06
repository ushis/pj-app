'use strict';

angular
  .module('pjApp')
  .factory('Cancelation', function($resource, ENV) {
    return $resource(ENV.API + '/cars/:carId/reservations/:reservationId/cancelation');
  });
