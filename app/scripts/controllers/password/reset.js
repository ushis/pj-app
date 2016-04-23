'use strict';

angular
  .module('pjApp')
  .controller('PasswordResetCtrl',
    function($scope, $state, token, PasswordReset, AccessToken, ValidationErrors) {

    $scope.user = {
      password: null,
      passwordConfirmation: null
    };

    $scope.errors = {};

    $scope.unauthorizedError = false;

    $scope.submit = function() {
      if ($scope.pending) {
        return;
      }
      AccessToken.set(token);

      PasswordReset.update({user: $scope.user}).$promise
        .then(function() {
          $state.go('app.signin');
        })
        .catch(function(err) {
          if (err.status === 401) {
            $scope.unauthorizedError = true;
          } else {
            $scope.errors = ValidationErrors.format(err.data.details);
          }
        })
        .finally(function() {
          AccessToken.unset();

          $scope.user = {
            password: null,
            passwordConfirmation: null
          };
        });
    };
  });
