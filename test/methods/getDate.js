QUnit.test('method.getDate', function (assert) {
  var $input = window.createInput();
  var initialDate = new Date(2014, 1, 14);
  var initialDateString = '02/14/2014';

  $input.datepicker({
    date: initialDate
  });

  assert.equal($input.datepicker('getDate').getTime(), initialDate.getTime());
  assert.equal($input.datepicker('getDate', true), initialDateString);
});
