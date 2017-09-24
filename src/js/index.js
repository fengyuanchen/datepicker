import $ from 'jquery';
import Datepicker from './datepicker';
import { LANGUAGES } from './constants';

const AnotherDatepicker = $.fn.datepicker;

$.fn.datepicker = function jQueryDatepicker(option, ...args) {
  let result;

  this.each(function each() {
    const $this = $(this);
    let data = $this.data('datepicker');

    if (!data) {
      if (/destroy/.test(option)) {
        return;
      }

      const options = $.extend({}, $this.data(), $.isPlainObject(option) && option);

      data = new Datepicker(this, options);
      $this.data('datepicker', data);
    }

    if (typeof option === 'string') {
      const fn = data[option];

      if ($.isFunction(fn)) {
        result = fn.apply(data, args);
      }
    }
  });

  return typeof result !== 'undefined' ? result : this;
};

$.fn.datepicker.Constructor = Datepicker;
$.fn.datepicker.languages = LANGUAGES;
$.fn.datepicker.setDefaults = Datepicker.setDefaults;
$.fn.datepicker.noConflict = function noConflict() {
  $.fn.datepicker = AnotherDatepicker;
  return this;
};
