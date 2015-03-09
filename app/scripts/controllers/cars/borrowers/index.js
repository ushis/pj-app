'use strict';

angular
  .module('pjApp')
  .controller('CarsBorrowersIndexCtrl', function(_, $scope, borrowerships, Borrowership) {

    $scope.borrowerships = borrowerships.borrowerships;

    $scope.meta = borrowerships.meta;

    $scope.reload = function() {
      var params = _.extend({
        carId: $scope.car.id
      }, $scope.meta);

      Borrowership.query(params).$promise
        .then(function(resp) {
          $scope.borrowerships = resp.borrowerships;
          $scope.meta = resp.meta;
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.delete = function(borrowership) {
      var params = {
        carId: $scope.car.id,
        borrowershipId: borrowership.id
      };

      Borrowership.delete(params).$promise
        .then(function() {
          $scope.reloadCar();
          $scope.reload();
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  });
