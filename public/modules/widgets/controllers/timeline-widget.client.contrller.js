'use strict';

/**
 * Entries timeline controller
 * @param {mixed} $scope
 */
function TimelineWidgetController($scope, Entries) {
    /*function buildEntiesData(data){

        var data_by_category = {};

        angular.forEach(data, function(value, key){
            if(typeof data_by_category[value.category] == 'undefined') {
                data_by_category[value.category] = {
                    value: value.quantity
                }
            }else {
                data_by_category[value.category].value += value.quantity;
            }
        });

        angular.forEach(data_by_category, function(value, key) {

            var random_number = '#'+Math.floor(Math.random()*16777215).toString(16);

            $scope.distribution_data.push({
                value: value.value,
                color: random_number,
                highlight: random_number,
                label: key
            });

        });

    }*/

    $scope.timeline_data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                fillColor: 'rgba(220,220,220,0.2)',
                strokeColor: 'rgba(220,220,220,1)',
                pointColor: 'rgba(220,220,220,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                fillColor: 'rgba(151,187,205,0.2)',
                strokeColor: 'rgba(151,187,205,1)',
                pointColor: 'rgba(151,187,205,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    //Entries.query(buildEntiesData);

    $scope.timeline_options = {
        bezierCurve : false,
        pointDotRadius : 3,
        responsive : true,
    };
}

angular.module('widgets').controller('TimelineWidgetController', ['$scope', 'Entries', TimelineWidgetController]);