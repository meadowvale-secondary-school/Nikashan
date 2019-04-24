$(function(){

    $('.post-encoded').each(function() {
        var $button = $(this);
        $button.click(function(event) {
            event.preventDefault();
            var href = $button.data('href');
            var $form = create_form(href);
            // Append student input
            var student = $button.data('student');
            var $input = create_input('student', student);
            $form.append($input);
            // Append hours input
            var hours = $button.data('hours');
            var $input = create_input('hours', hours);
            // Append the form
            $form.append($input);
            $('body').append($form);
            // Submit the form
            $form.submit();
        });
    });

    function create_form(action) {
        var $form = $('<form>');
        $form.attr('method', 'POST');
        $form.attr('action', action);
        $form.attr('target', '_blank');
        return $form;
    }

    function create_input(name, encoded) {
        var $input = $('<input>');
        $input.attr('name', name);
        $input.attr('value', encoded);
        return $input;
    }

});
