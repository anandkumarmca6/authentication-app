const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/users');
const crypto = require('crypto');
const env = require('./environment');
passport.use(
  new googleStrategy(
    {
      clientID: env.clientID,
      clientSecret: env.clientSecret,
      callbackURL: env.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log('error in google strategy-passport', err);
          return;
        }
        console.log(profile);
        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString('hex'),
            },
            function (err, user) {
              if (err) {
                console.log('error in creating user', err);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
