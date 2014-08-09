# [Datepicker](http://fengyuanchen.github.io/datepicker)

A simple, lightweight, customizable jQuery datepicker plugin.

- [Documentation](http://fengyuanchen.github.io/datepicker)


# Getting started


## Installation

Include files:

```html
<script src="/path/to/jquery.js"></script><!-- jQuery is required -->
<link  href="/path/to/datepicker.css" rel="stylesheet">
<script src="/path/to/datepicker.js"></script>
```


## Usage

### Initialize with `datepicker` attribute

#### Basic:

```html
<input datepicker type="text">
```

#### Add options with `data-*` attribute

```html
<input type="text" datepicker data-date-format="dd/mm/yy" data-auto-close="true">
```

### Initialize with `$.fn.datepicker` method

#### Basic:

```html
<input class="datepicker" type="text">
```

```javascript
$(".datepicker").datepicker();
```

#### Add options

```html
<input id="datepicker-add-options" type="text">
```

```javascript
$("#datepicker-add-options").datepicker({
    dateFormat: "yyyy.m.d",
    weekStart: 1
});
```


## Options

Setup with `$("#target").datepicker(options)`, or global setup with `$.fn.datepicker.setDefaults(options)`.

#### autoClose

* type: boolean
* default: false

Close the picker when a date was selected.


#### dateFormat

* type: string
* default: "mm/dd/yyyy"

example: "yyyy-mm-dd", "yy.m.d"


#### viewStart

* type: number
* default: 0

0 for "days", 1 for "months", 2 for "years".


#### weekStart

* type: number
* default: 0

0 for Sunday, 1 for Monday, 3 for Tuesday, 4 for Thursday, 5 for Friday, 6 for Saturday.


#### showMonthAfterYear

* type: boolean
* default: false


#### yearSuffix

* type: string
* default: ""

example: "年"


#### months

* type: array
* default: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


#### monthsShort

* type: array
* default: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


#### days

* type: array
* default: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


#### daysShort

* type: array
* default: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]


#### daysMin

* type: array
* default: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]


#### itemTag

* type: string
* default: "li"

years, months, days items element tag.


#### selectedClass

* type: string
* default: "datepicker-selected"


#### disabledClass

* type: string
* default: "datepicker-disabled"


#### isDisabled

* type: function
* default: `function() { return false; }`
* param: date object
* return: boolean

For example:

```javascript
var now = Date.now();

$(".datepicker").datepicker({
	isDisabled: function(date) {
		return date.valueOf() < now ? true : false;
	}
})
```


#### template

* type: string
* default:

```javascript
[
    '<div class="datepicker-container" data-type="datepicker">',
        '<div class="datepicker-arrow"></div>',
        '<div class="datepicker-content">',
            '<div class="content-years" data-type="years picker">',
                '<ul class="datepicker-title">',
                    '<li class="datepicker-prev" data-type="years prev">&lsaquo;</li>',
                    '<li class="col-5" data-type="years current"></li>',
                    '<li class="datepicker-next" data-type="years next">&rsaquo;</li>',
                '</ul>',
                '<ul class="datepicker-years" data-type="years"></ul>',
            '</div>',
            '<div class="content-months" data-type="months picker">',
                '<ul class="datepicker-title">',
                    '<li class="datepicker-prev" data-type="year prev">&lsaquo;</li>',
                    '<li class="col-5" data-type="year current"></li>',
                    '<li class="datepicker-next" data-type="year next">&rsaquo;</li>',
                '</ul>',
                '<ul class="datepicker-months" data-type="months"></ul>',
            '</div>',
            '<div class="content-days" data-type="days picker">',
                '<ul class="datepicker-title">',
                    '<li class="datepicker-prev" data-type="month prev">&lsaquo;</li>',
                    '<li class="col-5" data-type="month current"></li>',
                    '<li class="datepicker-next" data-type="month next">&rsaquo;</li>',
                '</ul>',
                '<ul class="datepicker-week" data-type="week"></ul>',
                '<ul class="datepicker-days" data-type="days"></ul>',
            '</div>',
        '</div>',
    '</div>'
].join("")
```

/!\ All the data-type="" attributes must be set when you customize it.



## Methods

* show - Show the datepicker
* hide - Hide the datepicker
* enable - Enable the datepicker
* disable - Disable the datepicker
* update - Update the datepicker



## I18n

For example:

```javascript
// For Chinese (zh-CN)
$.fn.datepicker.setDefaults({
    autoClose: false,
    dateFormat: "yyyy-mm-dd",
    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    daysMin: ["日", "一", "二", "三", "四", "五", "六"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    showMonthAfterYear: true,
    viewStart: 0,
    weekStart: 1,
    yearSuffix: "年"
});
```


## Browser Support

- IE 6+
- Chrome 33+
- Firefox 27+
- Safari 5.1+
- Opera 19+

As a jQuery plugin, you can reference to the [jQuery Browser Support](http://jquery.com/browser-support/).


## [License](https://github.com/fengyuanchen/datepicker/blob/master/LICENSE.md)

Released under the [MIT](http://opensource.org/licenses/mit-license.html) license.
