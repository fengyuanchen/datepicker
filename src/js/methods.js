import $ from 'jquery';
import {
  CLASS_HIDE,
  EVENT_CLICK,
  EVENT_HIDE,
  EVENT_KEYUP,
  EVENT_PICK,
  EVENT_RESIZE,
  EVENT_SHOW,
  NAMESPACE,
} from './constants';
import {
  isDate,
  isNumber,
  isString,
  isUndefined,
  proxy,
} from './utilities';

const REGEXP_DIGITS = /\d+/g;

export default {
  // Show the datepicker
  show() {
    if (!this.built) {
      this.build();
    }

    if (this.shown) {
      return;
    }

    if (this.trigger(EVENT_SHOW).isDefaultPrevented()) {
      return;
    }

    this.shown = true;
    this.$picker.removeClass(CLASS_HIDE).on(EVENT_CLICK, $.proxy(this.click, this));
    this.showView(this.options.startView);

    if (!this.inline) {
      $(window).on(EVENT_RESIZE, (this.onResize = proxy(this.place, this)));
      $(document).on(EVENT_CLICK, (this.onGlobalClick = proxy(this.globalClick, this)));
      $(document).on(EVENT_KEYUP, (this.onGlobalKeyup = proxy(this.globalKeyup, this)));
      this.place();
    }
  },

  // Hide the datepicker
  hide() {
    if (!this.shown) {
      return;
    }

    if (this.trigger(EVENT_HIDE).isDefaultPrevented()) {
      return;
    }

    this.shown = false;
    this.$picker.addClass(CLASS_HIDE).off(EVENT_CLICK, this.click);

    if (!this.inline) {
      $(window).off(EVENT_RESIZE, this.onResize);
      $(document).off(EVENT_CLICK, this.onGlobalClick);
      $(document).off(EVENT_KEYUP, this.onGlobalKeyup);
    }
  },

  toggle() {
    if (this.shown) {
      this.hide();
    } else {
      this.show();
    }
  },

  // Update the datepicker with the current input value
  update() {
    const value = this.getValue();

    if (value === this.oldValue) {
      return;
    }

    this.setDate(value, true);
    this.oldValue = value;
  },

  /**
   * Pick the current date to the element
   *
   * @param {String} _view (private)
   */
  pick(_view) {
    const $this = this.$element;
    let { date } = this;

    if (this.trigger(EVENT_PICK, {
      view: _view || '',
      date,
    }).isDefaultPrevented()) {
      return;
    }

    date = this.formatDate(this.date);
    this.setValue(date);

    if (this.isInput) {
      $this.trigger('input');
      $this.trigger('change');
    }
  },

  // Reset the datepicker
  reset() {
    this.setDate(this.initialDate, true);
    this.setValue(this.initialValue);

    if (this.shown) {
      this.showView(this.options.startView);
    }
  },

  /**
   * Get the month name with given argument or the current date
   *
   * @param {Number} month (optional)
   * @param {Boolean} short (optional)
   * @return {String} (month name)
   */
  getMonthName(month, short) {
    const { options } = this;
    const { monthsShort } = options;
    let { months } = options;

    if ($.isNumeric(month)) {
      month = Number(month);
    } else if (isUndefined(short)) {
      short = month;
    }

    if (short === true) {
      months = monthsShort;
    }

    return months[isNumber(month) ? month : this.date.getMonth()];
  },

  /**
   * Get the day name with given argument or the current date
   *
   * @param {Number} day (optional)
   * @param {Boolean} short (optional)
   * @param {Boolean} min (optional)
   * @return {String} (day name)
   */
  getDayName(day, short, min) {
    const { options } = this;
    let { days } = options;

    if ($.isNumeric(day)) {
      day = Number(day);
    } else {
      if (isUndefined(min)) {
        min = short;
      }

      if (isUndefined(short)) {
        short = day;
      }
    }

    if (min) {
      days = options.daysMin;
    } else if (short) {
      days = options.daysShort;
    }

    return days[isNumber(day) ? day : this.date.getDay()];
  },

  /**
   * Get the current date
   *
   * @param {Boolean} formatted (optional)
   * @return {Date|String} (date)
   */
  getDate(formatted) {
    const { date } = this;

    return formatted ? this.formatDate(date) : new Date(date);
  },

  /**
   * Set the current date with a new date
   *
   * @param {Date} date
   * @param {Boolean} _updated (private)
   */
  setDate(date, _updated) {
    const { filter } = this.options;

    if (isDate(date) || isString(date)) {
      date = this.parseDate(date);

      if ($.isFunction(filter) && filter.call(this.$element, date) === false) {
        return;
      }

      this.date = date;
      this.viewDate = new Date(date);

      if (!_updated) {
        this.pick();
      }

      if (this.built) {
        this.render();
      }
    }
  },

  /**
   * Set the start view date with a new date
   *
   * @param {Date} date
   */
  setStartDate(date) {
    if (isDate(date) || isString(date)) {
      this.startDate = this.parseDate(date);

      if (this.built) {
        this.render();
      }
    }
  },

  /**
   * Set the end view date with a new date
   *
   * @param {Date} date
   */
  setEndDate(date) {
    if (isDate(date) || isString(date)) {
      this.endDate = this.parseDate(date);

      if (this.built) {
        this.render();
      }
    }
  },

  /**
   * Parse a date string with the set date format
   *
   * @param {String} date
   * @return {Date} (parsed date)
   */
  parseDate(date) {
    const { format } = this;
    let parts = [];

    if (isDate(date)) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    } else if (isString(date)) {
      parts = date.match(REGEXP_DIGITS) || [];
    }

    date = new Date();

    const { length } = format.parts;
    let year = date.getFullYear();
    let day = date.getDate();
    let month = date.getMonth();

    if (parts.length === length) {
      $.each(parts, (i, part) => {
        const value = parseInt(part, 10) || 1;

        switch (format.parts[i]) {
          case 'dd':
          case 'd':
            day = value;
            break;

          case 'mm':
          case 'm':
            month = value - 1;
            break;

          case 'yy':
            year = 2000 + value;
            break;

          case 'yyyy':
            year = value;
            break;

          default:
        }
      });
    }

    return new Date(year, month, day);
  },

  /**
   * Format a date object to a string with the set date format
   *
   * @param {Date} date
   * @return {String} (formatted date)
   */
  formatDate(date) {
    const { format } = this;
    let formatted = '';

    if (isDate(date)) {
      const year = date.getFullYear();
      const values = {
        d: date.getDate(),
        m: date.getMonth() + 1,
        yy: year.toString().substring(2),
        yyyy: year,
      };

      values.dd = (values.d < 10 ? '0' : '') + values.d;
      values.mm = (values.m < 10 ? '0' : '') + values.m;
      formatted = format.source;
      $.each(format.parts, (i, part) => {
        formatted = formatted.replace(part, values[part]);
      });
    }

    return formatted;
  },

  // Destroy the datepicker and remove the instance from the target element
  destroy() {
    this.unbind();
    this.unbuild();
    this.$element.removeData(NAMESPACE);
  },
};
