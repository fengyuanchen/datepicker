QUnit.test('method.setStartDate', function (assert) {
  var $input = window.createInput();
  var initialDate = new Date(2014, 1, 14);

  $input.datepicker('setStartDate', initialDate);
  assert.equal($input.data('datepicker').startDate.getTime(), initialDate.getTime());
});
