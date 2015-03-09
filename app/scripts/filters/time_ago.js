'use strict';

angular
  .module('pjApp')
  .filter('timeAgo', function(moment) {
    return function(input) {
      return moment(input).fromNow();
    };
  });
