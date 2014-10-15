'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var entries = require('../../app/controllers/entries');

	// Entries Routes
	app.route('/entries')
		.get(entries.list)
		.post(users.requiresLogin, entries.create);

	app.route('/entries/:entryId')
		.get(entries.read)
		.put(users.requiresLogin, entries.hasAuthorization, entries.update)
		.delete(users.requiresLogin, entries.hasAuthorization, entries.delete);

	// Finish by binding the Entry middleware
	app.param('entryId', entries.entryByID);
};