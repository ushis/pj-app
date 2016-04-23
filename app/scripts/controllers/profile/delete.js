'use strict';

angular
  .module('pjApp')
  .controller('ProfileDeleteCtrl', function($scope, $state) {

    $scope.user = {
      passwordCurrent: null
    };

    $scope.submit = function() {
      if ($scope.pending) {
        return;
      }

      $scope.currentUser.delete($scope.user.passwordCurrent)
        .then(function() {
          $state.go('app.signin');
        })
        .catch(function(err) {
          console.log(err);
        })
        .finally(function() {
          $scope.user.passwordCurrent = null;
        });
    };
  });
