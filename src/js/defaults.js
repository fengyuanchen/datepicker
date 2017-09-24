export default {
  // Show the datepicker automatically when initialized
  autoShow: false,

  // Hide the datepicker automatically when picked
  autoHide: false,

  // Pick the initial date automatically when initialized
  autoPick: false,

  // Enable inline mode
  inline: false,

  // A element (or selector) for putting the datepicker
  container: null,

  // A element (or selector) for triggering the datepicker
  trigger: null,

  // The ISO language code (built-in: en-US)
  language: '',

  // The date string format
  format: 'mm/dd/yyyy',

  // The initial date
  date: null,

  // The start view date
  startDate: null,

  // The end view date
  endDate: null,

  // The start view when initialized
  startView: 0, // 0 for days, 1 for months, 2 for years

  // The start day of the week
  // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday,
  // 4 for Thursday, 5 for Friday, 6 for Saturday
  weekStart: 0,

  // Show year before month on the datepicker header
  yearFirst: false,

  // A string suffix to the year number.
  yearSuffix: '',

  // Days' name of the week.
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  // Shorter days' name
  daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

  // Shortest days' name
  daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],

  // Months' name
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  // Shorter months' name
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  // A element tag for each item of years, months and days
  itemTag: 'li',

  // A class (CSS) for muted date item
  mutedClass: 'muted',

  // A class (CSS) for picked date item
  pickedClass: 'picked',

  // A class (CSS) for disabled date item
  disabledClass: 'disabled',

  // A class (CSS) for highlight date item
  highlightedClass: 'highlighted',

  // The template of the datepicker
  template: (
    '<div class="datepicker-container">' +
      '<div class="datepicker-panel" data-view="years picker">' +
        '<ul>' +
          '<li data-view="years prev">&lsaquo;</li>' +
          '<li data-view="years current"></li>' +
          '<li data-view="years next">&rsaquo;</li>' +
        '</ul>' +
        '<ul data-view="years"></ul>' +
      '</div>' +
      '<div class="datepicker-panel" data-view="months picker">' +
        '<ul>' +
          '<li data-view="year prev">&lsaquo;</li>' +
          '<li data-view="year current"></li>' +
          '<li data-view="year next">&rsaquo;</li>' +
        '</ul>' +
        '<ul data-view="months"></ul>' +
      '</div>' +
      '<div class="datepicker-panel" data-view="days picker">' +
        '<ul>' +
          '<li data-view="month prev">&lsaquo;</li>' +
          '<li data-view="month current"></li>' +
          '<li data-view="month next">&rsaquo;</li>' +
        '</ul>' +
        '<ul data-view="week"></ul>' +
        '<ul data-view="days"></ul>' +
      '</div>' +
    '</div>'
  ),

  // The offset top or bottom of the datepicker from the element
  offset: 10,

  // The `z-index` of the datepicker
  zIndex: 1000,

  // Filter each date item (return `false` to disable a date item)
  filter: null,

  // Event shortcuts
  show: null,
  hide: null,
  pick: null,
};
