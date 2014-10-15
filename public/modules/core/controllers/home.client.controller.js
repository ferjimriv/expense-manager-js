'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Widgets', '$state',
	function($scope, Authentication, Widgets, $state) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $scope.area = Widgets.getArea('home');
        $state.transitionTo('home.widgets');
	}
]);