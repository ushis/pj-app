'use strict';

angular
  .module('pjApp')
  .config(function($stateProvider) {

    $stateProvider
      .state('app.car.borrowers', {
        url: '/borrowers',
        templateUrl: 'views/cars/borrowers/index.html',
        controller: 'CarsBorrowersIndexCtrl',
        resolve: {
          borrowerships: function(_, Borrowership, $stateParams) {
            var params = _.extend({
              orderBy: 'user.username'
            }, $stateParams);

            return Borrowership.query(params).$promise;
          }
        }
      });
  });
