'use strict';

angular
  .module('pjApp')
  .factory('Location', function($resource, ENV) {
    return $resource(ENV.API + '/cars/:carId/location', {}, {
      update: {method: 'PATCH'}
    });
  });
