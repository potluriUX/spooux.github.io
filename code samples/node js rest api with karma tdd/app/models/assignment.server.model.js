'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validation = require('./validation.server.model');


var AssignmentSchema = new Schema({
	assignment_date: {
		type: Date,
		default: Date.now
	},
	score: {
		type: Number,
		default: 0
	},

	class_id: { 
		type: Schema.Types.ObjectId,
		ref: 'Class'
		//, required: 'invalid category' // TODO: make tests pass valid category
	},
	student_id: { 
		type: Schema.Types.ObjectId,
		ref: 'Student'
		//, required: 'invalid category' // TODO: make tests pass valid category
	},
	category: {
		type: String,
		default: '',
		trim: true
	},
	name: {
		type: String,
		default: '',
		trim: true, 	
		unique : true,
		required: 'name cannot be blank',
		validate: [validation.len(15), 'name must be 15 chars in length or less']
	}
});

mongoose.model('Assignment', AssignmentSchema);