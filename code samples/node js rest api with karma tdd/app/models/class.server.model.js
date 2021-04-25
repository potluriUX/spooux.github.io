'use strict';

/**
 * Module dependencies.


 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validation = require('./validation.server.model');

/**
 * Class Schema
 */
var ClassSchema = new Schema({
	teacher_id: { 
		type: Schema.Types.ObjectId,
		ref: 'Teacher'
		
	},
	books: [ {type : Schema.ObjectId, ref : 'Books'} ],
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		unique : true,
		trim: true, 	
		required: 'name cannot be blank',
		validate: [validation.len(40), 'name must be 40 chars in length or less']
	}
});

mongoose.model('Class', ClassSchema);
