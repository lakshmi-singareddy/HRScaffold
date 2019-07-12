/* perform any action on the variables within this block(on-page-load) */

Page.onPageVariablesReady = function () {
    /*
     * variables can be accessed through 'Page.Variables' property here
     * e.g. to get dataSet in a staticVariable named 'loggedInUser' use following script
     * Page.Variables.loggedInUser.getData()
     */

};

/* perform any action on widgets within this block */

Page.onReady = function () {
    Page.onPageVariablesReady();
    /*
     * widgets can be accessed through 'Page.Widgets' property here
     * e.g. to get value of text widget named 'username' use following script
     * 'Page.Widgets.username.datavalue'
     */

};

