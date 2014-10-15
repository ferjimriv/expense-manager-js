'use strict';

// Configuring the Entry module
angular.module('entries').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Entries', 'entries', 'dropdown', '/entries(/create)?');
        Menus.addSubMenuItem('topbar', 'entries', 'List Entries', 'entries');
        Menus.addSubMenuItem('topbar', 'entries', 'New Entry', 'entries/create');
    }
]);
