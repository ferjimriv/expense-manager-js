'use strict';

angular.module('core').directive('CustomDp', function() {
    return {
        restrict: 'E',
        replace: true,
        //template: '<h2> hola </h2>'
        templateUrl: 'modules/core/views/datepicker.client.view.html'
    };
});

