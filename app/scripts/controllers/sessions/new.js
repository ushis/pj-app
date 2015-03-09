'use strict';

angular
  .module('pjApp')
  .controller('SessionsNewCtrl', function($scope, $state) {

    /* the users credentials */
    $scope.user = {username: null, password: null};

    /* */
    $scope.submit = function() {
      $scope.currentUser.signIn($scope.user.username, $scope.user.password)
        .then(function() {
          $state.go('app.cars');
        })
        .catch(function() {
          $scope.user.password = null;
        });
    };
  });
