'use strict';

angular
  .module('pjApp')
  .factory('AccessToken', function($window) {

    /* */
    var AccessToken = function(key) {
      this.key = key;
    };

    /* */
    AccessToken.prototype.set = function(token) {
      $window.localStorage.setItem(this.key, token);
    };

    /* */
    AccessToken.prototype.unset = function() {
      $window.localStorage.removeItem(this.key);
    };

    /* */
    AccessToken.prototype.get = function() {
      var claims, token = $window.localStorage.getItem(this.key);

      try {
        claims = JSON.parse(atob(token.split('.')[1]));
      } catch (err) {
        return null;
      }

      return (Date.now() > claims.exp * 1e3) ? null : token;
    };

    /* */
    return new AccessToken('user.access_token');
  });
