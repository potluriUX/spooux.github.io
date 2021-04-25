'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	api = require('./models.server.routes.tests.api')(app, 'School', '/schools/'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * Unit test
 */
describe('School API', function() {

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

		var school = {
			name: 'school 1',
			description: 'this is school 1'
		};

		describe('valid school', function(done) {

			var response = {};

			before(function(done) {
				api.create(school, function(res) {
					response = res;
					done();
				});
			});
			
			it('returns success status', function() {
				response.statusCode.should.equal(201);
			});

			it('returns school details including new id', function() {
				response.body.should.have.property('_id');
				response.body.should.have.property('name', school.name);
				response.body.should.have.property('description', school.description);
			});

			it('is saved in database', function(done) {
				api.get(response.body._id, function(res) {
					res.statusCode.should.equal(200);
					res.body.should.have.property('name', school.name);
					res.body.should.have.property('description', school.description);
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
				api.create(school, function() {
					// make second call with duplicate name
					api.create(school, function (res) {
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

		var schools = [];

		before(function(done) {
			api.create({ name: 'school 1' }, function() {
				api.create({ name: 'class 2' }, function () {
					api.create({ name: 'class 3' }, function () {
						api.list(function(res) {
							schools = res.body;
							done();
						});
					});
				});
			});
		});

		describe('no parameters', function() {
			it('lists all schools in alphabetical order', function() {
				schools.should.have.length(3);
				schools[0].name.should.equal('school 1');
				schools[1].name.should.equal('class 2');
				schools[2].name.should.equal('class 3');
			});
		});

		describe('valid school id', function() {

			var response = {};

			before(function(done) {
				api.get(schools[0]._id, function(res) {
					response = res;
					done();
				});
			});

			it('returns success status', function() {
				response.statusCode.should.equal(200);
			});

			it('returns the expected school', function() {
				response.body._id.should.equal(schools[0]._id);
				response.body.name.should.equal(schools[0].name);
				response.body.description.should.equal(schools[0].description);
			});
		});

		describe('invalid school id', function() {
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
		
		var school = {
			name: 'school 1',
			description: 'this is school 1'
		};

		var school2 = {
			name: 'class 2',
			description: 'this is class 2'
		};

		before(function(done) {
			api.create(school, function(res) {
				school = res.body;
				api.create(school2, function(res2) {
					school2 = res2.body;
					done();	
				});
			});
		});

		describe('valid school', function() {

			var response = {};

			before(function(done) {
				school.name = 'school 1';
				school.description = 'this is school 1';
				api.update(school, function(res) {
					response = res;
					done();
				});
			});

			it('returns success status', function() {
				response.statusCode.should.equal(200);
			});

			it('returns school details', function() {
				response.body._id.should.equal(school._id);
				response.body.name.should.equal(school.name);
				response.body.description.should.equal(school.description);
			});

			it('is updated in database', function(done) {
				api.get(school._id, function(res) {
					res.statusCode.should.equal(200);
					res.body.should.have.property('name', school.name);
					res.body.should.have.property('description', school.description);
					done();
				});
			});

			it('only updates specified record', function(done) {
				api.get(school2._id, function(res) {
					res.statusCode.should.equal(200);
					res.body.should.have.property('name', school2.name);
					res.body.should.have.property('description', school2.description);
					done();
				});
			});
		});

		describe('empty school name', function() {
			
			var response = {};

			before(function(done) {
				school.name = '';
				api.update(school, function(res) {
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

		describe('school name longer than 15 chars in length', function() {

			var response = {};

			before(function(done) {
				school.name = 'Beverages and Drinks';
				api.update(school, function(res) {
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

		describe('duplicate school name', function() {
			
			var response = {};

			before(function(done) {
				school.name = 'Condiments';
				api.update(school, function(res) {
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

		var schools = [];

		before(function(done) {
			api.create({ name: 'school 1' }, function() {
				api.create({ name: 'class 2' }, function () {
					api.create({ name: 'class 3' }, function () {
						api.list(function(res) {
							schools = res.body;
							done();
						});
					});
				});
			});
		});

		describe('valid school id', function() {

			var response = {};

			before(function(done) {
				api.delete(schools[1]._id, function(res) {
					response = res;
					done();	
				});
			});

			it('returns success status', function() {
				response.statusCode.should.equal(200);
			});

			it('returns school details', function() {
				response.body._id.should.equal(schools[1]._id);
				response.body.name.should.equal(schools[1].name);
				response.body.description.should.equal(schools[1].description);
			});

			it('is deleted from database', function(done) {
				api.get(schools[1]._id, function(res) {
					res.statusCode.should.equal(404);
					api.list(function(listRes) {
						listRes.body.length.should.equal(2);
						done();
					});
				});
			});
		});

		describe('invalid school id', function() {

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
