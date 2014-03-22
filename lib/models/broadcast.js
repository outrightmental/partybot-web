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
  type: String,
  /* 'future','now','past' */
  state: String,
  content: String,
  createdAt: Date,
  updatedAt: Date,
  runAt: Date,
  runSeconds: Number
});


/**
 * Every new Broadcast, look up the latest existing broadcast:
 * new broadcast runAt = latest broadcast runAt + latest broadcast runSeconds
 */
BroadcastSchema.pre('save', function (next, done) {
  if (this.isNew) {
    this.state = 'future';
    this.createdAt = Date.now();
    if (!(this.runSeconds > 0))
      this.runSeconds = 1;
    mongoose.model('Broadcast').findOne({}, {}, { sort: { 'runAt': -1 } }, function (err, broadcast) {
      this.runAt = moment(broadcast.runAt).add('seconds', broadcast.runSeconds);
      next();
    });
  } else {
    this.updatedAt = Date.now();
    next();
  }
});

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
};

// done
mongoose.model('Broadcast', BroadcastSchema);