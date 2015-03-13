'use strict';

angular
  .module('pjApp')
  .controller('ProfileEditCtrl', function(_, moment, $scope) {

    var timeZones = moment.tz.names();

    $scope.success = false;

    $scope.timeZones = _.range(10).map(function(i) {
      return timeZones[i];
    });

    $scope.filterZones = function(q) {
      var len = timeZones.length, res=[], i;
      q = q.toLowerCase();

      for (i = 0; i < len && res.length < 10; i++) {
        if (timeZones[i].toLowerCase().indexOf(q) !== -1) {
          res.push(timeZones[i]);
        }
      }
      $scope.timeZones = res;
    };

    $scope.user = _.extend({
      passwordCurrent: null
    }, $scope.currentUser.attrs);

    $scope.submit = function() {
      $scope.currentUser.update($scope.user)
        .then(function() {
          $scope.success = true;
          _.extend($scope.user, $scope.currentUser.attrs);
        })
        .catch(function(err) {
          $scope.success = false;
          console.log(err);
        })
        .finally(function() {
          _.extend($scope.user, {
            passwordCurrent: null
          });
        });
    };
  });
