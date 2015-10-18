QUnit.test('options.date: Date', function (assert) {
  var $input = window.createInput();
  var initialDate = new Date(2014, 1, 14);

  $input.datepicker({
    date: initialDate
  });

  assert.equal($input.datepicker('getDate').getTime(), initialDate.getTime());
});

QUnit.test('options.date: String', function (assert) {
  var $input = window.createInput();
  var initialDate = '02/14/2014';

  $input.datepicker({
    date: initialDate
  });

  assert.equal($input.datepicker('getDate', true), initialDate);
});
