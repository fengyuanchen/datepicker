$(function () {
  var $input = window.createInput();

  $input.on('show.datepicker', function (e) {
    QUnit.test('events.show', function (assert) {
      assert.equal(e.type, 'show');
      assert.equal(e.namespace, 'datepicker');
    });
  }).datepicker({
    show: function (e) {
      QUnit.test('options.show', function (assert) {
        assert.equal(e.type, 'show');
        assert.equal(e.namespace, 'datepicker');
      });
    }
  }).datepicker('show').datepicker('hide');
});
