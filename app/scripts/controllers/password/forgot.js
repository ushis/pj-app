'use strict';

angular
  .module('pjApp')
  .controller('PasswordForgotCtrl', function($scope, PasswordReset) {

    $scope.user = {
      username: null
    };

    $scope.errors = {};

    $scope.success = false;

    $scope.submit = function() {
      PasswordReset.save({user: $scope.user}).$promise
        .then(function() {
          $scope.success = true;
          $scope.errors = {};
          $scope.user.username = null;
        })
        .catch(function(err) {
          $scope.success = false;
          $scope.errors.username = 'Unknown username or email'
        });
    };
  });
