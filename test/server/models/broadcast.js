/* codeToTestTest.js */
// require mongoose models
require('../../../lib/models/broadcast');
var chai = require('chai'),
  should = require('should'),
  sinon = require('sinon'),
  helper = require('../../helper')
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

// fake time
var clock;

describe('Broadcast', function () {

  beforeEach(function (done) {
    // Reset mock database
    mockgoose.reset();
    // Fake time
    clock = sinon.useFakeTimers();
    done();
  });

  afterEach(function (done) {
    // Fake time
    clock.restore();
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

  it('should schedule the first broadcast now', function (done) {
    var newBroadcast = new Broadcast(mockBroadcast.data);
    newBroadcast.save(function (err) {
      should.not.exist(err);
      Broadcast.findOne({}, function (err, broadcast) {
        should.not.exist(err);
        should.exist(broadcast);
        should.exist(broadcast.runAt);
        helper.shouldBeNow(broadcast.runAt);
        done();
      });
    });
  });


  it('should schedule each next broadcast immediately after the current running time', function (done) {
    // arbitrary test times
    var intervalSecondsOne = 5;
    var intervalSecondsTwo = 10;
    var intervalSecondsThree = 30;
    // first
    var firstBroadcast = new Broadcast(mockBroadcast.data);
    firstBroadcast.runSeconds = intervalSecondsOne;
    firstBroadcast.save(function (err) {
      should.not.exist(err);
      // second
      var secondBroadcast = new Broadcast(mockBroadcast.data);
      secondBroadcast.runSeconds = intervalSecondsTwo;
      secondBroadcast.save(function (err) {
        should.not.exist(err);
        (moment(secondBroadcast.runAt).format())
          .should.equal(moment(firstBroadcast.runAt).add('seconds', firstBroadcast.runSeconds).format());
        // third
        var thirdBroadcast = new Broadcast(mockBroadcast.data);
        thirdBroadcast.runSeconds = intervalSecondsThree;
        thirdBroadcast.save(function (err) {
          should.not.exist(err);
          (moment(thirdBroadcast.runAt).format())
            .should.equal(moment(secondBroadcast.runAt).add('seconds', secondBroadcast.runSeconds).format());
          done();
        });
      });
    });
  });

  it('should schedule the next broadcast now, if time has passed with no broadcasts', function (done) {
    // arbitrary test times
    var intervalSecondsOne = 5;
    var intervalSecondsTwo = 30;
    // this time will be mock-forwarded
    var intervalNoBroadcasts = 100;
    // first
    var firstBroadcast = new Broadcast(mockBroadcast.data);
    firstBroadcast.runSeconds = intervalSecondsOne;
    firstBroadcast.save(function (err) {
      should.not.exist(err);
      // time with no broadcasts
      clock.tick(intervalNoBroadcasts*1000);
      // second
      var secondBroadcast = new Broadcast(mockBroadcast.data);
      secondBroadcast.runSeconds = intervalSecondsTwo;
      secondBroadcast.save(function (err) {
        should.not.exist(err);
        helper.shouldBeNow(secondBroadcast.runAt);
        clock.restore();
        done();
      });
    });
  });


});