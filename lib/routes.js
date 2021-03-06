'use strict';

var
  api = require('./controllers/api'),
  chat = require('./controllers/chat'),
  incoming = require('./controllers/incoming'),
  index = require('./controllers'),
  session = require('./controllers/session'),
  messages = require('./controllers/messages'),
  broadcasts = require('./controllers/broadcasts'),
  users = require('./controllers/users');

var passport = require('passport');
var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function (app) {

  /**
   * Party Broadcast API
   */
  app.param('broadcastId', broadcasts.broadcast);
  // Everyone can Index / Read / Create / Update / Delete
  app.get('/api/broadcasts', broadcasts.query);
  app.get('/api/broadcasts/now', broadcasts.showNow);
  app.get('/api/broadcasts/:broadcastId', broadcasts.show);
  app.post('/api/broadcasts', broadcasts.create);
  app.put('/api/broadcasts/:broadcastId', broadcasts.update);
  app.del('/api/broadcasts/:broadcastId', broadcasts.remove);
   
  /**
   * Party Message API
   */
  app.param('messageId', messages.message);
  // Everyone can Index / Read / Create / Update / Delete
  app.get('/api/messages', messages.query);
  app.get('/api/messages/:messageId', messages.show);
  app.post('/api/messages', messages.create);
  app.put('/api/messages/:messageId', messages.update);
  app.del('/api/messages/:messageId', messages.remove);


  /**
   * Demo AwesomeThings API
   */
  app.get('/api/awesomeThings', api.awesomeThings);

  /**
   * Users API
   */
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  /**
   * Sessions API
   */
  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  /**
   * Twilio Incoming API
   */
  app.get('/api/incoming/voice', incoming.voice);
  app.post('/api/incoming/voice', incoming.voice);
  app.get('/api/incoming/sms', incoming.sms);
  app.post('/api/incoming/sms', incoming.sms);

  /**
   *
   * As a Visitor,
   * I want to login with Facebook
   * in order to use the Application.
   * @see https://www.pivotaltracker.com/story/show/62342046
   * @type {exports.Strategy|*}
   *
   * GET /auth/facebook
   *   for facebook authentication and login
   *
   * GET /auth/facebook/callback
   *   to handle the callback after facebook has authenticated the user
   */
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));


  /**
   *
   * As a Visitor,
   * I want to login with Twitter
   * in order to use the Application.
   * @see https://www.pivotaltracker.com/story/show/62342048
   * @type {exports.Strategy|*}
   *
   * GET /auth/twitter
   *   for twitter authentication and login
   *
   * GET /auth/twitter/callback
   *   to handle the callback after twitter has authenticated the user
   */
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

  /**
   *
   * As an authenticated user,
   * I want to Log Out
   * in order to end my session
   * and clear my private data from the browser.
   * @see https://www.pivotaltracker.com/story/show/66745852
   *
   */
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // All undefined api routes should return a 404
  app.get('/api/*', function (req, res) {
    res.send(404);
  });

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);

};