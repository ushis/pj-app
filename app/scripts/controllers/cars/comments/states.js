'use strict';

angular
  .module('pjApp')
  .config(function($stateProvider) {

    $stateProvider
      .state('app.car.comments', {
        url: '/comments',
        templateUrl: 'views/cars/comments/index.html',
        controller: 'CarsCommentsIndexCtrl',
        resolve: {
          comments: function(_, CarComment, $stateParams) {
            var params = _.extend({
              orderBy: 'created_at',
              order: 'desc'
            }, $stateParams);

            return CarComment.query(params).$promise;
          }
        }
      })
  });
