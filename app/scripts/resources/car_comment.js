'use strict';

angular
  .module('pjApp')
  .factory('CarComment', function($resource, ENV) {
    return $resource(ENV.API + '/cars/:carId/comments/:commentId', {}, {
      update: {method: 'PATCH'},
      query: {method: 'GET'}
    });
  });
