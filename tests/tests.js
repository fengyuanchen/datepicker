!(function() {

    "use strict";

    var getDatepicker = function(options, fn) {
        var $element = $('<input type="text">');

        $element.appendTo("body");
        $.isFunction(fn) && fn($element);

        $element.datepicker(options).hide();

        return $element.data("datepicker") || {};
    };

    test("default date", function() {
        var datepicker = getDatepicker({
                dateFormat: "yyyy-mm-dd"
            }),
            date = datepicker.date,
            now = new Date();

        equal(date.getFullYear(), now.getFullYear());
        equal(date.getMonth(), now.getMonth());
        equal(date.getDate(), now.getDate());
    });

    test("custom date", function() {
        var datepicker = getDatepicker({
                dateFormat: "yyyy-mm-dd"
            }, function($element) {
                $element.val("2020-02-15");
            }),
            viewDate = datepicker.viewDate;

        equal(viewDate.getFullYear(), 2020);
        equal(viewDate.getMonth(), 1); // February
        equal(viewDate.getDate(), 15);
    });

    test("date format", function() {
        var datepicker = getDatepicker({
                dateFormat: "yyyy.m.d"
            }),
            format = datepicker.format;

        equal(format.year, true);
        equal(format.month, true);
        equal(format.day, true);
        equal(format.separator, ".");
        equal(format.parts.join("."), "yyyy.m.d");
    });

    test("change date", function() {
        var datepicker = getDatepicker(),
            $element = datepicker.$element,
            viewDate;

        $element.val("2/15/2020").trigger("keyup");
        viewDate = datepicker.viewDate;

        equal(viewDate.getFullYear(), 2020);
        equal(viewDate.getMonth(), 1); // February
        equal(viewDate.getDate(), 15);
    });

    test("select date", function() {
        var datepicker = getDatepicker({
                dateFormat: "m/d/yy"
            }, function($element) {
                $element.val("2/15/20");
            }),
            viewDate;

        datepicker.$years.find("[data-type='year selected']").next().trigger("click"); // next year: 2021
        datepicker.$months.find("[data-type='month selected']").next().trigger("click"); // next month: 3
        datepicker.$days.find("[data-type='day selected']").next().trigger("click"); // next day: 16
        viewDate = datepicker.viewDate;

        equal(viewDate.getFullYear(), 2021);
        equal(viewDate.getMonth(), 2); // March
        equal(viewDate.getDate(), 16);
        equal(datepicker.$element.val(), "3/16/21");
    });

    test("no input element", function() {
        var $element = $('<div data-date-format="yyyy/m/d">2020/2/15</div>'),
            datepicker = $element.appendTo("body").datepicker().hide().data("datepicker"),
            viewDate;

        datepicker.$years.find("[data-type='year selected']").next().trigger("click"); // next year: 2021
        datepicker.$months.find("[data-type='month selected']").next().trigger("click"); // next month: 3
        datepicker.$days.find("[data-type='day selected']").next().trigger("click"); // next day: 16
        viewDate = datepicker.viewDate;
        $element.hide();

        equal(viewDate.getFullYear(), 2021);
        equal(viewDate.getMonth(), 2); // March
        equal(viewDate.getDate(), 16);
        equal(datepicker.$element.text(), "2021/3/16");
    });
}());
