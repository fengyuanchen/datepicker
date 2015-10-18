QUnit.test('options.format', function (assert) {
  var $input = window.createInput();
  var formatted = '2015/11/11';

  $input.datepicker({
    date: formatted,
    format: 'yyyy/mm/dd'
  });

  assert.equal($input.datepicker('getDate', true), formatted);
});
