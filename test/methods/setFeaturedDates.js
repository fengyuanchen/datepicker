QUnit.test('method.setFeaturedDates', function (assert) {
  var $input = window.createInput();
  var featuredDates = [new Date(2014, 1, 14)];

  $input.datepicker('setFeaturedDates', featuredDates);
  assert.equal($input.data('datepicker').featuredDates.length, 1);
  assert.equal($input.data('datepicker').featuredDates[0].getTime(), featuredDates[0].getTime());
});
