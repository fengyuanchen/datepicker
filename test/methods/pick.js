QUnit.test('method.pick', function (assert) {
  var $input = window.createInput();

  assert.equal($input.val(), '');
  $input.datepicker('pick');
  assert.equal($input.val(), $input.datepicker('getDate', true));
});
