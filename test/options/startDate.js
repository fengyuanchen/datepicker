QUnit.test('options.startDate', function (assert) {
  var $input = window.createInput();
  var startDate = new Date(2014, 1, 14);

  $input.datepicker({
    startDate: startDate
  });

  assert.ok($input.datepicker('getDate').getTime() >= startDate.getTime());
});
