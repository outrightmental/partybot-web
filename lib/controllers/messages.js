/**
 * Author: Nick Kaye <nick@outrightmental.com>
 * Laboratory: Outright Mental Inc.
 */

var mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  _ = require('lodash');

/**
 * Find message by id and store it in the request
 */
exports.message = function(req, res, next, id) {
  Message.findById(id, function(err, message) {
    if (err) return next(err);
    if (!message) return next(new Error('Failed to load message ' + id));
    req.message = message;
    next();
  });
};

/**
 * List of messages
 */
exports.query = function(req, res) {
  Message.find().sort('beginsAt,createdAt').exec(function(err, messages) {
    if (err) return res.json(500, err);
    res.json(messages);
  });
};

/**
 * List of messages pending
 */
exports.queryPending = function(req, res) {
  Message.find({state:'pending'}).sort('beginsAt,createdAt').exec(function(err, messages) {
    if (err) return res.json(500, err);
    res.json(messages);
  });
};


/**
 * Show a message
 */
exports.show = function(req, res) {
  res.json(req.message);
};

/**
 * Create a message
 */
exports.create = function(req, res) {
  var message = new Message(req.body);

  message.save(function(err) {
    if (err) return res.json(500, err);
    res.json(message);
  });
};

/**
 * Update a message
 */
exports.update = function(req, res) {
  delete req.body._id;
  Message.update({ _id: req.message._id }, req.body, { }, function(err, updatedMessage) {
    if (err) return res.json(500, err);
    res.json(updatedMessage);
  });
};

/**
 * Remove a message
 */
exports.remove = function(req, res) {

  var message = req.message;
  message.remove(function(err) {
    if (err) return res.json(500, err);
    res.json(message);
  });
};