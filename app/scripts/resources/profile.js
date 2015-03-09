'use strict';

angular
  .module('pjApp')
  .factory('Profile', function($resource, $http, ENV) {
    var Profile = $resource(ENV.API + '/profile', {}, {
      update: {method: 'PATCH'}
    });

    Profile.delete = function(data) {
      return $http({
        method: 'DELETE',
        url: ENV.API + '/profile',
        data: data,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });
    };

    return Profile;
  });
