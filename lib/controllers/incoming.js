'use strict';

var mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  Broadcast = mongoose.model('Broadcast'),
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

  // TODO: create a user for From: req.body.From
  // TODO: store fromUserId of user from From: req.body.From

  /**
   * Create a broadcast
   */
  var broadcast = new Broadcast({
    content: req.body.Body
  });
  broadcast.save(function (err) {
    if (err) return res.json(500, err);

    // Create a TwiML response
    var resp = new twilio.TwimlResponse();
    resp.say({voice: 'woman'}, 'Hello, this is PartyBot.  Please send me a text message.  Party on!');
    twilioResponse(res, resp);
  });

};

/**
 * Incoming SMS
 */
exports.sms = function (req, res, next) {


  // TODO: create a user for From: req.body.From
  // TODO: store fromUserId of user from From: req.body.From

  /**
   * Create a broadcast
   */
  var broadcast = new Broadcast({
    content: req.body.Body
  });
  broadcast.save(function (err) {
    if (err) return res.json(500, err);

    // Create a TwiML response
    var resp = new twilio.TwimlResponse();
    resp.message('Party! Broadcast id: ' + broadcast._id);
    twilioResponse(res, resp);
  });

};