'use strict';

/**
 * Entries history controller
 * @param {mixed} $scope
 * @param {Service} Entries Entry Service
 */
function HistoryWidgetController($scope, Entries) {
    $scope.entries = Entries.query();
}

angular.module('widgets').controller('HistoryWidgetController', ['$scope', 'Entries', HistoryWidgetController]);