'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config'),
    passport = require('passport'),
    mongoStore = require('connect-mongo')(express);

/**
 * Konfig configuration file loader for security
 * of application-environment specific keys (e.g. Facebook & Twitters apps)
 * @see https://www.pivotaltracker.com/story/show/66748574
 * @type {*}
 */
var dbKonfig = require('konfig')({ path: './lib/config/db' });

/**
 * Express configuration
 */
module.exports = function(app) {
  app.configure('development', function(){
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.use(express.errorHandler());
    app.set('views', config.root + '/app/views');
  });

  app.configure('production', function(){
    app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');
  });

  app.configure(function(){
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    // Persist sessions with mongoStore
    app.use(express.session({
      secret: 'angular-fullstack secret',
      store: new mongoStore({
        url: dbKonfig.mongo.uri,
        collection: 'sessions'
      }, function () {
          console.log("db connection open");
      })
    }));

    //use passport session
    app.use(passport.initialize());
    app.use(passport.session());
    
    // Router needs to be last
    app.use(app.router);
  });
};