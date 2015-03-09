'use strict';

angular
  .module('pjApp')
  .factory('RideComment', function($resource, ENV) {
    return $resource(ENV.API + '/cars/:carId/rides/:rideId/comments/:commentId', {}, {
      update: {method: 'PATCH'},
      query: {method: 'GET'}
    });
  });
