import $ from 'jquery';
import Datepicker from './js/datepicker';
import {
  NAMESPACE,
  LANGUAGES,
} from './js/constants';
import {
  isString,
  isUndefined,
} from './js/utilities';

if ($.fn) {
  const AnotherDatepicker = $.fn.datepicker;

  $.fn.datepicker = function jQueryDatepicker(option, ...args) {
    let result;

    this.each((i, element) => {
      const $element = $(element);
      const isDestroy = option === 'destroy';
      let datepicker = $element.data(NAMESPACE);

      if (!datepicker) {
        if (isDestroy) {
          return;
        }

        const options = $.extend({}, $element.data(), $.isPlainObject(option) && option);

        datepicker = new Datepicker(element, options);
        $element.data(NAMESPACE, datepicker);
      }

      if (isString(option)) {
        const fn = datepicker[option];

        if ($.isFunction(fn)) {
          result = fn.apply(datepicker, args);

          if (isDestroy) {
            $element.removeData(NAMESPACE);
          }
        }
      }
    });

    return !isUndefined(result) ? result : this;
  };

  $.fn.datepicker.Constructor = Datepicker;
  $.fn.datepicker.languages = LANGUAGES;
  $.fn.datepicker.setDefaults = Datepicker.setDefaults;
  $.fn.datepicker.noConflict = function noConflict() {
    $.fn.datepicker = AnotherDatepicker;
    return this;
  };
}
