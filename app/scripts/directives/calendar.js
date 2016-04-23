'use strict';

angular
  .module('pjApp')
  .directive('calendar', function(_, moment) {

    var Group = function() {
      this.items = _.toArray(arguments);
    };

    Group.prototype.push = function(item) {
      this.items.push(item);
    };

    Group.prototype.first = function() {
      return this.items[0];
    };

    Group.prototype.last = function() {
      return this.items[this.items.length-1];
    };

    var Week = function(moment) {
      this.nr = moment.week();
      this.start = moment.clone().startOf('week');
      this.end = moment.clone().endOf('week');
      this.groups = [];

      this.days = _.range(7).map(function(day) {
        return this.start.clone().add(day, 'day');
      }, this);
    };

    Week.prototype.daysBefore = function(moment) {
      moment = moment.clone().startOf('day');

      return this.days.filter(function(day) {
        return day.isBefore(moment);
      });
    };

    Week.prototype.daysAfter = function(moment) {
      moment = moment.clone().endOf('day');

      return this.days.filter(function(day) {
        return day.isAfter(moment);
      });
    };

    Week.prototype.daysBetween = function(start, end) {
      start = start.clone().startOf('day');
      end = end.clone().endOf('day');

      return this.days.filter(function(day) {
        return !(day.isBefore(start) || day.isAfter(end));
      });
    };

    Week.prototype.contains = function(start, end) {
      if (end === undefined) {
        return start.week() === this.nr;
      }
      return start.week() <= this.nr && this.nr <= end.week();
    };

    Week.prototype.setItems = function(items) {
      var groups = [];

      items
        .sort(function(a, b) {
          return a.startsAt.diff(b.startsAt);
        })
        .forEach(function(item) {
          var group = groups.find(function(g) {
            return g.last().endsAt.clone().endOf('day').isBefore(item.startsAt);
          });

          if (_.isUndefined(group)) {
            groups.push(new Group(item));
          } else {
            var end = group.last().endsAt.clone().endOf('day');
            var start = item.startsAt.clone().startOf('day');
            var gap = start.diff(end, 'days');

            for (var i = 0; i < gap; i++) {
              group.push(null);
            }
            group.push(item);
          }
        }, this);

      this.groups = groups;
    };

    var Calendar = function(date, items) {
      this.date = date.clone().startOf('month');

      var start = this.date.clone().startOf('week');
      var diff = this.date.diff(start, 'days');
      var n = (this.date.daysInMonth() + diff) / 7;

      this.weeks = _.range(n).map(function(week) {
        week = new Week(start.clone().add(week, 'weeks'));

        week.setItems(items.filter(function(item) {
          return week.contains(item.startsAt, item.endsAt);
        }));

        return week;
      });

      this.weekDays = _.range(7).map(function(i) {
        return moment().startOf('week').add(i, 'day');
      });
    };

    Calendar.prototype.inMonth = function(date) {
      return date.month() === this.date.month();
    };

    Calendar.prototype.isToday = function(day) {
      return moment().startOf('day').isSame(day);
    };

    return {
      restrict: 'E',
      scope: {
        date: '=',
        items: '=',
        click: '&'
      },
      templateUrl: 'views/directives/calendar.html',
      link: function(scope) {
        scope.calendar = new Calendar(scope.date, scope.items);

        scope.onItemClick = function(item) {
          scope.click({$item: item});
        };

        scope.itemTitle = function(item) {
          var parts = [item.startsAt.format('D MMM YYYY, HH:mm')];

          if (item.startsAt.clone().endOf('day').isBefore(item.endsAt)) {
            parts.push(item.endsAt.format('D MMM YYYY, HH:mm'));
          } else {
            parts.push(item.endsAt.format('HH:mm'));
          }
          return parts.join(' - ');
        };
      }
    };
  });
