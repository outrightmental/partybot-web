'use strict';

var mongoose = require('mongoose'),
  moment = require('moment'),
  Schema = mongoose.Schema;

/**s
 * Broadcast Schema
 */
var BroadcastSchema = new Schema({
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  /* 'default' */
  type: {
    type: String,
    default: 'default'
  },
  /* 'future','now','past' */
  state: {
    type: String,
    default: 'future'
  },
  content: {},
  createdAt: Date,
  updatedAt: Date,
  runAt: Date,
  runSeconds: {
    type: Number,
    default: 5
  }
});


/**
 * Every new Broadcast, look up the latest existing broadcast:
 * new broadcast runAt = latest broadcast runAt + latest broadcast runSeconds
 */
BroadcastSchema.pre('save', function (next, done) {
    var self = this;
    if (this.isNew) {
      this.createdAt = Date.now();
      var Broadcast = mongoose.model('Broadcast');
      Broadcast.findOne({}).sort('-runAt').exec(function (err, broadcast) {

          if (broadcast && broadcast.runAt) {
            self.runAt = moment(broadcast.runAt).add('seconds', broadcast.runSeconds);

            if (moment(Date.now()).diff(moment(self.runAt)) > 0)
              self.runAt = Date.now();

          } else {
            self.runAt = Date.now();
          }

          next();
        }
      )
      ;
    }
    else {
      this.updatedAt = Date.now();
      next();
    }
  }
)
;

/**
 * Validations
 */
/*
 BroadcastSchema.path('awesomeness').validate(function (num) {
 return num >= 1 && num <= 10;
 }, 'Awesomeness must be between 1 and 10');
 */

/**
 * Methods
 */
BroadcastSchema.methods = {
  checkFuture: function () {
    // if for some reason one snuck by with no date, remove it
    if (!this.runAt)
      this.remove();
    // if runAt is not yet <= now, return
    if (moment(Date.now()).diff(moment(this.runAt)) < 0)
      return;
    this.state = 'now';
    this.save(function (err, broadcast) {
      console.log("updated " + broadcast._id + " to NOW");
    });
  },
  checkNow: function () {
    // if for some reason one snuck by with no date, remove it
    if (!this.runAt)
      this.remove();
    // if runAt + runSeconds is not yet <= now, return
    if (moment(Date.now()).diff(moment(this.runAt).add('seconds', this.runSeconds)) < 0)
      return;
    this.state = 'past';
    this.save(function (err, broadcast) {
      console.log("updated " + broadcast._id + " to PAST");
    });
  }
};

// done
mongoose.model('Broadcast', BroadcastSchema);