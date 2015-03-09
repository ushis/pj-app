'use strict';

angular
  .module('pjApp')
  .filter('markdown', function(markdown) {
    return function(input) {
      return markdown.toHTML(input || '');
    };
  });
