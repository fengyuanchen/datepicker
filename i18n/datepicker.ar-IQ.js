(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (factory(global.jQuery));
}(this, (function ($) {
  'use strict';

  $.fn.datepicker.languages['ar-IQ'] = {
    format: 'dd/mm/yyyy',
    days: ['الأحد', 'الأثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    daysShort: ['أحد', 'أثنين', 'ثلاثاء', 'اربعاء', 'خميس', 'جمعة', 'سبت'],
    daysMin: ['أ', 'ث', 'ث', 'أ', 'خ', 'ج', 'س'],
    weekStart: 1,
    months: ['كانون الثاني', 'شباط', 'اذار', 'نيسان', 'ايار', 'حزيران', 'تموز', 'آب', 'ايلول', 'تشرين الاول', 'تشرين الثاني', 'كانون الاول'],
    monthsShort: ['كانون ٢', 'شباط', 'اذار', 'نيسان', 'ايار', 'حزيران', 'تموز', 'آب', 'ايلول', 'تشرين ١', 'تشرين ٢', 'كانون ١']
  };
})));
