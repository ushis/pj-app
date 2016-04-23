'use strict';

angular
  .module('pjApp')
  .controller('AppCtrl', function(_, $scope, $state, $http, currentUser) {

    $scope.currentUser = currentUser;

    $scope.pending = false;

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

    $scope.$watch(function() {
      return $http.pendingRequests.length > 0;
    }, function() {
      $scope.pending = $http.pendingRequests.length > 0;
    });
  });
