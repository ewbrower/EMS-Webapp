'use strict';

/**
 * @ngdoc overview
 * @name mms.directives
 *
 * @requires mms
 * @requires ui.bootstrap
 * @requires ui.sortable
 * @requires angular-growl
 *
 * @description
 * # mms.directives module
 * This module provides prebuilt components that are commonly used by the mms
 * client applications, for example, cross referencing and element "spec window".
 * Since this module contains directives with ui elements, there's more dependencies
 * then just using the services module. In the future it will be more pick and
 * choose instead of everything being in one module.
 *
 * ## Links to dependencies
 * * [ui.bootstrap](http://angular-ui.github.io/bootstrap/)
 * * [ui.sortable](https://github.com/angular-ui/ui-sortable) (this in turn depends on jquery and jqueryui)
 * * [jQuery](http://jquery.com/)
 * * [jQueryUI](http://jqueryui.com/)
 * * [bootstrap](http://getbootstrap.com/) (for styling and css)
 * * [angular-growl](https://github.com/JanStevens/angular-growl-2)
 * * [redactor](http://imperavi.com/redactor/) (we have redactor oem license)
 * * [font awesome](http://fortawesome.github.io/Font-Awesome/)
 *
 * ## Example app that uses this module
 * The following example is an app that uses the directive mmsSpec to display
 * a spec window for an element
 *
 * ### HTML (index.html)
 *  <pre>
    <!doctype html>
    <html ng-app="exampleApp">
        <head>
            <title>Example app</title>
            <link rel="stylesheet" href="bootstrap.css" type="text/css"/>
            <link rel="stylesheet" href="mms.css"/> <!-- mms directives css stylings -->
            <link rel="stylesheet" href="font-awesome.css"/>
            <link rel="stylesheet" href="angular-growl.css"/>
            <link rel="stylesheet" href="redactor.css"/>
        </head>
        <body>
            <div growl></div> <!-- for notifications -->

            <mms-spec mms-eid="_element_id"></mms-spec>
            <!-- this will display a 'spec window' for the element -->

        <!-- dependencies -->
        <script src="jquery.js"></script>
        <script src="jquery-ui.js"></script>
        <script src="lodash.js"></script>
        <script src="angular.js"></script>
        <script src="sortable.js"></script>
        <script src="ui-bootstrap-tpls.js"></script>
        <script src="angular-growl.js"></script>

        <!-- redactor -->
        <script src="redactor.js"></script>
        <script src="fontcolor.js"></script> <!-- redactor plugin -->

        <!-- mms -->
        <script src="mms.js"></script>
        <script src="mms.directives.tpls.js"></script>
        <script src="mms.directives.js"></script>

        <!-- your app -->
        <script src="app.js"></script>
        </body>
    </html>
    </pre>
 * ### JS (app.js)
 *  <pre>
    angular.module('exampleApp', ['mms', 'mms.directives']);
    </pre>
 */
angular.module('mms.directives', ['mms', 'mms.directives.tpls', 'ui.bootstrap', 'ui.sortable', 'angular-growl'])
.config(['$sceProvider', 'growlProvider', function($sceProvider, growlProvider) {
    $sceProvider.enabled(false);
    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalTimeToLive({success: 5000, error: -1, warning: 5000, info: 5000});
    growlProvider.globalPosition('bottom-right');
}])
.constant('go', window.go)
.constant('tinymce', window.tinymce);
