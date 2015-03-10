'use strict';

angular
  .module('pjApp')
  .controller('CarsCommentsIndexCtrl', function($scope, comments, CarComment) {

    $scope.comments = comments.comments;

    $scope.meta = comments.meta;

    $scope.comment = {comment: null};

    $scope.submit = function() {
      var params = {
        carId: $scope.car.id
      };

      var data = $scope.comment;

      CarComment.save(params, {comment: data}).$promise
        .then(function(resp) {
          $scope.comment.comment = null;
          $scope.reloadCar();
          $scope.reload();
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.reload = function() {
      CarComment.query(_.extend({carId: $scope.car.id}, $scope.meta)).$promise
        .then(function(resp) {
          $scope.comments = resp.comments;
          $scope.meta = resp.meta;
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  });
