'use strict';

angular
  .module('pjApp')
  .directive('pagination', function() {
    return {
      restrict: 'E',
      scope: {
        counters: '=',
        click: '&'
      },
      templateUrl: 'views/directives/pagination.html',
      link: function(scope) {

        scope.prev = function() {
          if (scope.counters.page > 1) {
            scope.counters.page--;
            scope.click();
          }
        };

        scope.next = function() {
          if (scope.counters.page < scope.counters.totalPages) {
            scope.counters.page++;
            scope.click();
          }
        };
      }
    };
  });
