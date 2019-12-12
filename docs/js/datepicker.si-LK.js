(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (factory(global.jQuery));
}(this, (function ($) {
  'use strict';

  $.fn.datepicker.languages['si-LK'] = {
    format: 'yyyy/mm/dd',
    days: ['ඉරිදා', 'සදුදා', 'අගහරුවදා', 'බදාදා', 'බ්‍රහස්පතින්දා', 'සිකුරාදා', 'සෙනසුරාදා'],
    daysShort: ['ඉරිදා', 'සදුදා', 'අග', 'බදාදා', 'බ්‍රහස්', 'සිකු', 'සෙන'],
    daysMin: ['ඉරිදා', 'සදුදා', 'අග', 'බදාදා', 'බ්‍රහස්', 'සිකු', 'සෙන'],
    weekStart: 1,
    months: ['ජනවාරි', 'පෙබරවාරි', 'මාර්තු', 'අප්‍රේල්', 'මැයි', 'ජුනි', 'ජූලි', 'අගෝස්තු', 'සැප්තැම්බර්', 'ඔක්තෝබර්', 'නොවැම්බර්', 'දෙසැම්බර්'],
    monthsShort: ['ජන', 'පෙබ', 'මාර්තු', 'අප්‍රේල්', 'මැයි', 'ජුනි', 'ජූලි', 'අගෝ', 'සැප්', 'ඔක්', 'නොවැ', 'දෙසැ']
  };
})));
