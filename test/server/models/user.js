'use strict';
// Assertion Libraries
var should = require('should');

// Mockgoose
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);

// Mock User Schema
mongoose.model('User', new mongoose.Schema());
var User = mongoose.model('User'),
  ObjectId = mongoose.Types.ObjectId();
var mockUserData = {
//  _id: ObjectId,
  'name': 'Rene Harris',
  'role': 'user',
  'provider': 'local',
  'email': 'rene.harris@outrightmental.com',
  'password': 'password'
};

describe('User', function () {
  // create mock models using data we can count on
  beforeEach(function (done) {
    mockgoose.reset();
    done();
  });

  afterEach(function (done) {
    done();
  });

  it('should begin with no users', function (done) {
    User.find({}, function (err, users) {
      users.should.have.length(0);
      done(err);
    });
  });

  it('should create a new user', function (done) {
    var newUser = new User(mockUserData);
    newUser.provider = 'local';
    newUser.save(function (err) {
      done(err);
    });
  });

  it('should fail when saving a duplicate user', function (done) {
    var newUser = new User(mockUserData);
    newUser.provider = 'local';
    newUser.save(function (err) {
      should.not.exist(err);
    });

    var dupeUser = new User(mockUserData);
    dupeUser.provider = 'local';
    dupeUser.save(function (err) {
      should.exist(err);
      done();
    });

  });

  it('should fail when saving without an email', function (done) {
    user.email = '';
    user.save(function (err) {
      should.exist(err);
      done();
    });
  });

  it("should authenticate user if password is valid", function () {
    user.authenticate('password').should.be.true;
  });

  it("should not authenticate user if password is invalid", function () {
    user.authenticate('blah').should.not.be.true;
  });

});