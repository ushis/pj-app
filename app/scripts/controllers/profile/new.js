'use strict';

angular
  .module('pjApp')
  .controller('ProfileNewCtrl', function($scope, $state, Profile) {

    $scope.user = {
      username: null,
      email: null,
      password: null,
      passwordConfirmation: null
    };

    $scope.submit = function() {
      Profile.save({user: $scope.user}).$promise
        .then(function(resp) {
          $state.go('app.signin');
        })
        .catch(function(err) {
          // TODO: display errors
          $scope.user.password = null;
          $scope.user.passwordConfirmation = null;
        });
    };
  });
