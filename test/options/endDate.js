QUnit.test('options.endDate', function (assert) {
  var $input = window.createInput();
  var endDate = new Date(2014, 1, 14);

  $input.datepicker({
    endDate: endDate
  });

  assert.ok($input.datepicker('getDate').getTime() <= endDate.getTime());
});
