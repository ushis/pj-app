'use strict';

angular
  .module('pjApp')
  .config(function($stateProvider) {

    $stateProvider
      .state('app.car.owners', {
        url: '/owners',
        templateUrl: 'views/cars/owners/index.html',
        controller: 'CarsOwnersIndexCtrl',
        resolve: {
          ownerships: function(_, Ownership, $stateParams) {
            var params = _.extend({
              orderBy: 'user.username'
            }, $stateParams);

            return Ownership.query(params).$promise;
          }
        }
      });
  });
