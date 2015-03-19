'use strict';

angular
  .module('pjApp')
  .factory('PasswordReset', function($resource, ENV) {
    return $resource(ENV.API + '/password_reset', {}, {
      update: {method: 'PATCH'}
    });
  });
