import $ from 'jquery';
import { getDaysInMonth } from './utilities';

export default {
  render() {
    this.renderYears();
    this.renderMonths();
    this.renderDays();
  },

  renderWeek() {
    const items = [];
    let { weekStart, daysMin } = this.options;

    weekStart = parseInt(weekStart, 10) % 7;
    daysMin = daysMin.slice(weekStart).concat(daysMin.slice(0, weekStart));
    $.each(daysMin, (i, day) => {
      items.push(this.createItem({
        text: day,
      }));
    });

    this.$week.html(items.join(''));
  },

  renderYears() {
    const {
      options,
      startDate,
      endDate,
    } = this;
    const { disabledClass, filter, yearSuffix } = options;
    const viewYear = this.viewDate.getFullYear();
    const now = new Date();
    const thisYear = now.getFullYear();
    const year = this.date.getFullYear();
    const start = -5;
    const end = 6;
    const items = [];
    let prevDisabled = false;
    let nextDisabled = false;
    let i;

    for (i = start; i <= end; i += 1) {
      const date = new Date(viewYear + i, 1, 1);
      let disabled = false;

      if (startDate) {
        disabled = date.getFullYear() < startDate.getFullYear();

        if (i === start) {
          prevDisabled = disabled;
        }
      }

      if (!disabled && endDate) {
        disabled = date.getFullYear() > endDate.getFullYear();

        if (i === end) {
          nextDisabled = disabled;
        }
      }

      if (!disabled && filter) {
        disabled = filter.call(this.$element, date) === false;
      }

      const picked = (viewYear + i) === year;
      const view = picked ? 'year picked' : 'year';

      items.push(this.createItem({
        picked,
        disabled,
        text: viewYear + i,
        view: disabled ? 'year disabled' : view,
        highlighted: date.getFullYear() === thisYear,
      }));
    }

    this.$yearsPrev.toggleClass(disabledClass, prevDisabled);
    this.$yearsNext.toggleClass(disabledClass, nextDisabled);
    this.$yearsCurrent
      .toggleClass(disabledClass, true)
      .html(`${(viewYear + start) + yearSuffix} - ${viewYear + end}${yearSuffix}`);
    this.$years.html(items.join(''));
  },

  renderMonths() {
    const {
      options,
      startDate,
      endDate,
      viewDate,
    } = this;
    const disabledClass = options.disabledClass || '';
    const months = options.monthsShort;
    const filter = $.isFunction(options.filter) && options.filter;
    const viewYear = viewDate.getFullYear();
    const now = new Date();
    const thisYear = now.getFullYear();
    const thisMonth = now.getMonth();
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    const items = [];
    let prevDisabled = false;
    let nextDisabled = false;
    let i;

    for (i = 0; i <= 11; i += 1) {
      const date = new Date(viewYear, i, 1);
      let disabled = false;

      if (startDate) {
        prevDisabled = date.getFullYear() === startDate.getFullYear();
        disabled = prevDisabled && date.getMonth() < startDate.getMonth();
      }

      if (!disabled && endDate) {
        nextDisabled = date.getFullYear() === endDate.getFullYear();
        disabled = nextDisabled && date.getMonth() > endDate.getMonth();
      }

      if (!disabled && filter) {
        disabled = filter.call(this.$element, date) === false;
      }

      const picked = viewYear === year && i === month;
      const view = picked ? 'month picked' : 'month';

      items.push(this.createItem({
        disabled,
        picked,
        highlighted: viewYear === thisYear && date.getMonth() === thisMonth,
        index: i,
        text: months[i],
        view: disabled ? 'month disabled' : view,
      }));
    }

    this.$yearPrev.toggleClass(disabledClass, prevDisabled);
    this.$yearNext.toggleClass(disabledClass, nextDisabled);
    this.$yearCurrent
      .toggleClass(disabledClass, prevDisabled && nextDisabled)
      .html(viewYear + options.yearSuffix || '');
    this.$months.html(items.join(''));
  },

  renderDays() {
    const {
      $element,
      options,
      startDate,
      endDate,
      viewDate,
      date: currentDate,
    } = this;
    const {
      disabledClass,
      filter,
      monthsShort,
      weekStart,
      yearSuffix,
    } = options;
    const viewYear = viewDate.getFullYear();
    const viewMonth = viewDate.getMonth();
    const now = new Date();
    const thisYear = now.getFullYear();
    const thisMonth = now.getMonth();
    const thisDay = now.getDate();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    let length;
    let i;
    let n;

    // Days of prev month
    // -----------------------------------------------------------------------

    const prevItems = [];
    let prevViewYear = viewYear;
    let prevViewMonth = viewMonth;
    let prevDisabled = false;

    if (viewMonth === 0) {
      prevViewYear -= 1;
      prevViewMonth = 11;
    } else {
      prevViewMonth -= 1;
    }

    // The length of the days of prev month
    length = getDaysInMonth(prevViewYear, prevViewMonth);

    // The first day of current month
    const firstDay = new Date(viewYear, viewMonth, 1);

    // The visible length of the days of prev month
    // [0,1,2,3,4,5,6] - [0,1,2,3,4,5,6] => [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6]
    n = firstDay.getDay() - (parseInt(weekStart, 10) % 7);

    // [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6] => [1,2,3,4,5,6,7]
    if (n <= 0) {
      n += 7;
    }

    if (startDate) {
      prevDisabled = firstDay.getTime() <= startDate.getTime();
    }

    for (i = length - (n - 1); i <= length; i += 1) {
      const prevViewDate = new Date(prevViewYear, prevViewMonth, i);
      let disabled = false;

      if (startDate) {
        disabled = prevViewDate.getTime() < startDate.getTime();
      }

      if (!disabled && filter) {
        disabled = filter.call($element, prevViewDate) === false;
      }

      prevItems.push(this.createItem({
        disabled,
        highlighted: (
          prevViewYear === thisYear &&
          prevViewMonth === thisMonth &&
          prevViewDate.getDate() === thisDay
        ),
        muted: true,
        picked: prevViewYear === year && prevViewMonth === month && i === day,
        text: i,
        view: 'day prev',
      }));
    }

    // Days of next month
    // -----------------------------------------------------------------------

    const nextItems = [];
    let nextViewYear = viewYear;
    let nextViewMonth = viewMonth;
    let nextDisabled = false;

    if (viewMonth === 11) {
      nextViewYear += 1;
      nextViewMonth = 0;
    } else {
      nextViewMonth += 1;
    }

    // The length of the days of current month
    length = getDaysInMonth(viewYear, viewMonth);

    // The visible length of next month (42 means 6 rows and 7 columns)
    n = 42 - (prevItems.length + length);

    // The last day of current month
    const lastDate = new Date(viewYear, viewMonth, length);

    if (endDate) {
      nextDisabled = lastDate.getTime() >= endDate.getTime();
    }

    for (i = 1; i <= n; i += 1) {
      const date = new Date(nextViewYear, nextViewMonth, i);
      const picked = nextViewYear === year && nextViewMonth === month && i === day;
      let disabled = false;

      if (endDate) {
        disabled = date.getTime() > endDate.getTime();
      }

      if (!disabled && filter) {
        disabled = filter.call($element, date) === false;
      }

      nextItems.push(this.createItem({
        disabled,
        picked,
        highlighted: (
          nextViewYear === thisYear &&
          nextViewMonth === thisMonth &&
          date.getDate() === thisDay
        ),
        muted: true,
        text: i,
        view: 'day next',
      }));
    }

    // Days of current month
    // -----------------------------------------------------------------------

    const items = [];

    for (i = 1; i <= length; i += 1) {
      const date = new Date(viewYear, viewMonth, i);
      let disabled = false;

      if (startDate) {
        disabled = date.getTime() < startDate.getTime();
      }

      if (!disabled && endDate) {
        disabled = date.getTime() > endDate.getTime();
      }

      if (!disabled && filter) {
        disabled = filter.call($element, date) === false;
      }

      const picked = viewYear === year && viewMonth === month && i === day;
      const view = picked ? 'day picked' : 'day';

      items.push(this.createItem({
        disabled,
        picked,
        highlighted: (
          viewYear === thisYear &&
          viewMonth === thisMonth &&
          date.getDate() === thisDay
        ),
        text: i,
        view: disabled ? 'day disabled' : view,
      }));
    }

    // Render days picker
    // -----------------------------------------------------------------------

    this.$monthPrev.toggleClass(disabledClass, prevDisabled);
    this.$monthNext.toggleClass(disabledClass, nextDisabled);
    this.$monthCurrent
      .toggleClass(disabledClass, prevDisabled && nextDisabled)
      .html(options.yearFirst ?
        `${viewYear + yearSuffix} ${monthsShort[viewMonth]}` :
        `${monthsShort[viewMonth]} ${viewYear}${yearSuffix}`);
    this.$days.html(prevItems.join('') + items.join('') + nextItems.join(''));
  },
};
