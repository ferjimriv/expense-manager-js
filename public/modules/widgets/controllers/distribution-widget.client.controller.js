'use strict';

/**
 * Entries distribution controller
 * @param {mixed} $scope
 */
function DistributionWidgetController($scope, Entries) {

    function buildEntiesData(data){

        var data_by_category = {};

        angular.forEach(data, function(value, key){

            if(value.entry_type === 'income') return;

            if(typeof data_by_category[value.category] === 'undefined')
                data_by_category[value.category] = { value: value.quantity };
            else
                data_by_category[value.category].value += value.quantity;

        });

        angular.forEach(data_by_category, function(value, key) {

            var random_number = '#'+Math.floor(Math.random()*16777215).toString(16);

            $scope.distribution_data.push({
                value: value.value,
                color: 'rgba(151,187,205,0.5)',
                highlight: 'rgba(151,187,205,1)',
                label: key
            });

        });

    }

    $scope.distribution_data = [];

    Entries.query(buildEntiesData);

    $scope.distribution_options = {
        percentageInnerCutout : 65,
        animateRotate : true,
        animateScale : false,
        responsive : true,
    };

}

angular.module('widgets').controller('DistributionWidgetController', ['$scope', 'Entries', DistributionWidgetController]);