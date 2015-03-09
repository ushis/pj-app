'use strict';

angular
  .module('pjApp')
  .config(function($stateProvider) {

    $stateProvider
      .state('app.car.driver-new', {
        url: '/drivers/new',
        templateUrl: 'views/cars/drivers/new.html',
        controller: 'CarsDriversNewCtrl',
        resolve: {
          users: function(User) {
            return User.query({orderBy: 'username'}).$promise;
          }
        }
      });
  });
