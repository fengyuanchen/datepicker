# Changelog

## 1.0.6 (Jan 19, 2019)

- Fix wrong parameter for the `$.contains` function.

## 1.0.5 (Jan 19, 2019)

- Emulate click in touch devices to support hiding the picker automatically (#197).

## 1.0.4 (Jan 6, 2019)

- Fix wrong future month selection when today is 31 (#195).
- Fix month picking issue when the format only contains `YYYY` and `MM` (#193).

## 1.0.3 (Dec 20, 2018)

- Ignore hours, minutes, seconds and milliseconds of parsed date to avoid side effect (#192)
- Fix day view when the selected day is not in the current year (#194).

## 1.0.2 (Dec 15, 2018)

- Convert 2-digit year to 2000+ (#186).

## 1.0.1 (Nov 14, 2018)

- Fix position problem in scrollable modal (#121).
- Fix the issue of the datepicker is replaced after picked a day (#128).

## 1.0.0 (Aug 5, 2018)

- Show full month name in date picker header (#133).
- Fix the issue of converting `0` to `1` (#168).

## 1.0.0-beta (Jun 30, 2018)

- Fix the issue of years and months view rendering problem (#113).
- Add a second parameter to the `filter` function option (#116, #151).
- Enhance the `setStartDate` and `setEndDate` methods, supports `null` as argument (#157).
- Change NPM package name scope from `@fengyuanchen` to `@chenfengyuan`.

## 0.6.5 (Mar 31, 2018)

- Remove added data when destroy.
- Remove unnecessary muted class from start and end years in years view (#130).

## 0.6.4 (Nov 24, 2017)

- Support to load in node environment.
- Add 3 new languages for i18n.
- Add example for using datepicker in modal.

## 0.6.3 (Sep 29, 2017)

- Update view year when the month over the current year.

## 0.6.2 (Sep 29, 2017)

- Fix the issue of days of month computing (#94).

## 0.6.1 (Sep 25, 2017)

- Fix color function error in the CSS.

## 0.6.0 (Sep 24, 2017)

- Refactor in ES6.

## 0.5.5 (Sep 10, 2017)

- Fix the issue of date range limits (#89).

## 0.5.4 (Aug 5, 2017)

- Fix the issue of date repicking (#75).

## 0.5.3 (May 30, 2017)

- Highlight the current year and month.
- Highlight the picked year and month.

## 0.5.2 (Apr 8, 2017)

- Fixed year and month picking issue.

## 0.5.1 (Mar 25, 2017)

- Hide the picker when the target input element is blurred (#54).
- Hide the picker when click the trigger element again.
- Fixed some issues in inline mode.

## 0.5.0 (Feb 11, 2017)

- Added a new option `highlightedClass` for highlight today (#28).
- Fixed the position of picker panel (#49).

## 0.4.0 (Oct 15, 2016)

- Rename `autoshow` option to `autoShow`.
- Rename `autohide` option to `autoHide`.
- Rename `autopick` option to `autoPick`.
- Improved the priority of language options.
- Fixed the issue of date view updating (#33).

## 0.3.1 (Jan 11, 2016)

- Fixed the issue of `startDate` option (#20)

## 0.3.0 (Dec 15, 2015)

- Change the default value of `zIndex` option from `1` to `1000`
- Simplify JavaScript code
- Optimize CSS code styles

## 0.2.2 (Dec 10, 2015)

- Fixed the issue of options overriding (#15)
- Fixed the error of next view month

## 0.2.1 (Oct 26, 2015)

- Fixed the error of month picker

## 0.2.0 (Oct 18, 2015)

- Supports custom events
- Supports to set start view date and end view date
- Improved i18n (internationalization)
- Improved placement of the datepicker
- Improved template

### Options

- Added 10 options: `autoshow`, `autopick`, `offset`, `language`, `startDate`, `endDate`, `mutedClass`, `show`, `hide`, `pick`
- Renamed `autoclose` to `autohide`
- Renamed `dateFormat` to `format`
- Renamed `viewStart` to `startView`
- Renamed `showMonthAfterYear` to `yearFirst`
- Renamed `selectedClass` to `pickedClass`
- Renamed `isDisabled` to `filter`

### Methods

- Added 11 methods: `pick`, `reset`, `getMonthName`, `getDayName`, `getDate`, `setDate`, `setStartDate`, `setEndDate`, `parseDate`, `formatDate`, `destroy`
- Removed 2 methods: `enable`, `disable`

### Events

- Added 3 events: `show.datepicker`, `hide.datepicker`, `pick.datepicker`

## 0.1.0 (Aug 9, 2014)

- Fixed some bugs
- Added i18n files
- Optimized code style

## 0.1.0-beta (Feb 14, 2014)

- Supports 21 options: `date`, `dateFormat`, `disabledClass`, `selectedClass`, `autoclose`, `inline`, `trigger`, `container`, `showMonthAfterYear`, `zIndex`, `viewStart`, `weekStart`, `yearSuffix`, `days`, `daysShort`, `daysMin`, `months`, `monthsShort`, `itemTag`, `template`, `isDisabled`
- Supports 5 methods: `show`, `hide`, `enable`, `disable`, `update`
