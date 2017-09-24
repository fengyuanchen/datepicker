QUnit.test('method.hide', function (assert) {
  var $input = window.createInput();
  var datepicker = $input.datepicker().data('datepicker');

  $input.datepicker('show');
  assert.ok(datepicker.shown);
  $input.datepicker('hide');
  assert.ok(!datepicker.shown);
  assert.ok(datepicker.$picker.is(':hidden'));
});
