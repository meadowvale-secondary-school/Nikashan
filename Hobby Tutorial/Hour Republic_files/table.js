$(function(){

    $('.table-button').each(function() {
        var $button = $(this);
        $button.click(function() {
            var href = $button.data('href');
            if (href) {
                window.location = href;
            }
        });
    });

});
