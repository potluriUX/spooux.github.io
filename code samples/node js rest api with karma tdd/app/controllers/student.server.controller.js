'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Department = mongoose.model('Student'),
    _ = require('lodash');

var crud = require('./crud.server.controller')('Student', 'name');

module.exports = crud;
