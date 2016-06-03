var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var User = require('../models/user');
var config = require('../_config');
var init = require('./init');

passport.use(new GoogleStrategy({
    /*consumerKey: config.google.consumerKey,
    consumerSecret: config.google.consumerSecret,
    returnURL: config.google.returnURL*/
    clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {

    var searchQuery = {
      name: profile.displayName
    };

    var updates = {
      name: profile.displayName,
      someID: profile.id,
      accessToken: accessToken
    };

    var options = {
      upsert: true
    };
    

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }

));

// serialize user into the session
init();


module.exports = passport;
