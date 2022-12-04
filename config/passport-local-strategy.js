const { response } = require('express');
const passport = require('passport');
const User = require('../models/users');
const LocalStrategy = require('passport-local').Strategy;
// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      // getting site key from client side
      const response_key = req.body['g-recaptcha-response'];
      // google as a response
      if (response_key == '') {
        req.flash('error', 'Captcha not selected');
        return req.res.redirect('/users/sign-in');
      }
      // Put secret key here, which we get from google console
      const secret_key = '6Le4S0sjAAAAAPzQ6f3N1CIkwBSvz-Zzy8yU-1wA';

      // Hitting POST request to the URL, Google will
      // respond with success or error scenario.
      const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

      // Making POST request to verify captcha
      fetch(url, {
        method: 'post',
      })
        .then((response) => response.json())
        .then((google_response) => {
          // google_response is the object return by

          if (google_response.success != true) {
            //   if captcha is not verified
            req.flash('error', error);
            return req.res.redirect('/users/sign-in');
          }
        })
        .catch((error) => {
          // Some error while verify captcha
          req.flash('error', error);
          return req.res.redirect('/users/sign-in');
        });
      // find a user and establish a identity
      User.findOne({ email: email }, async function (err, user) {
        if (err) {
          req.flash('error', err);
          return done(err);
        }
        if (!user) {
          req.flash('error', 'Invalid Username/Password');
          return done(null, false);
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          req.flash('error', 'Invalid Username/Password');
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

// serializing the user to decide which key to put in cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log('error while signing in - passport');
      return done(err);
    }
    return done(null, user);
  });
});

passport.checkAuthentication = function (req, res, next) {
  // If the user is signe-in then pass on request to the next function(controllers's action)
  if (req.isAuthenticated()) {
    return next();
  }
  // If the user is not signed-in
  return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains current signed-in user from the session cookie
    res.locals.user = req.user;
  }
  next();
};
module.exports = passport;
