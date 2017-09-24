QUnit.test('method.show', function (assert) {
  var $input = window.createInput();
  var datepicker = $input.datepicker().data('datepicker');

  assert.ok(!datepicker.shown);
  $input.datepicker('show');
  assert.ok(datepicker.shown);
  assert.ok(datepicker.$picker.is(':visible'));
  $input.datepicker('hide');
});
