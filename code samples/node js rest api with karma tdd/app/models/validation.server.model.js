'use strict';


module.exports.len = function(max) {
	return function (v) {
		return v.length <= max;
	};
};
