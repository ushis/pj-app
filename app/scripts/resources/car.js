'use strict';

angular
  .module('pjApp')
  .factory('Car', function($resource, ENV) {
    return $resource(ENV.API + '/cars/:carId', {}, {
      update: {method: 'PATCH'},
      query: {method: 'GET'}
    });
  });
