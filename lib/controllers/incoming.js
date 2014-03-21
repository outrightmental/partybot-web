'use strict';

var mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  User = mongoose.model('User'),
  passport = require('passport');

var twilio = require('twilio');

/**
 *
 * @param resp
 * @param res
 */
function twilioResponse(res, resp) {
  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  res.end(resp.toString());
}

/**
 * Incoming Voice
 */
exports.voice = function (req, res, next) {
  // Create a TwiML response
  var resp = new twilio.TwimlResponse();

  resp.say({voice: 'woman'}, 'Hello, this is PartyBot.  Please send me a text message.  Party on!');

  twilioResponse(res, resp);

};

/**
 * Incoming SMS
 */
exports.sms = function (req, res, next) {


  // TODO: create a user for From: req.body.From
  // TODO: store fromUserId of user from From: req.body.From

  /**
   * Create a message
   */
  var message = new Message({
    state: 'pending',
    type: 'broadcast',
    content: req.body.Body
  });
  message.save(function (err) {
    if (err) return res.json(500, err);

    // Create a TwiML response
    var resp = new twilio.TwimlResponse();
    resp.message('Party! Message id ' + message._id);
    twilioResponse(res, resp);
  });

};