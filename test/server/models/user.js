/* codeToTestTest.js */
// require mongoose models
require('../../../lib/models/user');
var chai = require('chai'),
  should = require('should'),
  mongoose = require('mongoose');

// mock the database
var mockgoose = require('mockgoose');
mockgoose(mongoose);

// mock user
var User = mongoose.model('User'),
  ObjectId = mongoose.Types.ObjectId();
var mockUser = require('../../mock/user/rene-harris.js');
mockUser._id = ObjectId;

describe('User', function () {

  // create mock models using data we can count on
  beforeEach(function (done) {
    mockgoose.reset();
    done();
  });

  afterEach(function (done) {
    //Reset the database after every test.
    done();
  });

  it('should begin with no users', function (done) {
    User.find({}, function (err, users) {
      users.should.have.length(0);
      done(err);
    });
  });

  it('should create a new user', function (done) {
    var newUser = new User(mockUser.data);
    newUser.save(function (err) {
      done(err);
    });
  });

  it('should fail when saving without an email', function (done) {
    var newUser = new User(mockUser.data);
    newUser.email = '';
    newUser.save(function (err) {
      should.exist(err);
      done();
    });
  });

  it("should authenticate user if password is valid", function (done) {
    var newUser = new User(mockUser.data);
    newUser.authenticate(mockUser.data.password).should.be.true;
    done();
  });

  it("should not authenticate user if password is invalid", function (done) {
    var newUser = new User(mockUser.data);
    newUser.authenticate(mockUser.data.password+'xxx').should.not.be.true;
    done();
  });

});