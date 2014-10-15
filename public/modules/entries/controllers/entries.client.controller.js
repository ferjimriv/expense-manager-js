'use strict';

// Entries controller
angular.module('entries').controller('EntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Entries',
	function($scope, $stateParams, $location, Authentication, Entries ) {

		function initFields(){
			$scope.quantity = 0;
			$scope.entry_type = 'expense';
			$scope.date = new Date();
		}

		$scope.authentication = Authentication;
		$scope.categories = ['Food and drinks', 'Leisure', 'Health', 'Transport', 'Others'];

		initFields();


		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = !$scope.opened && true;
		};

		// Create new Entry
		$scope.create = function() {
			// Create new Entry object
			var entry = new Entries ({
				quantity: this.quantity,
				entry_type: this.entry_type,
				category: this.category,
				date: this.date,
				description: this.description
			});

			// Redirect after save
			entry.$save(function(response) {
				$location.path('entries');
			}, function(errorResponse) {

				/*$scope.errors = [];
				var undefinedAttributes = [];
				angular.forEach(errorResponse.config.data, function(value, key){
					if(value === undefined){
						this.push(key);
						$scope.errors[key] = true;
					}
				}, undefinedAttributes);
				console.log(undefinedAttributes);
				console.log(errorResponse);*/
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			initFields();
		};

		// Remove existing Entry
		$scope.remove = function( entry ) {
			if ( entry ) { entry.$remove();

				for (var i in $scope.entries ) {
					if ($scope.entries [i] === entry ) {
						$scope.entries.splice(i, 1);
					}
				}
			} else {
				$scope.entry.$remove(function() {
					$location.path('entries');
				});
			}
		};

		// Update existing Entry
		$scope.update = function() {
			var entry = $scope.entry ;

			entry.$update(function() {
				$location.path('entries');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Entries
		$scope.find = function() {
			$scope.entries = Entries.query();
		};

		// Find existing Entry
		$scope.findOne = function() {
			$scope.entry = Entries.get({
				entryId: $stateParams.entryId
			});
		};
	}
]);