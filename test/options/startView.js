QUnit.test('options.startView: 0', function (assert) {
  var $input = window.createInput();

  $input.datepicker({
    startView: 0
  }).datepicker('show');

  assert.ok($input.data('datepicker').$daysPicker.is(':visible'));
  $input.datepicker('hide');
});

QUnit.test('options.startView: 1', function (assert) {
  var $input = window.createInput();

  $input.datepicker({
    startView: 1
  }).datepicker('show');

  assert.ok($input.data('datepicker').$monthsPicker.is(':visible'));
  $input.datepicker('hide');
});

QUnit.test('options.startView: 2', function (assert) {
  var $input = window.createInput();

  $input.datepicker({
    startView: 2
  }).datepicker('show');

  assert.ok($input.data('datepicker').$yearsPicker.is(':visible'));
  $input.datepicker('hide');
});
