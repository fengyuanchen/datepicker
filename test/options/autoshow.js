QUnit.test('options.autoShow', function (assert) {
  var $input = window.createInput();
  var datepicker = $input.datepicker({
        autoShow: true
      }).data('datepicker');

  assert.ok(datepicker.$picker.is(':visible'));
  $input.datepicker('hide');
});
