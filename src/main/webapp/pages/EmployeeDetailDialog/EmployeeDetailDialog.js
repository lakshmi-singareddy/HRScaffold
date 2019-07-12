/* perform any action with the variables inside this block(on-page-load) */

Partial.onPageVariablesReady = function () {
    /*
     * variables can be accessed through 'Partial.Variables' property here
     * e.g. Partial.Variables.staticVariable1.getData()
     */

};

/* perform any action with widgets inside this block */

Partial.onReady = function () {
    Partial.onPageVariablesReady();
    /*
     * widgets can be accessed through 'Partial.Widgets' property here
     * e.g. Partial.Widgets.byId(), Partial.Widgets.byName()or access widgets by Partial.Widgets.widgetName
     */

};

