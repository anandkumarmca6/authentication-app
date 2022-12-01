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
