'use strict';

var mongoose = require('mongoose'),
  moment = require('moment'),
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
    content: {
      message: 'Hello world. Let\'s party!'
    }
  });
  broadcast.save(function (err) {
    if (err) return res.json(500, err);

    // Create a TwiML response
    var resp = new twilio.TwimlResponse();
    resp.pause(5);
    resp.play('',{digits:"26"});
    resp.pause(5);
    resp.say({voice: 'alice'}, 'Hello world. Let\'s party!');
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
    content: {
      message: req.body.Body
    }
  });
  broadcast.save(function (err) {
    if (err) return res.json(500, err);

    // Create a TwiML response
    var resp = new twilio.TwimlResponse();
    resp.message('Party' +
      ' on ' + moment(broadcast.runAt).format('YYYY MMMM Do') +
      ' at ' + moment(broadcast.runAt).format('HH:mm:ss') +
      ', I broadcast your message' +
      ' for ' + broadcast.runSeconds + ' seconds!');
    twilioResponse(res, resp);
  });

};
