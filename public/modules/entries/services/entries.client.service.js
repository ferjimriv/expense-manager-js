'use strict';

//Entries service used to communicate Entries REST endpoints
angular.module('entries').factory('Entries', ['$resource',
	function($resource) {
		return $resource('entries/:entryId', { entryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);