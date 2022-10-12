'use strict';

module.exports = function(app) {
	var teacher = require('../controllers/teacher.server.controller');
        var student = require('../controllers/student.server.controller');
        var classs = require('../controllers/class.server.controller');
        var assignment = require('../controllers/assignment.server.controller');
        var book = require('../controllers/book.server.controller');
        var school = require('../controllers/school.server.controller');
        var district = require('../controllers/district.server.controller');
        
	
	var apiAuth = require('../controllers/api.authorization.server.controller');

	app.route('/categories')
		.get(apiAuth, users.requiresLogin, teacher.list)
		.post(apiAuth, users.requiresLogin, teacher.create);
        
        
        app.route('/schools')
		.get(apiAuth, users.requiresLogin, classs.list)
		.post(apiAuth, users.requiresLogin, classs.create);

			app.route('/books')
		.get(apiAuth, users.requiresLogin, books.list)
		.post(apiAuth, users.requiresLogin, books.create);
        
        
        app.route('/departments')
		.get(apiAuth, users.requiresLogin, student.list)
		.post(apiAuth, users.requiresLogin, student.create);

			app.route('/categories')
		.get(apiAuth, users.requiresLogin, assignment.list)
		.post(apiAuth, users.requiresLogin, assignment.create);
        
        
        app.route('/departments')
		.get(apiAuth, users.requiresLogin, district.list)
		.post(apiAuth, users.requiresLogin, district.create);

			app.route('/categories')
		.get(apiAuth, users.requiresLogin, categories.list)
		.post(apiAuth, users.requiresLogin, categories.create);
        
        
     
        
        app.route('/categories')
		.get(apiAuth, users.requiresLogin, school.list)
		.post(apiAuth, users.requiresLogin, school.create);

	app.route('/school/:schoolId')
		.get(apiAuth, users.requiresLogin, school.read)
		.put(apiAuth, users.requiresLogin, school.update)
		.delete(apiAuth, users.requiresLogin, school.delete);
			app.route('/district/:districtId')
		.get(apiAuth, users.requiresLogin, district.read)
		.put(apiAuth, users.requiresLogin, district.update)
		.delete(apiAuth, users.requiresLogin, district.delete);

			app.route('/books/:bookId')
		.get(apiAuth, users.requiresLogin, books.read)
		.put(apiAuth, users.requiresLogin, books.update)
		.delete(apiAuth, users.requiresLogin, books.delete);
			app.route('/student/:studentId')
		.get(apiAuth, users.requiresLogin, student.read)
		.put(apiAuth, users.requiresLogin, student.update)
		.delete(apiAuth, users.requiresLogin, student.delete);
			app.route('/assignment/:assignmentId')
		.get(apiAuth, users.requiresLogin, assignment.read)
		.put(apiAuth, users.requiresLogin, assignment.update)
		.delete(apiAuth, users.requiresLogin, assignment.delete);
			app.route('/classs/:classsId')
		.get(apiAuth, users.requiresLogin, classs.read)
		.put(apiAuth, users.requiresLogin, classs.update)
		.delete(apiAuth, users.requiresLogin, classs.delete);

			app.route('/teacher/:teacherId')
		.get(apiAuth, users.requiresLogin, teacher.read)
		.put(apiAuth, users.requiresLogin, teacher.update)
		.delete(apiAuth, users.requiresLogin, teacher.delete);


};
