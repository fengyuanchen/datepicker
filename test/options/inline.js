QUnit.test('options.inline: input', function (assert) {
  var $input = window.createInput();
  var $container = window.createContainer();

  $input.datepicker({
    inline: true,
    container: $container
  });
  assert.ok(!$container.is(':empty'));
});

QUnit.test('options.inline: not input', function (assert) {
  var $container = window.createContainer();

  assert.ok($container.is(':empty'));
  $container.datepicker({
    inline: true
  });
  assert.ok(!$container.is(':empty'));
});
