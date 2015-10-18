QUnit.test('method.show', function (assert) {
  var $input = window.createInput();
  var datepicker = $input.datepicker().data('datepicker');

  assert.ok(!datepicker.isShown);
  $input.datepicker('show');
  assert.ok(datepicker.isShown);
  assert.ok(datepicker.$picker.is(':visible'));
  $input.datepicker('hide');
});
