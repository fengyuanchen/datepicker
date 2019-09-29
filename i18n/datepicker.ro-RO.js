(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (factory(global.jQuery));
}(this, (function ($) {
  'use strict';

  $.fn.datepicker.languages['ro-RO'] = {
    format: 'dd.mm.yyyy',
    days: ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbată'],
    daysShort: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
    daysMin: ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ'],
    weekStart: 1,
    months: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
    monthsShort: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'],
  };
})));
