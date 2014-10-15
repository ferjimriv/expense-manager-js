'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // Home state routing
        $stateProvider
        .state('home.widgets', {
            views:{
                'history':{
                    templateUrl: 'modules/widgets/views/history-widget.client.view.html'
                },
                'rates':{
                    templateUrl: 'modules/widgets/views/rates-widget.client.view.html'
                },
                'distribution':{
                    templateUrl: 'modules/widgets/views/distribution-widget.client.view.html'
                },
                'timeline':{
                    templateUrl: 'modules/widgets/views/timeline-widget.client.view.html'
                },
            }
        });
    }
]);