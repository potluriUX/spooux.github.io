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
var DistrictSchema = new Schema({
	
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

mongoose.model('District', DistrictSchema);
