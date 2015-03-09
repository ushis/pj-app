'use strict';

angular
  .module('pjApp')
  .config(function($stateProvider) {

    $stateProvider
      .state('app.car.ride.comments', {
        url: '/comments',
        templateUrl: 'views/cars/rides/comments/index.html',
        controller: 'CarsRidesCommentsIndexCtrl',
        resolve: {
          comments: function(_, RideComment, $stateParams) {
            var params = _.extend({
              orderBy: 'created_at',
              order: 'desc'
            }, $stateParams);

            return RideComment.query(params).$promise;
          }
        }
      });
  });
