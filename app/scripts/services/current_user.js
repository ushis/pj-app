'use strict';

angular
  .module('pjApp')
  .factory('CurrentUser', function($q, Profile, Session, AccessToken) {

    /* */
    var CurrentUser = function() {
      this.attrs = {};
    };

    CurrentUser.prototype.id = function() {
      return this.attrs.id;
    };

    CurrentUser.prototype.username = function() {
      return this.attrs.username;
    };

    CurrentUser.prototype.email = function() {
      return this.attrs.email;
    };

    CurrentUser.prototype.createdAt = function() {
      return this.attrs.createdAt;
    };

    CurrentUser.prototype.is = function(other) {
      return other && other.id === this.attrs.id;
    };

    /* */
    CurrentUser.prototype.signIn = function(username, password) {
      var deferred = $q.defer();
      var user = this;

      Session.save({user: {username: username, password: password}}).$promise
        .then(function(resp) {
          user.attrs = resp.user;
          AccessToken.set(resp.user.accessToken);
          deferred.resolve(user);
        })
        .catch(function(err) {
          user.attrs = {};
          AccessToken.unset();
          deferred.reject(err);
        });

      return deferred.promise;
    };

    /* */
    CurrentUser.prototype.update = function(attrs) {
      var deferred = $q.defer();
      var user = this;

      Profile.update({user: attrs}).$promise
        .then(function(resp) {
          user.attrs = resp.user;
          deferred.resolve(user);
        })
        .catch(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    };

    /* */
    CurrentUser.prototype.delete = function(password) {
      var deferred = $q.defer();
      var user = this;

      Profile.delete({user: {passwordCurrent: password}})
        .then(function() {
          user.signOut();
          deferred.resolve(user);
        })
        .catch(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    };

    /* */
    CurrentUser.prototype.signOut = function() {
      this.attrs = {};
      AccessToken.unset();
    };

    /* */
    CurrentUser.prototype.isSignedIn = function() {
      return !!this.attrs.id;
    };

    /* */
    CurrentUser.prototype.load = function() {
      var deferred = $q.defer();
      var token = AccessToken.get();
      var user = this;

      if (!token) {
        this.attrs = {};
        return $q.reject(false);
      }

      Profile.get().$promise
        .then(function(resp) {
          user.attrs = resp.user;
          deferred.resolve(user);
        })
        .catch(function(err) {
          user.attrs = {};
          AccessToken.unset();
          deferred.reject(err);
        });

      return deferred.promise;
    };

    return new CurrentUser();
  });
