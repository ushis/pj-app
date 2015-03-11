'use strict';

angular
  .module('pjApp')
  .directive('calendar', function(_, moment) {

    var Week = function(moment) {
      this.nr = moment.week();
      this.start = moment.clone().startOf('week');
      this.end = moment.clone().endOf('week');

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

    var Calendar = function(date, updateCallback) {
      this.moment = moment(date).startOf('month');
      this.updateCallback = updateCallback;

      this.weekDays = _.range(7).map(function(i) {
        return moment().startOf('week').add(i, 'day');
      });

      this.update();
    };

    Calendar.prototype.prevMonth = function() {
      this.moment.subtract(1, 'month');
      this.update();
    };

    Calendar.prototype.nextMonth = function() {
      this.moment.add(1, 'month');
      this.update();
    };

    Calendar.prototype.update = function() {
      var start = this.moment.clone().startOf('week');
      var diff = this.moment.diff(start, 'days');
      var n = (this.moment.daysInMonth() + diff) / 7;

      this.weeks = _.range(n).map(function(week) {
        return new Week(start.clone().add(week, 'weeks'));
      });

      this.updateCallback({$date: this.moment.clone()});
    };

    Calendar.prototype.inMonth = function(moment) {
      return moment.month() === this.moment.month();
    };

    Calendar.prototype.isToday = function(day) {
      return moment().startOf('day').isSame(day);
    };

    return {
      restrict: 'E',
      scope: {
        items: '=',
        change: '&',
        click: '&'
      },
      templateUrl: 'views/directives/calendar.html',
      link: function(scope) {
        scope.calendar = new Calendar(new Date(), scope.change);

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

        scope.itemsInWeek = function(week) {
          return scope.items.filter(function(item) {
            return week.contains(item.startsAt, item.endsAt);
          });
        };
      }
    };
  });
