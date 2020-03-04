$(function(){

    $('[data-ajax-id]').each(function() {
        var $target = $(this);
        register_events_target($target);
    });

    function register_events_target($target) {
        var $anchors = $target.find('a');
        $anchors.each(function() {
            var $sender = $(this);
            register_anchor_event($target, $sender);
        });
        var $selects = $target.find('select');
        $selects.each(function() {
            var $sender = $(this);
            register_select_event($target, $sender);
        });
    }

    // Anchors

    function register_anchor_event($target, $sender) {
        $sender.on('click', function(event) {
            event.preventDefault();
            load_href($target, $sender);
        });
    }

    function load_href($target, $sender) {
        var href = $sender.attr('href');
        var spinner = '<span class="fa fa-refresh animation-spin"></span>';
        $sender.replaceWith(spinner);
        $.get(href, function(response) {
            process_response($target, response);
        });
    }

    // Select menus

    function register_select_event($target, $sender) {
        $sender.on('change', function(event) {
            event.preventDefault();
            submit_form_select($sender);
        });
    }

    function submit_form_select($sender) {
        var uri = get_action_from_form($sender);
        var data = get_data_from_select($sender);
        $sender.prop('disabled', true);
        $.post(uri, data, function(response) {
            $sender.prop('disabled', false);
        });
    }

    function get_action_from_form($sender) {
        var $form = $sender.closest('form');
        var action = $form.attr('action');
        return action;
    }

    function get_data_from_select($sender) {
        var data = {};
        var name = $sender.attr('name');
        var selection = $sender.val();
        data[name] = selection;
        return data;
    }

    // Processing responses

    function process_response($target, response) {
        var id = get_id($target);
        var $subject = get_subject(response, id);
        update_target($target, $subject);
    }

    function get_id($target) {
        return $target.data('ajax-id');
    }

    function get_subject(response, id) {
        var $response = $(response)
        return $response.find('[data-ajax-id=' + id + ']');
    }

    function update_target($target, $subject) {
        var html = $subject.html();
        $target.html(html);
        register_events_target($target);
    }

});
