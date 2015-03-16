'use strict';

angular
  .module('pjApp')
  .controller('ProfileNewCtrl',
    function(_, moment, $scope, $state, $window, Profile, ValidationErrors) {

    $scope.user = {
      username: null,
      email: null,
      password: null,
      passwordConfirmation: null
    };

    $scope.errors = {};

    $scope.submit = function() {
      var data = _.extend({
        timeZone: moment().utcOffset() * 60
      }, $scope.user);

      Profile.save({user: data}).$promise
        .then(function(resp) {
          $window.localStorage.setItem('user.username', resp.user.username);
          $state.go('app.signin');
        })
        .catch(function(err) {
          $scope.user.password = null;
          $scope.user.passwordConfirmation = null;
          $scope.errors = ValidationErrors.format(err.data.details);
        });
    };
  });
