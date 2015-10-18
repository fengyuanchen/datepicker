QUnit.test('method.reset', function (assert) {
  var initialValue = '02/14/2014';
  var $input = window.createInput({
        value: initialValue
      });

  $input.datepicker('show');
  $input.datepicker('setDate', '02/28/2014');
  $input.datepicker('reset');
  assert.equal($input.datepicker('getDate', true), initialValue);
  $input.datepicker('hide');
});
