'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	api = require('./models.server.routes.tests.api')(app, 'Class', '/classes/'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * Unit test
 */
describe('Class API', function() {

	before(function(done) {
		var user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});

		user.save(done);
	});

	after(function(done) {
		User.remove().exec();
		done();
	});

	describe('authenticated create request with', function(done) {

		var classs = {
			name: 'class 1',
			description: 'this is class 1'
		};

		describe('valid classs', function(done) {

			var response = {};

			before(function(done) {
				api.create(classs, function(res) {
					response = res;
					done();
				});
			});
			
			it('returns success status', function() {
				response.statusCode.should.equal(201);
			});

			it('returns classs details including new id', function() {
				response.body.should.have.property('_id');
				response.body.should.have.property('name', classs.name);
				response.body.should.have.property('description', classs.description);
			});

			it('is saved in database', function(done) {
				api.get(response.body._id, function(res) {
					res.statusCode.should.equal(200);
					res.body.should.have.property('name', classs.name);
					res.body.should.have.property('description', classs.description);
					done();
				});
			});

			after(function(done) {
				api.clear(done);
			});
		});

		describe('empty name', function() {

			var response = {};

			before(function(done) {
				api.create({ description: 'Drinks' }, function(res) {
					response = res;
					done();
				});
			});

			it('returns invalid status', function() {
				response.statusCode.should.equal(400);
			});
			it('returns validation message', function() {
				response.body.message.should.equal('name cannot be blank');
			});
		});

		describe('name longer than 15 chars in length', function() {

			var response = {};

			before(function(done) {
				api.create({ name : 'Beverages and Drinks' }, function(res) {
					response = res;
					done();
				});
			});

			it('returns invalid status', function() {
				response.statusCode.should.equal(400);
			});

			it('returns validation message', function() {
				response.body.message.should.equal('name must be 15 chars in length or less');
			});
		});

		describe('duplicate name', function() {
			
			var response = {};

			before(function(done) {
				api.create(classs, function() {
					// make second call with duplicate name
					api.create(classs, function (res) {
						response = res;
						done();
					});
				});
			});

			it('returns invalid status', function() {
				response.statusCode.should.equal(400);
			});

			it('returns validation message', function() {
				response.body.message.should.equal('Name already exists');
			});
		});

		after(function(done) {
			api.clear(done);
		});
	});

	describe('authenticated get request with', function() {

		var classes = [];

		before(function(done) {
			api.create({ name: 'class 1' }, function() {
				api.create({ name: 'class 2' }, function () {
					api.create({ name: 'class 3' }, function () {
						api.list(function(res) {
							classes = res.body;
							done();
						});
					});
				});
			});
		});

		describe('no parameters', function() {
			it('lists all classes in alphabetical order', function() {
				classes.should.have.length(3);
				classes[0].name.should.equal('class 1');
				classes[1].name.should.equal('class 2');
				classes[2].name.should.equal('class 3');
			});
		});

		describe('valid classs id', function() {

			var response = {};

			before(function(done) {
				api.get(classes[0]._id, function(res) {
					response = res;
					done();
				});
			});

			it('returns success status', function() {
				response.statusCode.should.equal(200);
			});

			it('returns the expected classs', function() {
				response.body._id.should.equal(classes[0]._id);
				response.body.name.should.equal(classes[0].name);
				response.body.description.should.equal(classes[0].description);
			});
		});

		describe('invalid classs id', function() {
			var response = {};

			before(function(done) {
				api.get('54c53e9171fde48e4a16008e', function(res) {
					response = res;
					done();
				});
			});

			it('returns not found status', function() {
				response.statusCode.should.equal(404);
			});
		});

		after(function(done) {
			api.clear(done);
		});
	});

	describe('authenticated update request with', function() {
		
		var classs = {
			name: 'class 1',
			description: 'this is class 1'
		};

		var classs2 = {
			name: 'class 2',
			description: 'this is class 2'
		};

		before(function(done) {
			api.create(classs, function(res) {
				classs = res.body;
				api.create(classs2, function(res2) {
					classs2 = res2.body;
					done();	
				});
			});
		});

		describe('valid classs', function() {

			var response = {};

			before(function(done) {
				classs.name = 'class 1';
				classs.description = 'this is class 1';
				api.update(classs, function(res) {
					response = res;
					done();
				});
			});

			it('returns success status', function() {
				response.statusCode.should.equal(200);
			});

			it('returns classs details', function() {
				response.body._id.should.equal(classs._id);
				response.body.name.should.equal(classs.name);
				response.body.description.should.equal(classs.description);
			});

			it('is updated in database', function(done) {
				api.get(classs._id, function(res) {
					res.statusCode.should.equal(200);
					res.body.should.have.property('name', classs.name);
					res.body.should.have.property('description', classs.description);
					done();
				});
			});

			it('only updates specified record', function(done) {
				api.get(classs2._id, function(res) {
					res.statusCode.should.equal(200);
					res.body.should.have.property('name', classs2.name);
					res.body.should.have.property('description', classs2.description);
					done();
				});
			});
		});

		describe('empty classs name', function() {
			
			var response = {};

			before(function(done) {
				classs.name = '';
				api.update(classs, function(res) {
					response = res;
					done();
				});
			});

			it('returns invalid status', function() {
				response.statusCode.should.equal(400);
			});

			it('returns validation message', function() {
				response.body.message.should.equal('name cannot be blank');
			});
		});

		describe('classs name longer than 15 chars in length', function() {

			var response = {};

			before(function(done) {
				classs.name = 'Beverages and Drinks';
				api.update(classs, function(res) {
					response = res;
					done();
				});
			});

			it('returns invalid status', function() {
				response.statusCode.should.equal(400);
			});

			it('returns validation message', function() {
				response.body.message.should.equal('name must be 15 chars in length or less');
			});
		});

		describe('duplicate classs name', function() {
			
			var response = {};

			before(function(done) {
				classs.name = 'Condiments';
				api.update(classs, function(res) {
					response = res;
					done();
				});
			});

			it('returns invalid status', function() {
				response.statusCode.should.equal(400);
			});

			it('returns validation message', function() {
				response.body.message.should.equal('Name already exists');
			});
		});

		after(function(done) {
			api.clear(done);
		});
	});

	describe('authenticated delete request with', function() {

		var classes = [];

		before(function(done) {
			api.create({ name: 'class 1' }, function() {
				api.create({ name: 'class 2' }, function () {
					api.create({ name: 'class 3' }, function () {
						api.list(function(res) {
							classes = res.body;
							done();
						});
					});
				});
			});
		});

		describe('valid classs id', function() {

			var response = {};

			before(function(done) {
				api.delete(classes[1]._id, function(res) {
					response = res;
					done();	
				});
			});

			it('returns success status', function() {
				response.statusCode.should.equal(200);
			});

			it('returns classs details', function() {
				response.body._id.should.equal(classes[1]._id);
				response.body.name.should.equal(classes[1].name);
				response.body.description.should.equal(classes[1].description);
			});

			it('is deleted from database', function(done) {
				api.get(classes[1]._id, function(res) {
					res.statusCode.should.equal(404);
					api.list(function(listRes) {
						listRes.body.length.should.equal(2);
						done();
					});
				});
			});
		});

		describe('invalid classs id', function() {

			var response = {};

			before(function(done) {
				api.delete('54c53e9171fde48e4a16008e', function(res) {
					response = res;
					done();	
				});
			});

			it('returns not found status', function() {
				response.statusCode.should.equal(404);
			});
		});

		after(function(done) {
			api.clear(done);
		});
	});

});
