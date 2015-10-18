QUnit.test('options.autohide', function (assert) {
  var $input = window.createInput();
  var datepicker = $input.datepicker({
        autohide: true
      }).data('datepicker');

  $input.datepicker('show');
  datepicker.$days.children().eq(20).click();
  assert.ok(datepicker.$picker.is(':hidden'));
});
