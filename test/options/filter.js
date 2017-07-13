QUnit.test('options.filter', function (assert) {
  var $input = window.createInput();
  var datepicker = $input.datepicker({
        filter: function (date, view) {
          // Disable all Sundays
          if (date.getDay() === 0 && view === 0) {
            return false;
          }
        }
      }).data('datepicker');

  $input.datepicker('show');

  datepicker.$days.children().each(function (i, el) {
    if (i % 7 === 0) {
      assert.ok($(this).hasClass(datepicker.options.disabledClass));
    }
  });

   $input.datepicker('hide');
});
