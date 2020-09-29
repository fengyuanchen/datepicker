# Datepicker

[![Build Status](https://img.shields.io/travis/fengyuanchen/datepicker.svg)](https://travis-ci.org/fengyuanchen/datepicker) [![Downloads](https://img.shields.io/npm/dm/@chenfengyuan/datepicker.svg)](https://www.npmjs.com/package/@chenfengyuan/datepicker) [![Version](https://img.shields.io/npm/v/@chenfengyuan/datepicker.svg)](https://www.npmjs.com/package/@chenfengyuan/datepicker)

> A simple jQuery datepicker plugin.

- [Website](https://fengyuanchen.github.io/datepicker)

## Table of contents

- [Features](#features)
- [Main](#main)
- [Getting started](#getting-started)
- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [I18n](#i18n)
- [No conflict](#no-conflict)
- [Browser support](#browser-support)
- [Versioning](#versioning)
- [License](#license)

## Features

- Supports [options](#options)
- Supports [methods](#methods)
- Supports [events](#events)
- Supports inline mode
- Supports touch (mobile)
- Supports internationalization
- Cross-browser support

## Main

```text
dist/
├── datepicker.css
├── datepicker.min.css   (compressed)
├── datepicker.js        (UMD)
├── datepicker.min.js    (UMD, compressed)
├── datepicker.common.js (CommonJS, default)
└── datepicker.esm.js    (ES Module)
```

## Getting started

### Install

```shell
npm install @chenfengyuan/datepicker
```

Include files:

```html
<script src="/path/to/jquery.js"></script><!-- jQuery is required -->
<link  href="/path/to/datepicker.css" rel="stylesheet">
<script src="/path/to/datepicker.js"></script>
```

### Usage

Initialize with `$.fn.datepicker` method.

```html
<input data-toggle="datepicker">
<textarea data-toggle="datepicker"></textarea>
<div data-toggle="datepicker"></div>
```

```js
$('[data-toggle="datepicker"]').datepicker();
```

[⬆ back to top](#table-of-contents)

## Options

You may set datepicker options with `$().datepicker(options)`.
If you want to change the global default options, You may use `$.fn.datepicker.setDefaults(options)`.

### autoShow

- Type: `Boolean`
- Default: `false`

Show the datepicker automatically when initialized.

### autoHide

- Type: `Boolean`
- Default: `false`

Hide the datepicker automatically when picked.

### autoPick

- Type: `Boolean`
- Default: `false`

Pick the initial date automatically when initialized.

### inline

- Type: `Boolean`
- Default: `false`

Enable inline mode.

If the element is not an input element, will append the datepicker to the element.
If the `container` option is set, will append the datepicker to the container.

### container

- Type: `Element` or `String`(selector)
- Default: `null`

A element for putting the datepicker. If not set, the datepicker will be appended to `document.body` by default.

> Only works when the `inline` option set to `true`.

### trigger

- Type: `Element` or `String`(selector)
- Default: `null`

A element for triggering the datepicker.

### language

- Type: `String`
- Default: `''`

The ISO language code. If not set, will use the built-in language (`en-US`) by default.

> You should define the language first. View the [I18n](#i18n) section for more information or check out the [`i18n`](i18n) folder for available languages.

```js
$().datepicker({
  language: 'en-GB'
});
```

### format

- Type: `String`
- Default: `'mm/dd/yyyy'`
- Available date placeholders:
  - Year: `yyyy`, `yy`
  - Month: `mm`, `m`
  - Day: `dd`, `d`

The date string format.

```js
$().datepicker({
  format: 'yyyy-mm-dd'
});
```

### date

- Type: `Date` or `String`
- Default: `null`

The initial date. If not set, will use the current date by default.

```js
$().datepicker({
  date: new Date(2014, 1, 14) // Or '02/14/2014'
});
```

### startDate

- Type: `Date` or `String`
- Default: `null`

The start view date. All the dates before this date will be disabled.

### endDate

- Type: `Date` or `String`
- Default: `null`

The end view date. All the dates after this date will be disabled.

### startView

- Type: `Number`
- Default: `0`
- Options:
  - `0`: days
  - `1`: months
  - `2`: years

The start view when initialized.

### weekStart

- Type: `Number`
- Default: `0`
- Options:
  - `0`: Sunday
  - `1`: Monday
  - `2`: Tuesday
  - `3`: Wednesday
  - `4`: Thursday
  - `5`: Friday
  - `6`: Saturday

The start day of the week.

### yearFirst

- Type: `Boolean`
- Default: `false`

Show year before month on the datepicker header

### yearSuffix

- Type: `String`
- Default: `''`

A string suffix to the year number.

```js
$().datepicker({
  yearSuffix: '年'
});
```

### days

- Type: `Array`
- Default: `['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']`

Days' name of the week.

### daysShort

- Type: `Array`
- Default: `['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']`

Shorter days' name.

### daysMin

- Type: `Array`
- Default: `['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']`

Shortest days' name.

### months

- Type: `Array`
- Default: `['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`

Months' name.

### monthsShort

- Type: `Array`
- Default: `['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']`

Shorter months' name.

### itemTag

- Type: `String`
- Default: `'li'`

A element tag for each item of years, months and days.

### mutedClass

- Type: `String`
- Default: `'muted'`

A class (CSS) for muted item.

### pickedClass

- Type: `String`
- Default: `'picked'`

A class (CSS) for picked item.

### disabledClass

- Type: `String`
- Default: `'disabled'`

A class (CSS) for disabled item.

### highlightedClass

- Type: `String`
- Default: `'highlighted'`

A class (CSS) for highlight date item.

### template

- Type: `String`
- Default:

```html
<div class="datepicker-container">
  <div class="datepicker-panel" data-view="years picker">
    <ul>
      <li data-view="years prev">&lsaquo;</li>
      <li data-view="years current"></li>
      <li data-view="years next">&rsaquo;</li>
    </ul>
    <ul data-view="years"></ul>
  </div>
  <div class="datepicker-panel" data-view="months picker">
    <ul>
      <li data-view="year prev">&lsaquo;</li>
      <li data-view="year current"></li>
      <li data-view="year next">&rsaquo;</li>
    </ul>
    <ul data-view="months"></ul>
  </div>
  <div class="datepicker-panel" data-view="days picker">
    <ul>
      <li data-view="month prev">&lsaquo;</li>
      <li data-view="month current"></li>
      <li data-view="month next">&rsaquo;</li>
    </ul>
    <ul data-view="week"></ul>
    <ul data-view="days"></ul>
  </div>
</div>
```

The template of the datepicker.

**Note:** All the `data-view` attributes must be set when you customize it.

### offset

- Type: `Number`
- Default: `10`

The offset top or bottom of the datepicker from the element.

### zIndex

- Type: `Number`
- Default: `1`

The CSS `z-index` style for the datepicker.

### filter

- Type: `Function`
- Default: `null`
- Syntax: `filter(date, view)`
  - `date`: the date for checking.
  - `view`: the the current view, one of `day`, `month` or `year`.

Filter each date item. If return a `false` value, the related date will be disabled.

```js
var now = Date.now();

$().datepicker({
  filter: function(date, view) {
    if (date.getDay() === 0 && view === 'day') {
      return false; // Disable all Sundays, but still leave months/years, whose first day is a Sunday, enabled.
    }
  }
});
```

### show

- Type: `Function`
- Default: `null`

A shortcut of the "show.datepicker" event.

### hide

- Type: `Function`
- Default: `null`

A shortcut of the "hide.datepicker" event.

### pick

- Type: `Function`
- Default: `null`

A shortcut of the "pick.datepicker" event.

[⬆ back to top](#table-of-contents)

## Methods

Common usage:

```js
$().datepicker('method', argument1, , argument2, ..., argumentN);
```

### show()

Show the datepicker.

### hide()

Hide the datepicker.

### update()

Update the datepicker with the value or text of the current element.

### pick()

Pick the current date to the element.

### reset()

Reset the datepicker.

### getMonthName([month[, short]])

- **month** (optional):
  - Type: `Number`
  - Default: the month of the current date

- **short** (optional):
  - Type: `Boolean`
  - Default: `false`
  - Get the shorter month name

- (return value):
  - Type: `String`

Get the month name with given argument or the current date.

```js
$().datepicker('getMonthName'); // 'January'
$().datepicker('getMonthName', true); // 'Jan'
$().datepicker('getMonthName', 11); // 'December'
$().datepicker('getMonthName', 11, true); // 'Dec'
```

### getDayName([day[, short[, min]])

- **day** (optional):
  - Type: `Number`
  - Default: the day of the current date

- **short** (optional):
  - Type: `Boolean`
  - Default: `false`
  - Get the shorter day name

- **min** (optional):
  - Type: `Boolean`
  - Default: `false`
  - Get the shortest day name

- (return value):
  - Type: `String`

Get the day name with given argument or the current date.

```js
$().datepicker('getDayName'); // 'Sunday'
$().datepicker('getDayName', true); // 'Sun'
$().datepicker('getDayName', true, true); // 'Su'
$().datepicker('getDayName', 6); // 'Saturday'
$().datepicker('getDayName', 6, true); // 'Sat'
$().datepicker('getDayName', 6, true, true); // 'Sa'
```

### getDate([formatted])

- **formatted** (optional):
  - Type: `Boolean`
  - Default: `false`
  - Get a formatted date string

- (return value):
  - Type: `Date` or `String`

Get the current date.

```js
$().datepicker('getDate'); // date object
$().datepicker('getDate', true); // '02/14/2014'
```

### setDate(date)

- **date**:
  - Type: `Date` or `String`

Set the current date with a new date.

```js
$().datepicker('setDate', new Date(2014, 1, 14));
$().datepicker('setDate', '02/14/2014');
```

### setStartDate(date)

- **date**:
  - Type: `Date` or `String` or `null`

Set the start view date with a new date.

### setEndDate(date)

- **date**:
  - Type: `Date` or `String` or `null`

Set the end view date with a new date.

### parseDate(date)

- **date**:
  - Type: `String`

Parse a date string with the set date format.

```js
$().datepicker('parseDate', '02/14/2014'); // date object
```

### formatDate(date)

- **date**:
  - Type: `Date`

Format a date object to a string with the set date format.

```js
$().datepicker('formatDate', new Date(2014, 1, 14)); // '02/14/2014'
```

### destroy()

Destroy the datepicker and remove the instance from the target element.

[⬆ back to top](#table-of-contents)

## Events

### show.datepicker

This event fires when starts to show the datepicker.

### hide.datepicker

This event fires when starts to hide the datepicker.

### pick.datepicker

- **event.date**:
  - Type: `Date`
  - The current date

- **event.view**:
  - Type: `String`
  - Default: `''`
  - Options: `'year'`, `'month'`, `'day'`
  - The current visible view

This event fires when start to pick a year, month or day.

```js
$().on('pick.datepicker', function (e) {
  if (e.date < new Date()) {
    e.preventDefault(); // Prevent to pick the date
  }
});
```

[⬆ back to top](#table-of-contents)

## I18n

```js
// datepicker.zh-CN.js
$.fn.datepicker.languages['zh-CN'] = {
  format: 'yyyy年mm月dd日',
  days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  daysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  daysMin: ['日', '一', '二', '三', '四', '五', '六'],
  months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  weekStart: 1,
  startView: 0,
  yearFirst: true,
  yearSuffix: '年'
};
```

```html
<script src="/path/to/datepicker.js"></script>
<script src="/path/to/datepicker.zh-CN.js"></script>
<script>
  $().datepicker({
    language: 'zh-CN'
  });
</script>
```

[⬆ back to top](#table-of-contents)

## No conflict

If you have to use other plugin with the same namespace, just call the `$.fn.datepicker.noConflict` method to revert to it.

```html
<script src="other-plugin.js"></script>
<script src="datepicker.js"></script>
<script>
  $.fn.datepicker.noConflict();
  // Code that uses other plugin's "$().datepicker" can follow here.
</script>
```

## Browser support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 9+

## Versioning

Maintained under the [Semantic Versioning guidelines](https://semver.org/).

## License

[MIT](https://opensource.org/licenses/MIT) © [Chen Fengyuan](https://chenfengyuan.com/)

[⬆ back to top](#table-of-contents)
