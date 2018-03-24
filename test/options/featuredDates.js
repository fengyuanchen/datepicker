QUnit.test('options.featuredDates', function (assert) {
  var $input = window.createInput();
  var date = new Date(2014, 1, 1);
  var featuredDates = [new Date(2014, 1, 14)];

  var datepicker = $input.datepicker({
    date: date,
    featuredDates: featuredDates
  }).data('datepicker');

  $input.datepicker('show');

  datepicker.$days.children().each(function (i) {
    if (i === 19) {
      assert.ok($(this).hasClass(datepicker.options.featuredClass));
    } else {
      assert.ok(!$(this).hasClass(datepicker.options.featuredClass));
    }
  });

  $input.datepicker('hide');
});
