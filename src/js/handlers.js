import $ from 'jquery';
import { VIEWS } from './constants';
import { getMinDay } from './utilities';

export default {
  click(e) {
    const $target = $(e.target);
    const {
      options,
      date,
      viewDate,
      format,
    } = this;

    e.stopPropagation();
    e.preventDefault();

    if ($target.hasClass('disabled')) {
      return;
    }

    const view = $target.data('view');
    let viewYear = viewDate.getFullYear();
    let viewMonth = viewDate.getMonth();
    let viewDay = viewDate.getDate();

    switch (view) {
      case 'years prev':
      case 'years next': {
        viewYear = view === 'years prev' ? viewYear - 10 : viewYear + 10;
        viewDate.setFullYear(viewYear);
        viewDate.setDate(getMinDay(viewYear, viewMonth, viewDay));
        this.renderYears();
        break;
      }

      case 'year prev':
      case 'year next':
        viewYear = view === 'year prev' ? viewYear - 1 : viewYear + 1;
        viewDate.setFullYear(viewYear);
        viewDate.setDate(getMinDay(viewYear, viewMonth, viewDay));
        this.renderMonths();
        break;

      case 'year current':
        if (format.hasYear) {
          this.showView(VIEWS.YEARS);
        }

        break;

      case 'year picked':
        if (format.hasMonth) {
          this.showView(VIEWS.MONTHS);
        } else {
          $target.addClass(options.pickedClass)
            .siblings()
            .removeClass(options.pickedClass);
          this.hideView();
        }

        this.pick('year');
        break;

      case 'year':
        viewYear = parseInt($target.text(), 10);
        date.setFullYear(viewYear);
        date.setDate(getMinDay(viewYear, viewMonth, viewDay));
        viewDate.setFullYear(viewYear);
        viewDate.setDate(getMinDay(viewYear, viewMonth, viewDay));

        if (format.hasMonth) {
          this.showView(VIEWS.MONTHS);
        } else {
          $target.addClass(options.pickedClass)
            .siblings()
            .removeClass(options.pickedClass);
          this.hideView();
        }

        this.pick('year');
        break;

      case 'month prev':
      case 'month next':
        viewMonth = view === 'month prev' ? viewMonth - 1 : viewMonth + 1;

        if (viewMonth < 0) {
          viewYear -= 1;
          viewMonth += 12;
        } else if (viewMonth > 11) {
          viewYear += 1;
          viewMonth -= 12;
        }

        viewDate.setFullYear(viewYear);
        viewDate.setDate(getMinDay(viewYear, viewMonth, viewDay));
        viewDate.setMonth(viewMonth);
        this.renderDays();
        break;

      case 'month current':
        if (format.hasMonth) {
          this.showView(VIEWS.MONTHS);
        }

        break;

      case 'month picked':
        if (format.hasDay) {
          this.showView(VIEWS.DAYS);
        } else {
          $target.addClass(options.pickedClass)
            .siblings()
            .removeClass(options.pickedClass);
          this.hideView();
        }

        this.pick('month');
        break;

      case 'month':
        viewMonth = $.inArray($target.text(), options.monthsShort);
        date.setFullYear(viewYear);

        // Set date before month to avoid month changing (#195)
        date.setDate(getMinDay(viewYear, viewMonth, viewDay));
        date.setMonth(viewMonth);
        viewDate.setFullYear(viewYear);
        viewDate.setDate(getMinDay(viewYear, viewMonth, viewDay));
        viewDate.setMonth(viewMonth);

        if (format.hasDay) {
          this.showView(VIEWS.DAYS);
        } else {
          $target.addClass(options.pickedClass)
            .siblings()
            .removeClass(options.pickedClass);
          this.hideView();
        }

        this.pick('month');
        break;

      case 'day prev':
      case 'day next':
      case 'day':
        if (view === 'day prev') {
          viewMonth -= 1;
        } else if (view === 'day next') {
          viewMonth += 1;
        }

        viewDay = parseInt($target.text(), 10);
        date.setFullYear(viewYear);
        date.setMonth(viewMonth);
        date.setDate(viewDay);
        viewDate.setFullYear(viewYear);
        viewDate.setMonth(viewMonth);
        viewDate.setDate(viewDay);
        this.renderDays();

        if (view === 'day') {
          this.hideView();
        }

        this.pick('day');
        break;

      case 'day picked':
        this.hideView();
        this.pick('day');
        break;

      default:
    }
  },

  globalClick({ target }) {
    const { element, $trigger } = this;
    const trigger = $trigger[0];
    let hidden = true;

    while (target !== document) {
      if (target === trigger || target === element) {
        hidden = false;
        break;
      }

      target = target.parentNode;
    }

    if (hidden) {
      this.hide();
    }
  },

  keyup() {
    this.update();
  },

  globalKeyup({ target, key, keyCode }) {
    if (this.isInput && target !== this.element && this.shown && (key === 'Tab' || keyCode === 9)) {
      this.hide();
    }
  },

  touchstart({ target }) {
    // Emulate click in touch devices to support hiding the picker automatically (#197).
    if (this.isInput && target !== this.element && !$.contains(this.$picker[0], target)) {
      this.hide();
      this.element.blur();
    }
  },
};
