'use strict';

angular
  .module('pjApp')
  .directive('comment', function(_, moment, CurrentUser) {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/comment.html',
      scope: {
        comment: '=',
        updateCallback: '&update',
        deleteCallback: '&delete'
      },
      link: function(scope) {

        var createdAt = moment(scope.comment.createdAt);

        scope.tmpComment = {};

        scope.showForm = false;

        scope.isEditable = function() {
          return CurrentUser.is(scope.comment.user) &&
            moment().subtract(9, 'minutes').isBefore(createdAt);
        };

        scope.delete = function() {
          scope.deleteCallback({$comment: scope.comment});
        };

        scope.edit = function() {
          scope.tmpComment = _.cloneDeep(scope.comment);
          scope.showForm = true;
        };

        scope.cancel = function() {
          scope.showForm = false;
        };

        scope.update = function() {
          scope.updateCallback({$comment: scope.tmpComment})
            .then(function(comment) {
              scope.comment = comment;
              scope.showForm = false;
            });
        };
      }
    };
  });
