'use strict';

angular
  .module('pjApp')
  .factory('Session', function($resource, ENV) {
    return $resource(ENV.API + '/sessions');
  });
