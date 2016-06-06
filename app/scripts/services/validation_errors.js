'use strict';

angular
  .module('pjApp')
  .factory('ValidationErrors', function(_) {
    return {
      format: function(errors) {
        return _.mapValues(errors, function(errs) {
          return errs[0];
        });
      }
    };
  });
