'use strict';

angular
  .module('pjApp')
  .factory('Ownership', function($resource, ENV) {
    return $resource(ENV.API + '/cars/:carId/ownerships/:ownershipId', {}, {
      update: {method: 'PATCH'},
      query: {method: 'GET'}
    });
  });
