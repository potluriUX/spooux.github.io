'use strict';

/**
 * Module dependencies.

 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validation = require('./validation.server.model');

/**
 * Product Schema
 */
var StudentSchema = new Schema({
	school_id: { 
		type: Schema.Types.ObjectId,
		ref: 'School'
		//, required: 'invalid category' // TODO: make tests pass valid category
	},
	class_id: { 
		type: Schema.Types.ObjectId,
		ref: 'Class'
		//, required: 'invalid category' // TODO: make tests pass valid category
	},
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true, 	
		required: 'name cannot be blank',
		validate: [validation.len(40), 'name must be 40 chars in length or less']
	}
});

mongoose.model('Student', StudentSchema);
