'use strict';

// Mongoose
var mongoose = require('mongoose');
var User = mongoose.model('User');

// Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/**
 * Konfig configuration file loader for security
 * of application-environment specific keys (e.g. Facebook & Twitters apps)
 * @type {*}
 */
var authKonfig = require('konfig')({ path: './lib/config/auth' });

/*
 * As a Visitor, I want to login with Facebook in order to use the Application.
 * @type {exports.Strategy|*}
 *
var FacebookStrategy = require('passport-facebook').Strategy;
 */

/*
 * As a Visitor, I want to login with Twitter in order to use the Application.
 * @type {exports.Strategy|*}
 *
 var TwitterStrategy = require('passport-twitter').Strategy;
 */

/**
 * Passport configuration
 */
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findOne({
    _id: id
  }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
    done(err, user);
  });
});

// add other strategies for more authentication flexibility
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function (email, password, done) {
    User.findOne({
      email: email
    }, function (err, user) {
      if (err) return done(err);

      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'This password is not correct.'
        });
      }
      return done(null, user);
    });
  }
));


/*
 * As a Visitor, I want to login with Facebook in order to use the Application.
 * @see https://www.pivotaltracker.com/story/show/62342046
 * @type {exports.Strategy|*}
 *
passport.use(new FacebookStrategy({

  // pull in our app id and secret from our auth.js file
  clientID: authKonfig.facebook.clientID,
  clientSecret: authKonfig.facebook.clientSecret,
  callbackURL: authKonfig.facebook.callbackURL

}, function (token, refreshToken, profile, done) {

  // asynchronous
  process.nextTick(function () {

    // find the user in the database based on their facebook id
    User.findOne({ 'facebook.id': profile.id }, function (err, user) {

      // if there is an error, stop everything and return that
      // ie an error connecting to the database
      if (err)
        return done(err);

      // if the user is found, then log them in
      if (user) {
        return done(null, user); // user found, return that user
      } else {
        // if there is no user found with that facebook id, create them
        var newUser = new User();
        newUser.provider = 'facebook';

        // set all of the facebook information in our user model
        newUser.facebook = {
          // set the users facebook id
          id: profile.id,
          // we will save the token that facebook provides to the user
          token: token,
          // look at the passport user profile to see how names are returned
          name: profile.name.givenName + ' ' + profile.name.familyName,
          // facebook can return multiple emails so we'll take the first
          email: profile.emails[0].value
        };

        // save our user to the database
        newUser.save(function (err) {
          if (err)
            throw err;

          // if successful, return the new user
          return done(null, newUser);
        });
      }

    });
  });

}));
*/

/*
 * As a Visitor, I want to login with Twitter in order to use the Application.
 * @type {exports.Strategy|*}
 *
passport.use(new TwitterStrategy({

  consumerKey: authKonfig.twitter.consumerKey,
  consumerSecret: authKonfig.twitter.consumerSecret,
  callbackURL: authKonfig.twitter.callbackURL

}, function (token, tokenSecret, profile, done) {

  // make the code asynchronous
  // User.findOne won't fire until we have all our data back from Twitter
  process.nextTick(function () {

    User.findOne({ 'twitter.id': profile.id }, function (err, user) {

      // if there is an error, stop everything and return that
      // ie an error connecting to the database
      if (err)
        return done(err);

      // if the user is found then log them in
      if (user) {
        return done(null, user); // user found, return that user
      } else {
        // if there is no user, create them
        var newUser = new User();
        newUser.provider = 'twitter';

        // set all of the user data that we need
        newUser.twitter = {
          id: profile.id,
          token: token,
          username: profile.username,
          displayName: profile.displayName
        };

        // save our user into the database
        newUser.save(function (err) {
          if (err)
            throw err;
          return done(null, newUser);
        });
      }
    });

  });

}));

*/

// Export
module.exports = passport;