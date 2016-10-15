QUnit.test('options.autoPick', function (assert) {
  var $input = window.createInput();

  $input.datepicker({
    autoPick: true
  });

  assert.equal($input.val(), $input.datepicker('getDate', true));
});
