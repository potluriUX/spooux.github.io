'use strict';

/**
 * Module dependencies.
 */
var applicationConfiguration = require('./config/config');


module.exports = function(config) {
	config.set({
		// Frameworks to use
		frameworks: ['jasmine'],

		// List of files / patterns to load in the browser
		files: applicationConfiguration.assets.lib.js.concat(applicationConfiguration.assets.js, applicationConfiguration.assets.tests),

	
		reporters: ['progress'],

		// Web server port
		port: 9876,

		// Enable / disable colors in the output (reporters and logs)
		colors: true,

		// Level of logging
		// Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// Enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		
		browsers: ['PhantomJS'],

	
		captureTimeout: 60000,

	
		singleRun: true
	});
};
