'use strict';

angular
  .module('pjApp')
  .controller('ProfilePasswordCtrl', function(_, $scope) {

    $scope.user = {
      password: null,
      passwordConfirmation: null,
      passwordCurrent: null
    };

    $scope.submit = function() {
      $scope.currentUser.update($scope.user)
        .then(function() {
          console.log('yay');
        })
        .catch(function(err) {
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
