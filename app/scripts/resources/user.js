'use strict';

angular
  .module('pjApp')
  .factory('User', function($resource, ENV) {
    return $resource(ENV.API + '/users/:userId', {}, {
      query: {method: 'GET'}
    });
  });
