QUnit.test('method.getMonthName', function (assert) {
  var $input = window.createInput();
  var options = $input.datepicker().data('datepicker').options;
  var month = $input.datepicker('getDate').getMonth();

  assert.equal($input.datepicker('getMonthName'), options.months[month]);
  assert.equal($input.datepicker('getMonthName', true), options.monthsShort[month]);
  assert.equal($input.datepicker('getMonthName', 0), options.months[0]);
  assert.equal($input.datepicker('getMonthName', 0, true), options.monthsShort[0]);
});
