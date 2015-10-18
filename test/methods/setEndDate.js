QUnit.test('method.setEndDate', function (assert) {
  var $input = window.createInput();
  var initialDate = new Date(2014, 1, 14);

  $input.datepicker('setEndDate', initialDate);
  assert.equal($input.data('datepicker').endDate.getTime(), initialDate.getTime());
});
