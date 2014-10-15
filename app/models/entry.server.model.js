'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Entry Schema
 */
var EntrySchema = new Schema({
	quantity:{
		type: Number,
		required: 'Please fill Entry quantity'
	},
	entry_type: {
		type: String,
		enum: ['expense', 'income'],
		default: 'expense',
		required: 'Please fill Entry type'
	},
	category:{
		type: String,
		required: 'Please fill Entry category'
	},
	date:{
		type: Date,
		default: Date.now
	},
	description:{
		type: String,
		default: '',
		trim: true,
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Entry', EntrySchema);