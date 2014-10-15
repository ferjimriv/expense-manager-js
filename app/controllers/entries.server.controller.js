'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Entry = mongoose.model('Entry'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Entry already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Entry
 */
exports.create = function(req, res) {
	var entry = new Entry(req.body);
	entry.user = req.user;

	entry.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(entry);
		}
	});
};

/**
 * Show the current Entry
 */
exports.read = function(req, res) {
	res.jsonp(req.entry);
};

/**
 * Update a Entry
 */
exports.update = function(req, res) {
	var entry = req.entry ;

	entry = _.extend(entry , req.body);

	entry.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(entry);
		}
	});
};

/**
 * Delete an Entry
 */
exports.delete = function(req, res) {
	var entry = req.entry ;

	entry.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(entry);
		}
	});
};

/**
 * List of Entries
 */
exports.list = function(req, res) { Entry.find().sort('-created').populate('user', 'displayName').exec(function(err, entries) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(entries);
		}
	});
};

/**
 * Entry middleware
 */
exports.entryByID = function(req, res, next, id) { Entry.findById(id).populate('user', 'displayName').exec(function(err, entry) {
		if (err) return next(err);
		if (! entry) return next(new Error('Failed to load Entry ' + id));
		req.entry = entry ;
		next();
	});
};

/**
 * Entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.entry.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};