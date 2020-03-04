$(function(){

    $('[data-modal]').on('click', function(event) {
        event.preventDefault();

        var $origin = $(this);
        var selector = $origin.data('modal');
        var $modal = $(selector);
        $modal.modal();

        var $confirm = $modal.find('[data-confirm]');
        $confirm.data('origin', $origin);
        $confirm.data('modal', $modal);
    });

    $('[data-confirm]').on('click', function(event) {
        event.preventDefault();

        var $button = $(this);
        var $origin = $button.data('origin');
        var $modal = $button.data('modal');

        // Submit the form with data-action.
        var action = $origin.data('action');
        if (action) {
            var $form = $origin.closest('form');
            submit_form($form, action);
        }

        // Open the address with data-href.
        var href = $origin.data('href');
        if (href) {
            window.location = href;
        }

        $modal.modal('hide');
    });

    function submit_form($form, action) {
        var $action = $('<input type="hidden">');
        $action.attr('name', 'action');
        $action.attr('value', action);
        $form.append($action);
        $form.submit();
    }

});
