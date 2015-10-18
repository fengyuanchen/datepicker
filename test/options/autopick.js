QUnit.test('options.autopick', function (assert) {
  var $input = window.createInput();

  $input.datepicker({
    autopick: true
  });

  assert.equal($input.val(), $input.datepicker('getDate', true));
});
