'use strict';

var express = require('express'),
  path = require('path'),
  fs = require('fs'),
  mongoose = require('mongoose');

/**
 * Konfig configuration file loader for security
 * of application-environment specific keys (e.g. Facebook & Twitters apps)
 * @type {*}
 */
var dbKonfig = require('konfig')({ path: './lib/config/db' });

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

// Connect to database
var db = mongoose.connect(dbKonfig.mongo.uri, dbKonfig.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

// Populate empty DB with sample data
require('./lib/config/dummydata');

// Passport Configuration
var passport = require('./lib/config/passport');

var app = express();

// Express settings
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app);

// Socket I/O
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// Start server
server.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
if (!exports)
  var exports;
exports = module.exports = app;