'use strict';

angular
  .module('pjApp')
  .factory('ValidationErrors', function(_, str) {
    return {
      format: function(errors) {
        return _.mapValues(errors, function(errs, attr) {
          return errs[0];
        });
      }
    };
  });
