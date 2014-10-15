'use strict';

//Setting up route
angular.module('entries').config(['$stateProvider',
	function($stateProvider) {
		// Entries state routing
		$stateProvider.
		state('listEntries', {
			url: '/entries',
			templateUrl: 'modules/entries/views/list-entries.client.view.html'
		}).
		state('createEntry', {
			url: '/entries/create',
			templateUrl: 'modules/entries/views/create-entry.client.view.html'
		}).
		state('viewEntry', {
			url: '/entries/:entryId',
			templateUrl: 'modules/entries/views/view-entry.client.view.html'
		}).
		state('editEntry', {
			url: '/entries/:entryId/edit',
			templateUrl: 'modules/entries/views/edit-entry.client.view.html'
		});
	}
]);