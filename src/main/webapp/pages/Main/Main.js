/* perform any action with the variables inside this block(on-page-load) */

Page.onPageVariablesReady = function () {
    /*
     * variables can be accessed through 'Page.Variables' property here
     * e.g. Page.Variables.staticVariable1.getData()
     */

};

/* perform any action with widgets inside this block */

Page.onReady = function () {
    Page.onPageVariablesReady();
    /*
     * widgets can be accessed through 'Page.Widgets' property here
     * e.g. Page.Widgets.byId(), Page.Widgets.byName()or access widgets by Page.Widgets.widgetName
     */

};

