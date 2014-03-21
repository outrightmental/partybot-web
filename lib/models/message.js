'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Message Schema
 */
var MessageSchema = new Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  /* 'broadcast' */
  type: String,
  /* 'pending','complete' */
  state: String,
  content: String,
  createdAt: Date,
  updatedAt: Date
});


// keep track of when todos are updated and created
MessageSchema.pre('save', function (next, done) {
  if (this.isNew) {
    this.state = 'pending';
    this.createdAt = Date.now();
  }
  this.updatedAt = Date.now();
  next();
});

/**
 * Validations
 */
/*
 MessageSchema.path('awesomeness').validate(function (num) {
 return num >= 1 && num <= 10;
 }, 'Awesomeness must be between 1 and 10');
 */

mongoose.model('Message', MessageSchema);
