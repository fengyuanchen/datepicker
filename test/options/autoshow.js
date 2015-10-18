QUnit.test('options.autoshow', function (assert) {
  var $input = window.createInput();
  var datepicker = $input.datepicker({
        autoshow: true
      }).data('datepicker');

  assert.ok(datepicker.$picker.is(':visible'));
  $input.datepicker('hide');
});
