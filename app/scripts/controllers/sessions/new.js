'use strict';

angular
  .module('pjApp')
  .controller('SessionsNewCtrl', function($scope, $state, $window) {

    /* the users credentials */
    $scope.user = {
      username: $window.localStorage.getItem('user.username'),
      password: null
    };

    $scope.error = false;

    /* */
    $scope.submit = function() {
      $scope.currentUser.signIn($scope.user.username, $scope.user.password)
        .then(function() {
          $window.localStorage.setItem('user.username', $scope.currentUser.username());
          $state.go('app.cars');
        })
        .catch(function() {
          $scope.user.password = null;
          $scope.error = true;
        });
    };
  });
