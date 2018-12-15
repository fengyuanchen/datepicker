import $ from 'jquery';
import { WINDOW } from './constants';

const { toString } = Object.prototype;

export function typeOf(obj) {
  return toString.call(obj).slice(8, -1).toLowerCase();
}

export function isString(value) {
  return typeof value === 'string';
}

export const isNaN = Number.isNaN || WINDOW.isNaN;

export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

export function isUndefined(value) {
  return typeof value === 'undefined';
}

export function isDate(value) {
  return typeOf(value) === 'date' && !isNaN(value.getTime());
}

export function proxy(fn, context, ...args) {
  return (...args2) => fn.apply(context, args.concat(args2));
}

export function selectorOf(view) {
  return `[data-view="${view}"]`;
}

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInMonth(year, month) {
  return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

export function getMinDay(year, month, day) {
  return Math.min(day, getDaysInMonth(year, month));
}

const formatParts = /(y|m|d)+/g;

export function parseFormat(format) {
  const source = String(format).toLowerCase();
  const parts = source.match(formatParts);

  if (!parts || parts.length === 0) {
    throw new Error('Invalid date format.');
  }

  format = {
    source,
    parts,
  };

  $.each(parts, (i, part) => {
    switch (part) {
      case 'dd':
      case 'd':
        format.hasDay = true;
        break;

      case 'mm':
      case 'm':
        format.hasMonth = true;
        break;

      case 'yyyy':
      case 'yy':
        format.hasYear = true;
        break;

      default:
    }
  });

  return format;
}

export function getScrollParent(element, includeHidden = false) {
  const $element = $(element);
  const position = $element.css('position');
  const excludeStaticParent = position === 'absolute';
  const overflowRegex = includeHidden ? /auto|scroll|hidden/ : /auto|scroll/;
  const scrollParent = $element.parents()
    .filter((index, parent) => {
      const $parent = $(parent);

      if (excludeStaticParent && $parent.css('position') === 'static') {
        return false;
      }

      return overflowRegex.test(
        $parent.css('overflow') + $parent.css('overflow-y') + $parent.css('overflow-x'),
      );
    })
    .eq(0);

  return position === 'fixed' || !scrollParent.length
    ? $(element.ownerDocument || document)
    : scrollParent;
}

/**
 * Add leading zeroes to the given value
 * @param {number} value - The value to add.
 * @param {number} [length=1] - The expected value length.
 * @returns {string} Returns converted value.
 */
export function addLeadingZero(value, length = 1) {
  const str = String(Math.abs(value));
  let i = str.length;
  let result = '';

  if (value < 0) {
    result += '-';
  }

  while (i < length) {
    i += 1;
    result += '0';
  }

  return result + str;
}
