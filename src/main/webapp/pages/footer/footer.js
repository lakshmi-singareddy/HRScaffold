/* perform any action on the variables within this block(on-page-load) */

Partial.onPageVariablesReady = function () {
    /*
     * variables can be accessed through 'Partial.Variables' property here
     * e.g. to get dataSet in a staticVariable named 'loggedInUser' use following script
     * Partial.Variables.loggedInUser.getData()
     */

};

/* perform any action on widgets within this block */

Partial.onReady = function () {
    Partial.onPageVariablesReady();
    /*
     * widgets can be accessed through 'Partial.Widgets' property here
     * e.g. to get value of text widget named 'username' use following script
     * 'Partial.Widgets.username.datavalue'
     */

};

