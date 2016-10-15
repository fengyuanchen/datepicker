QUnit.test('options.autoHide', function (assert) {
  var $input = window.createInput();
  var datepicker = $input.datepicker({
        autoHide: true
      }).data('datepicker');

  $input.datepicker('show');
  datepicker.$days.children().eq(20).click();
  assert.ok(datepicker.$picker.is(':hidden'));
});
