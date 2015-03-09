'use strict';

angular
  .module('pjApp')
  .controller('CarsOwnersIndexCtrl', function(_, $scope, ownerships, Ownership) {

    $scope.ownerships = ownerships.ownerships;

    $scope.meta = ownerships.meta;

    $scope.reload = function() {
      var params = _.extend({
        carId: $scope.car.id
      }, $scope.meta);

      Ownership.query(params).$promise
        .then(function(resp) {
          $scope.ownerships = resp.ownerships;
          $scope.meta = resp.meta;
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.delete = function(ownership) {
      var params = {
        carId: $scope.car.id,
        ownershipId: ownership.id
      };

      Ownership.delete(params).$promise
        .then(function() {
          $scope.reloadCar();
          $scope.reload();
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  });
