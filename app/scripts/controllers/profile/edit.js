'use strict';

angular
  .module('pjApp')
  .controller('ProfileEditCtrl', function(_, $scope) {

    $scope.user = _.extend({
      passwordCurrent: null
    }, $scope.currentUser.attrs);

    $scope.submit = function() {
      $scope.currentUser.update($scope.user)
        .then(function() {
          console.log('yay');
          _.extend($scope.user, $scope.currentUser.attrs);
        })
        .catch(function(err) {
          console.log(err);
        })
        .finally(function() {
          _.extend($scope.user, {
            passwordCurrent: null
          });
        });
    };
  });
