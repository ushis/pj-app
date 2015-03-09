'use strict';

angular
  .module('pjApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('app', {
        templateUrl: 'views/app.html',
        controller: 'AppCtrl',
        resolve: {
          currentUser: function($q, CurrentUser) {
            var deffered = $q.defer();

            CurrentUser.load()
              .finally(function() {
                deffered.resolve(CurrentUser);
              });

            return deffered.promise;
          }
        }
      });
  });
