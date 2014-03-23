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
var moment = require('moment');
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

  it('the first created broadcast should not be longer than 2 seconds ago', function (done) {
    var newBroadcast = new Broadcast(mockBroadcast.data);
    newBroadcast.save(function (err) {
      should.not.exist(err);
      Broadcast.findOne({}, function (err, broadcast) {
        should.not.exist(err);
        should.exist(broadcast);
        should.exist(broadcast.runAt);
        (broadcast.runAt).should.not.be.below(moment('2 seconds ago'));
        done();
      });
    });
  });


  it('each subsequent broadcast is X seconds after the last one', function (done) {
    var intervalSeconds = 30;
    // first
    var firstBroadcast = new Broadcast(mockBroadcast.data);
    firstBroadcast.runSeconds = intervalSeconds;
    firstBroadcast.save(function (err) {
      should.not.exist(err);
      // second
      var secondBroadcast = new Broadcast(mockBroadcast.data);
      secondBroadcast.runSeconds = intervalSeconds;
      secondBroadcast.save(function (err) {
        should.not.exist(err);
        (moment(secondBroadcast.runAt).format())
          .should.equal(moment(firstBroadcast.runAt).add('seconds', firstBroadcast.runSeconds).format());
        // third
        var thirdBroadcast = new Broadcast(mockBroadcast.data);
        thirdBroadcast.runSeconds = intervalSeconds;
        thirdBroadcast.save(function (err) {
          should.not.exist(err);
          (moment(thirdBroadcast.runAt).format())
            .should.equal(moment(secondBroadcast.runAt).add('seconds', secondBroadcast.runSeconds).format());
          done();
        });
      });
    });
  });


});