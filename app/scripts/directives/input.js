'use strict';

angular
  .module('pjApp')
  .directive('ngInput', function(_) {
    return {
      restrict: 'A',
      scope: {
        ngInput: '&'
      },
      link: function(scope, element) {
        element.bind('input', _.debounce(function() {
          scope.ngInput();
        }, 200));
      }
    };
  });
