$(function(){

    $('[data-select]').each(function() {
        var $button = $(this);
        var $group = $button.closest('fieldset');
        var $inputs = $group.find('input');
        $inputs.on('change', function(event) {
            update_group_button($group)
        });
        $button.on('click', function(event) {
            event.preventDefault();
            update_group($group, $button);
        });
        update_group_button($group);
    });

    function update_group_button($group) {
        var $button = $group.find('[data-select]');
        var checked = inputs_checked($group);
        update_button($button, checked);
    }

    function inputs_checked($group) {
        var $inputs = $group.find('input');
        var $checked = $group.find('input:checked');
        return $inputs.length == $checked.length;
    }

    function update_button($button, checked) {
        var data = checked ? 'deselect' : 'select';
        var text = $button.data(data);
        if (text) {
            $button.text(text);
        }
    }

    function update_group($group, $button) {
        var checked = inputs_checked($group);
        var $inputs = $group.find('input');
        if (checked) {
            update_inputs($inputs, !checked);
            update_button($button, !checked);
        } else {
            update_inputs($inputs, !checked);
            update_button($button, !checked);
        }
    }

    function update_inputs($inputs, checked) {
        $inputs.prop('checked', checked);
    }

});
