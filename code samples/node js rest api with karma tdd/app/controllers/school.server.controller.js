'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Department = mongoose.model('School'),
    _ = require('lodash');

var crud = require('./crud.server.controller')('School', 'name');

module.exports = crud;
