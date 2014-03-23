/**
 * Author: Nick Kaye <nick@outrightmental.com>
 * Laboratory: Outright Mental Inc.
 */

var mongoose = require('mongoose'),
  Broadcast = mongoose.model('Broadcast'),
  _ = require('lodash');

/**
 * Find broadcast by id and store it in the request
 */
exports.broadcast = function (req, res, next, id) {
  Broadcast.findById(id, function (err, broadcast) {
    if (err) return next(err);
    if (!broadcast) return next(new Error('Failed to load broadcast ' + id));
    req.broadcast = broadcast;
    next();
  });
};

/**
 * List of broadcasts
 */
exports.query = function (req, res) {
  Broadcast.find().sort('-runAt').exec(function (err, broadcasts) {
    if (err) return res.json(500, err);
    res.json(broadcasts);
  });
};

/**
 * Show a broadcast
 */
exports.show = function (req, res) {
  res.json(req.broadcast);
};

/**
 * Show a broadcast
 */
exports.showNow = function (req, res) {
  // state 'now'
  Broadcast.findOne({state: 'now'}).sort('-runAt').exec(function (err, broadcast) {
    if (err) return;
    if (broadcast)
      res.json(broadcast);
    else
      res.json({});
  });
};

/**
 * Create a broadcast
 */
exports.create = function (req, res) {
  var broadcast = new Broadcast(req.body);

  broadcast.save(function (err) {
    if (err) return res.json(500, err);
    res.json(broadcast);
  });
};

/**
 * Update a broadcast
 */
exports.update = function (req, res) {
  delete req.body._id;
  Broadcast.update({ _id: req.broadcast._id }, req.body, { }, function (err, updatedBroadcast) {
    if (err) return res.json(500, err);
    res.json(updatedBroadcast);
  });
};

/**
 * Remove a broadcast
 */
exports.remove = function (req, res) {

  var broadcast = req.broadcast;
  broadcast.remove(function (err) {
    if (err) return res.json(500, err);
    res.json(broadcast);
  });
};

/**
 * Worker
 */
exports.worker = function () {
  // state 'future'
  Broadcast.find({state: 'future'}).exec(function (err, broadcasts) {
    if (err) return;
    for (var i in broadcasts)
      broadcasts[i].checkFuture();
  });
  // state 'now'
  Broadcast.find({state: 'now'}).exec(function (err, broadcasts) {
    if (err) return;
    for (var i in broadcasts)
      broadcasts[i].checkNow();
  });
};