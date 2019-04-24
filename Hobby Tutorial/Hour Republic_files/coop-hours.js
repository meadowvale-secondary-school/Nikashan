$(function() {

    var $shiftCount = $('.shift-count');
    var index = parseInt($shiftCount.text());

    function updateHeaders() {
        var date = moment($('.shift-week').val());

        $('.shift-date').each(function(i) {
            $(this).text(date.format('dddd, MMMM D, YYYY'));
            date.add(1, 'days');
        });
    }

    function recalculateHours() {
        var duration_total = 0;
        $('.shift-row').each(function() {
            var $this = $(this);
            var start = $this.find('.shift-start').val();
            var lunch = $this.find('.shift-lunch').val();
            var end = $this.find('.shift-end').val();

            $this.find('.shift-end').timepicker('option', {
                minTime: start,
                showDuration: true,
                scrollDefault: start
            })

            var s = moment(start, 'hh:mma'), e = moment(end, 'hh:mma');

            var duration_hr = 0;
            var duration_ms = s.isValid() && e.isValid() ? e.diff(s) : 0;
            var duration_min = duration_ms / 1000 / 60;
            duration_min -= lunch;
            duration_hr = duration_min / 60;

            if (duration_hr < 0) {
                duration_hr = 0;
            }

            if ($this.find('.shift-absent').is(':checked')) {
                duration_hr = 0;
            }

            duration_total += duration_hr;
            $this.find('.shift-hours').text(duration_hr.toFixed(2));
        });
        $('.hours-total').text(duration_total.toFixed(2));
    }

    function addShift($row, callback) {
        var url = $row.closest('table').data('shift-template');
        var day = $row.data('shift-day');

        $.get(url + '/' + day + '/' + (index++), function(template) {
            var $th = $row.nextAll('tr:has(th):first').prev();
            var $tr = $th.length > 0 ? $th : $row;

            $template = $(template);
            $template.find('input.timepicker').timepicker({
                step: 15,
                scrollDefault: '09:00'
            });

            $tr.after($template);

            $shiftCount.text(parseInt($shiftCount.text()) + 1);

            if (typeof callback == "function") {
                callback($template);
            }

            recalculateHours();
        });
    }

    $('.add-shift').click(function() {
        addShift($(this).closest('tr'));

        return false;
    });

    $('#employers').on('change', function() {
        var $option = $(this).find(':selected');

        if ($option.val() == -1) {
            return;
        }

        $('#company-input').val($option.data('company'));
        $('#contact-input').val($option.data('contact'));
        $('#email-input').val($option.data('email'));
        $('#phone-input').val($option.data('phone'));
        $('#phone-ext-input').val($option.data('ext'));
    })

    $('#presets').on('change', function() {
        var $option = $(this).find(':selected');

        if ($option.val() == -1) {
            return;
        }

        var preset = $option.data('preset');
        console.log(preset);

        $('#company-input').val(preset.hours_rep_company);
        $('#contact-input').val(preset.hours_rep_name);
        $('#email-input').val(preset.hours_rep_email);
        $('#phone-input').val(preset.hours_rep_phone);
        $('#phone-ext-input').val(preset.hours_rep_ext);
        $('#description-input').val(preset.hours_activity);
        $('#learned-input').val(preset.hours_skills);

        $('.delete-shift').click();
        index = 0;

        for (var day in preset.shifts) {
            preset.shifts[day].forEach(function(shift) {
                addShift($('[data-shift-day="' + day + '"]'), function($shift) {
                    $shift.find('.shift-type').val(shift.shift_type);
                    $shift.find('.shift-start').val(shift.shift_start);
                    $shift.find('.shift-lunch').val(shift.shift_lunch);
                    $shift.find('.shift-end').val(shift.shift_end);
                    $shift.find('.shift-absent').prop('checked', shift.shift_absent ?
                        true : false);
                    $shift.find('.shift-late').prop('checked', shift.shift_late ? true :
                        false);
                    $shift.find('.shift-description').val(shift.shift_comments);
                });
            })
        }

        $('#employers').val(-1);
    })

    $('#confirm-preset-save [data-confirm]').click(function() {
        var url = $('#preset-save').data('save-preset-url');

        $.post(url, $('form').serialize(), function(option) {
            var $option = $(option);
            $('#presets option[value="-1"]').after($option);
            $('#presets').val($option.val());
        });
    })

    $('#confirm-preset-delete [data-confirm]').click(function() {
        var id = $('#presets').val();

        if (id == -1) {
            return;
        }

        var url = $('#preset-delete').data('delete-preset-url') + '/' + id;

        $.get(url, function(count) {
            if (count > 0) {
                $('#presets').val(-1);
                $('#presets option[value="' + id + '"]').remove();
            }
        });
    })

    $('table').on('click', '.delete-shift', function() {
        var index = $(this).closest('tr').data('shift-index');
        $(this).closest('table').find('[data-shift-index=' + index + ']').remove();
        $shiftCount.text(parseInt($shiftCount.text()) - 1);

        recalculateHours();

        return false;
    });

    $('table').on('change', 'input', recalculateHours);

    $('.shift-week').change(function() {
        updateHeaders();
    });

    $('#edit-hours').click(function() {
        $('#hours-input').val($('.hours-total').text());
        $('#hours-override-input').val($('#hours-override-input').val() == 1 ? 0 : 1);
        $('#hours-input').toggle();
        $('.hours-total').toggle();

        return false;
    })

    if ($('#hours-override-input').val() == 1) {
        $('#hours-input').show();
        $('.hours-total').hide();
    }

    updateHeaders();
    recalculateHours();

})
