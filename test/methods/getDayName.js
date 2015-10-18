QUnit.test('method.getDayName', function (assert) {
  var $input = window.createInput();
  var options = $input.datepicker().data('datepicker').options;
  var day = $input.datepicker('getDate').getDay();

  assert.equal($input.datepicker('getDayName'), options.days[day]);
  assert.equal($input.datepicker('getDayName', true), options.daysShort[day]);
  assert.equal($input.datepicker('getDayName', true, true), options.daysMin[day]);
  assert.equal($input.datepicker('getDayName', false, true), options.daysMin[day]);
  assert.equal($input.datepicker('getDayName', 0), options.days[0]);
  assert.equal($input.datepicker('getDayName', 0, true), options.daysShort[0]);
  assert.equal($input.datepicker('getDayName', 0, true, true), options.daysMin[0]);
  assert.equal($input.datepicker('getDayName', 0, false, true), options.daysMin[0]);
});
