'use strict';

angular
  .module('pjApp')
  .factory('Ride', function($resource, ENV) {
    return $resource(ENV.API + '/cars/:carId/rides/:rideId', {}, {
      update: {method: 'PATCH'},
      query: {method: 'GET'}
    });
  });
