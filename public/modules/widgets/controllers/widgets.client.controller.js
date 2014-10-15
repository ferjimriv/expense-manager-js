'use strict';

// Widgets controller
angular.module('widgets').controller('WidgetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Widgets',
	function($scope, $stateParams, $location, Authentication, Widgets ) {
		$scope.authentication = Authentication;

		// Create new Widget
		$scope.create = function() {
			// Create new Widget object
			var widget = new Widgets ({
				name: this.name
			});

			// Redirect after save
			widget.$save(function(response) {
				$location.path('widgets/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Widget
		$scope.remove = function( widget ) {
			if ( widget ) { widget.$remove();

				for (var i in $scope.widgets ) {
					if ($scope.widgets [i] === widget ) {
						$scope.widgets.splice(i, 1);
					}
				}
			} else {
				$scope.widget.$remove(function() {
					$location.path('widgets');
				});
			}
		};

		// Update existing Widget
		$scope.update = function() {
			var widget = $scope.widget ;

			widget.$update(function() {
				$location.path('widgets/' + widget._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Widgets
		$scope.find = function() {
			$scope.widgets = Widgets.query();
		};

		// Find existing Widget
		$scope.findOne = function() {
			$scope.widget = Widgets.get({ 
				widgetId: $stateParams.widgetId
			});
		};
	}
]);