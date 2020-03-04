$(function() {

    function last(term) {
        return split(term).pop();
    }

    function split(string) {
        return string.split(/,\s*/);
    }

    $('.has-autocomplete')
        .on('keydown', function(event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete('instance').menu.active) {
                event.preventDefault();
            }
        })
        .on('focus', function() {
            console.log('focus');
            var string = this.value;
            var search = string.search(/,\s*$/);
            if (search == -1 && string.length > 0) {
                string = string + ', ';
            }
            this.value = string;
            $(this).autocomplete('search', '');
        })
        .on('blur', function() {
            var string = this.value;
            var position = string.search(/,\s*$/i);
            if (position != -1) {
                string = string.substring(0, position);
            }
            this.value = string;
        })
        .autocomplete({
            minLength: 0,
            source: function(request, response) {
                // use the options when included...
                var options = this.element.data('options');
                if (options) {
                    var tags = split(options);
                    response($.ui.autocomplete.filter(tags, last(request.term)));
                    return;
                }

                // use the uri when included...
                var uri = this.element.data('uri');
                if (uri) {
                    $.getJSON(uri, {
                        term: last(request.term)
                    }, response);
                    return;
                }
            },
            focus: function() {
                return false;
            },
            select: function(event, ui) {
                var terms = split(this.value);
                terms.pop();
                if (terms.indexOf(ui.item.value) == -1) {
                    terms.push(ui.item.value);
                }
                terms.push('');
                this.value = terms.join(', ');
                return false;
            },
            close: function (event, ui) {
                if ($(this).is(':focus')) {
                    $(this).autocomplete('search', '');
                }
                return false;
            }
        });

    $('.has-datepicker').datepicker({
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        prevText: '<span class="fa fa-chevron-left">',
        nextText: '<span class="fa fa-chevron-right">'
    });

    $('.weekpicker').datepicker('option', {
        onSelect: function(dateText, inst) {
            var date = $(this).datepicker('getDate');
            var day = date.getDay();
            date.setDate(date.getDate() - day + (day == 0 ? -6 : 1));

            var format = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
            $(this).val($.datepicker.formatDate(format, date, inst.settings));
            $(this).change();
        }
    });

    $('input.timepicker').timepicker({
        step: 15,
        scrollDefault: '09:00'
    });

});
