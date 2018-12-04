QUnit.test('method.parseDate', function (assert) {
  var $input = window.createInput();
  var date = $input.datepicker('parseDate', '02/14/2014');

  assert.equal(date.getFullYear(), 2014);
  assert.equal(date.getMonth(), 1);
  assert.equal(date.getDate(), 14);
});
