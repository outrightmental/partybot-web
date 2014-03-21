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

  /**
   * Create a message
   */
  var message = new Message({
    type: 'broadcast',
    content: req.body
  });
  message.save(function (err) {
    if (err) return res.json(500, err);
    res.json(message);
  });

  // Create a TwiML response
  var resp = new twilio.TwimlResponse();

  resp.message('Party! Party! Party! Party! Party!');

  twilioResponse(res, resp);

};