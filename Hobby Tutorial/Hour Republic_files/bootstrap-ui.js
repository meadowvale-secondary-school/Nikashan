jQuery(document).ready(function( $, undefined ) {

    // accordion
    $.ui.accordion.prototype.options.classes['ui-accordion'] = 'panel panel-default';
    $.ui.accordion.prototype.options.classes['ui-accordion-content'] = 'panel-collapse collapse';
    $.ui.accordion.prototype.options.classes['ui-accordion-content-active'] = 'in';
    $.ui.accordion.prototype.options.classes['ui-accordion-header'] = 'panel-heading';

    // button
    $.ui.button.prototype.options.classes['ui-button'] = 'btn btn-default';
    $.ui.button.prototype.options.classes['ui-button-icon'] = 'icon';

    // dialog
    $.ui.dialog.prototype.options.classes['ui-dialog'] = 'modal-content';
    $.ui.dialog.prototype.options.classes['ui-dialog-titlebar'] = 'modal-header';
    $.ui.dialog.prototype.options.classes['ui-dialog-title'] = 'modal-title';
    $.ui.dialog.prototype.options.classes['ui-dialog-titlebar-close'] = 'close';
    $.ui.dialog.prototype.options.classes['ui-dialog-content'] = 'modal-body';
    $.ui.dialog.prototype.options.classes['ui-dialog-buttonpane'] = 'modal-footer';

    // menu
    $.ui.menu.prototype.options.classes['ui-menu'] = '';
    $.ui.menu.prototype.options.classes['ui-menu-icons'] = '';
    $.ui.menu.prototype.options.classes['ui-menu-icon'] = '';
    $.ui.menu.prototype.options.classes['ui-menu-item'] = '';
    $.ui.menu.prototype.options.classes['ui-menu-divider'] = '';
    $.ui.menu.prototype.options.classes['ui-menu-item-wrapper'] = '';

    // progressbar
    $.ui.progressbar.prototype.options.classes['ui-progressbar'] = 'progress';
    $.ui.progressbar.prototype.options.classes['ui-progressbar-value'] = 'progress-bar';

    // selectmenu
    $.ui.selectmenu.prototype.options.classes['ui-selectmenu-button'] = 'btn btn-default dropdown-toggle';
    $.ui.selectmenu.prototype.options.classes['ui-selectmenu-open'] = 'open' ;
    $.ui.selectmenu.prototype.options.icons.button = 'caret-right';
    $.ui.selectmenu.prototype.options.width = 'auto';

    // tabs
    $.ui.tabs.prototype.options.classes['ui-tabs-nav'] = 'nav nav-tabs';
    $.ui.tabs.prototype.options.classes['ui-tabs-panel'] = 'tab-pane';
    $.ui.tabs.prototype.options.classes['ui-tabs-active'] = 'active';

    // tooltip
    $.ui.tooltip.prototype.options.classes['ui-tooltip'] = 'tooltip top fade in';
    $.ui.tooltip.prototype.options.classes['ui-tooltip-content'] = 'tooltip-inner';

    $('[data-toggle="tooltip"]').tooltip();

});
