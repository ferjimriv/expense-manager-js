'use strict';

// Configuring widgets
angular.module('widgets').run(['Widgets',
    function(Widgets) {
        // Add widgets to home page
        Widgets.addWidget('home', 'rates', 0, RatesWidgetController, 'rates', 'col-md-6');
        Widgets.addWidget('home', 'history', 1, HistoryWidgetController, 'history', 'col-md-6');
        Widgets.addWidget('home', 'distribution', 2, DistributionWidgetController, 'distribution', 'col-md-6');
        Widgets.addWidget('home', 'timeline', 3, TimelineWidgetController, 'timeline', 'col-md-6');
    }
]);