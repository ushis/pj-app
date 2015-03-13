'use strict';

angular
  .module('pjApp')
  .controller('ProfilePasswordCtrl', function(_, $scope) {

    $scope.success = false;

    $scope.user = {
      password: null,
      passwordConfirmation: null,
      passwordCurrent: null
    };

    $scope.submit = function() {
      $scope.currentUser.update($scope.user)
        .then(function() {
          $scope.success = true;
        })
        .catch(function(err) {
          $scope.success = false;
          console.log(err);
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
