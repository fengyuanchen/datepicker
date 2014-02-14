A simple, lightweight, customize datepicker.

## Installation

Include files:

```html
<script src="/path/to/jquery.js"></script><!-- jQuery is required -->
<link rel="stylesheet" href="/path/to/datepicker.css">
<script src="/path/to/datepicker.js"></script>
```

## Usage

#### Method 1:

Auto init by add the `datepicker` attribute to the element.

```html
<input datepicker type="text">
```

Or

```html
<div datepicker></div>
```

#### Method 2:

Init with the jQuery method `distpicker`.

```html
<input class="datepicker" type="text">
```

Or

```html
<div class="datepicker"></div>
```

```javascript
$(".datepicker").distpicker();
```

#### Method 3:

Init with data attributes.

```html
<input class="datepicker" type="text" value="2020-02-20" data-date-format="yyyy-mm-dd">
```

Or

```html
<div class="datepicker" data-date-format="yyyy-mm-dd">2020-02-20</div>
```

```javascript
$(".datepicker").distpicker();
```

#### Method 4:

Init with options.

```html
<input class="datepicker" type="text" value="2020-02-20">
```

```javascript
$(".datepicker").distpicker({
	dateFormat: "yyyy-mm-dd"
});
```

## Setup

### Set defaults

Example:

```javascript
// for Chinese (zh-CN)
$.fn.distpicker.setDefaults({
	dateFormat: "yyyy-mm-dd",
	viewStart: 0,
	weekStart: 1,
	showMonthAfterYear: true,
	yearSuffix: "年",
	months: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
	monthsShort: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
	days: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
	daysShort: ["周日","周一","周二","周三","周四","周五","周六"],
	daysMin: ["日","一","二","三","四","五","六"]
});
```

### Options

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

years, months, days item element tag.

#### activeClass

* type: string
* default: "dui-selected"

#### disableClass

* type: string
* default: "dui-disabled"

#### isDisable

* type: function
* default:

```javascript
function() {
	return false;
}
```

* param: date object
* return: boolean

example:

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

/!\ All the `data-type` attributes must be set when custom setup.