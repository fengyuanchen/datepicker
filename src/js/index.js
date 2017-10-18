import $ from 'jquery';
import Datepicker from './datepicker';
import {
  NAMESPACE,
  LANGUAGES,
} from './constants';
import {
  isString,
  isUndefined,
} from './utilities';

if ($.fn) {
  const AnotherDatepicker = $.fn.datepicker;

  $.fn.datepicker = function jQueryDatepicker(option, ...args) {
    let result;

    this.each((i, element) => {
      const $element = $(element);
      let data = $element.data(NAMESPACE);

      if (!data) {
        if (/destroy/.test(option)) {
          return;
        }

        const options = $.extend({}, $element.data(), $.isPlainObject(option) && option);

        data = new Datepicker(element, options);
        $element.data(NAMESPACE, data);
      }

      if (isString(option)) {
        const fn = data[option];

        if ($.isFunction(fn)) {
          result = fn.apply(data, args);
        }
      }
    });

    return isUndefined(result) ? this : result;
  };

  $.fn.datepicker.Constructor = Datepicker;
  $.fn.datepicker.languages = LANGUAGES;
  $.fn.datepicker.setDefaults = Datepicker.setDefaults;
  $.fn.datepicker.noConflict = function noConflict() {
    $.fn.datepicker = AnotherDatepicker;
    return this;
  };
}
