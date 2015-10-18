QUnit.test('method.destroy', function (assert) {
  var $input = window.createInput();

  $input.datepicker();
  assert.ok(typeof $input.data('datepicker') === 'object');
  $input.datepicker('destroy');
  assert.ok(typeof $input.data('datepicker') === 'undefined');
});
