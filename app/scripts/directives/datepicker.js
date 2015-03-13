'use strict';

angular
  .module('pjApp')
  .directive('datepicker', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/datepicker.html',
      scope: {
        ngModel: '=',
        placeholder: '@'
      },
      controller: function($scope) {

        $scope.id = 'tggl-' + Math.round(Math.random() * 1e8);

        $scope.config = {
          minView: 'hour',
          dropdownSelector: '.' + $scope.id
        };
      }
    }
  });
