'use strict';

angular
  .module('pjApp')
  .factory('Borrowership', function($resource, ENV) {
    return $resource(ENV.API + '/cars/:carId/borrowerships/:borrowershipId', {}, {
      update: {method: 'PATCH'},
      query: {method: 'GET'}
    });
  });
