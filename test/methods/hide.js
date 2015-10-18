QUnit.test('method.hide', function (assert) {
  var $input = window.createInput();
  var datepicker = $input.datepicker().data('datepicker');

  $input.datepicker('show');
  assert.ok(datepicker.isShown);
  $input.datepicker('hide');
  assert.ok(!datepicker.isShown);
  assert.ok(datepicker.$picker.is(':hidden'));
});
