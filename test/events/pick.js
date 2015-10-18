$(function () {
  var $input = window.createInput();
  var initialDate = new Date(2014, 1, 14);

  $input.on('pick.datepicker', function (e) {
    QUnit.test('events.pick', function (assert) {
      assert.equal(e.type, 'pick');
      assert.equal(e.namespace, 'datepicker');
      assert.equal(e.date.getTime(), initialDate.getTime());
      assert.equal(e.view, '');
    });
  }).datepicker({
    date: initialDate,

    pick: function (e) {
      QUnit.test('options.pick', function (assert) {
        assert.equal(e.type, 'pick');
        assert.equal(e.namespace, 'datepicker');
        assert.equal(e.date.getTime(), initialDate.getTime());
        assert.equal(e.view, '');
      });
    }
  }).datepicker('pick');
});
