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
  content: String,
  createdAt: Date,
  updatedAt: Date,
  runAt: Date,
  runSeconds: {
    type: Number,
    default: 1
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
    var broadcast = mongoose.model('Broadcast').findOne({}, {}, { sort: { 'runAt': -1 } }, function (err, post) {
      self.runAt = moment(broadcast.runAt).add('seconds', broadcast.runSeconds);
      /*
      if (!self.runAt > Date.now())
        self.runAt = Date.now();
        */
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