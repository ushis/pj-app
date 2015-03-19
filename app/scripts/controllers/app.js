'use strict';

angular
  .module('pjApp')
  .controller('AppCtrl', function(_, $scope, $state, currentUser) {

    $scope.currentUser = currentUser;

    var isOutside = _.any([
      'app.signin',
      'app.signup',
      'app.password-forgot',
      'app.password-reset'
    ], $state.includes, $state);

    if (!$scope.currentUser.isSignedIn() && !isOutside) {
      $state.go('app.signin');
    }

    if ($scope.currentUser.isSignedIn() && isOutside) {
      $state.go('app.cars');
    }

    $scope.signOut = function() {
      $scope.currentUser.signOut();
      $state.go('app.signin');
    };
  });
