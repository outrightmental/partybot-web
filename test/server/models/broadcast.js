/* codeToTestTest.js */
// require mongoose models
require('../../../lib/models/broadcast');
var chai = require('chai'),
  should = require('should'),
  mongoose = require('mongoose');

// mock the database
var mockgoose = require('mockgoose');
mockgoose(mongoose);

// mock broadcast
var Broadcast = mongoose.model('Broadcast'),
  ObjectId = mongoose.Types.ObjectId();
var mockBroadcast = require('../../mock/broadcast/default.js');
mockBroadcast._id = ObjectId;

describe('Broadcast', function () {

  beforeEach(function (done) {
    //Reset the database before every test.
    mockgoose.reset();
    done();
  });

  afterEach(function (done) {
    done();
  });

  it('should begin with no broadcasts', function (done) {
    Broadcast.find({}, function (err, broadcasts) {
      broadcasts.should.have.length(0);
      done(err);
    });
  });

  it('should create a new broadcast', function (done) {
    var newBroadcast = new Broadcast(mockBroadcast.data);
    newBroadcast.save(function (err) {
      done(err);
    });
  });

});