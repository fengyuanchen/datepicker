import $ from 'jquery';
import {
  CLASS_HIDE,
  EVENT_CLICK,
  EVENT_HIDE,
  EVENT_KEYUP,
  EVENT_PICK,
  EVENT_RESIZE,
  EVENT_SCROLL,
  EVENT_SHOW,
  EVENT_TOUCH_START,
  IS_TOUCH_DEVICE,
  NAMESPACE,
} from './constants';
import {
  addLeadingZero,
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
      this.$scrollParent.on(EVENT_SCROLL, $.proxy(this.place, this));
      $(window).on(EVENT_RESIZE, (this.onResize = proxy(this.place, this)));
      $(document).on(EVENT_CLICK, (this.onGlobalClick = proxy(this.globalClick, this)));
      $(document).on(EVENT_KEYUP, (this.onGlobalKeyup = proxy(this.globalKeyup, this)));

      if (IS_TOUCH_DEVICE) {
        $(document).on(EVENT_TOUCH_START, (this.onTouchStart = proxy(this.touchstart, this)));
      }

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
      this.$scrollParent.off(EVENT_SCROLL, this.place);
      $(window).off(EVENT_RESIZE, this.onResize);
      $(document).off(EVENT_CLICK, this.onGlobalClick);
      $(document).off(EVENT_KEYUP, this.onGlobalKeyup);

      if (IS_TOUCH_DEVICE) {
        $(document).off(EVENT_TOUCH_START, this.onTouchStart);
      }
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
   * @param {Boolean} shortForm (optional)
   * @return {String} (month name)
   */
  getMonthName(month, shortForm) {
    const { options } = this;
    const { monthsShort } = options;
    let { months } = options;

    if ($.isNumeric(month)) {
      month = Number(month);
    } else if (isUndefined(shortForm)) {
      shortForm = month;
    }

    if (shortForm === true) {
      months = monthsShort;
    }

    return months[isNumber(month) ? month : this.date.getMonth()];
  },

  /**
   * Get the day name with given argument or the current date
   *
   * @param {Number} day (optional)
   * @param {Boolean} shortForm (optional)
   * @param {Boolean} min (optional)
   * @return {String} (day name)
   */
  getDayName(day, shortForm, min) {
    const { options } = this;
    let { days } = options;

    if ($.isNumeric(day)) {
      day = Number(day);
    } else {
      if (isUndefined(min)) {
        min = shortForm;
      }

      if (isUndefined(shortForm)) {
        shortForm = day;
      }
    }

    if (min) {
      days = options.daysMin;
    } else if (shortForm) {
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

      if ($.isFunction(filter) && filter.call(this.$element, date, 'day') === false) {
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
   * @param {Date|string|null} date
   */
  setStartDate(date) {
    if (isDate(date) || isString(date)) {
      this.startDate = this.parseDate(date);
    } else {
      this.startDate = null;
    }

    if (this.built) {
      this.render();
    }
  },

  /**
   * Set the end view date with a new date
   *
   * @param {Date|string|null} date
   */
  setEndDate(date) {
    if (isDate(date) || isString(date)) {
      this.endDate = this.parseDate(date);
    } else {
      this.endDate = null;
    }

    if (this.built) {
      this.render();
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

    if (!isDate(date)) {
      if (isString(date)) {
        parts = date.match(REGEXP_DIGITS) || [];
      }

      date = date ? new Date(date) : new Date();

      if (!isDate(date)) {
        date = new Date();
      }

      if (parts.length === format.parts.length) {
        $.each(parts, (i, part) => {
          const value = parseInt(part, 10);

          switch (format.parts[i]) {
            case 'dd':
            case 'd':
              date.setDate(value);
              break;

            case 'mm':
            case 'm':
              date.setMonth(value - 1);
              break;

            case 'yy':
              date.setFullYear(2000 + value);
              break;

            case 'yyyy':
              // Converts 2-digit year to 2000+
              date.setFullYear(part.length === 2 ? 2000 + value : value);
              break;

            default:
          }
        });
      }
    }

    // Ignore hours, minutes, seconds and milliseconds to avoid side effect (#192)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
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
      const month = date.getMonth();
      const day = date.getDate();
      const values = {
        d: day,
        dd: addLeadingZero(day, 2),
        m: month + 1,
        mm: addLeadingZero(month + 1, 2),
        yy: String(year).substring(2),
        yyyy: addLeadingZero(year, 4),
      };

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
