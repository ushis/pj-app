'use strict';

angular
  .module('pjApp')
  .controller('ProfilePasswordCtrl', function(_, $scope, ValidationErrors) {

    $scope.success = false;

    $scope.errors = {};

    $scope.user = {
      password: null,
      passwordConfirmation: null,
      passwordCurrent: null
    };

    $scope.submit = function() {
      $scope.currentUser.update($scope.user)
        .then(function() {
          $scope.success = true;
          $scope.errors = {};
        })
        .catch(function(err) {
          $scope.success = false;

          if (err.status === 401) {
            $scope.errors = {passwordCurrent: 'Current password was wrong'};
          } else {
            $scope.errors = ValidationErrors.format(err.data.details);
          }
        })
        .finally(function() {
          _.extend($scope.user, {
            password: null,
            passwordConfirmation: null,
            passwordCurrent: null
          });
        });
    };
  });
