$(function () {
  var $input = window.createInput();

  $input.on('hide.datepicker', function (e) {
    QUnit.test('events.hide', function (assert) {
      assert.equal(e.type, 'hide');
      assert.equal(e.namespace, 'datepicker');
    });
  }).datepicker({
    hide: function (e) {
      QUnit.test('options.hide', function (assert) {
        assert.equal(e.type, 'hide');
        assert.equal(e.namespace, 'datepicker');
      });
    }
  }).datepicker('show').datepicker('hide');
});
