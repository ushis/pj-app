'use strict';

angular
  .module('pjApp')
  .controller('CarsDriversNewCtrl',
    function($scope, $state, users, Borrowership, Ownership, User) {

    $scope.users = users.users;

    $scope.driver = {
      user: null,
      owner: false
    };

    $scope.reload = function(q) {
      User.query({orderBy: 'username', q: q}).$promise
        .then(function(resp) {
          $scope.users = resp.users;
        });
    };

    $scope.submit = function() {
      if (!$scope.driver.user) {
        return;
      }

      var params = {carId: $scope.car.id};
      var data = {userId: $scope.driver.user.id};

      if ($scope.driver.owner) {
        createOwnership(params, data);
      } else {
        createBorrowership(params, data);
      }
    };

    var createOwnership = function(params, data) {
      Ownership.save(params, {ownership: data}).$promise
        .then(function() {
          $scope.reloadCar();
          $state.go('app.car.owners', params);
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    var createBorrowership = function(params, data) {
      Borrowership.save(params, {borrowership: data}).$promise
        .then(function() {
          $scope.reloadCar();
          $state.go('app.car.borrowers', params);
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  });
