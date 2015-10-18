QUnit.test('method.update', function (assert) {
  var $input = window.createInput();
  var datepicker = $input.datepicker().data('datepicker');
  var val = '02/14/2014';

  $input.val(val);
  $input.datepicker('update');
  assert.equal($input.datepicker('getDate', true), val);
});
