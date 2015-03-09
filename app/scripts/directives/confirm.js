'use strict';

angular
  .module('pjApp')
  .directive('ngConfirm', function($window) {
    return {
      restrict: 'A',
      scope: {
        ngConfirm: '&',
        ngConfirmMessage: '@'
      },
      link: function(scope, element) {
        element.bind('click', function() {
          if ($window.confirm(scope.ngConfirmMessage || 'Are you sure?')) {
            scope.ngConfirm();
          }
        });
      }
    };
  });
