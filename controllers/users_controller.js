const User = require('../models/users');

const fetch = require('isomorphic-fetch');
// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_up', {
    title: 'Authentication | Sign Up',
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  return res.render('user_sign_in', {
    title: 'Authentication | Sign In',
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    req.flash('error', 'Passwords do not match');
    return res.redirect('back');
  }
  // getting site key from client side
  const response_key = req.body['g-recaptcha-response'];
  if (response_key == '') {
    req.flash('error', 'Captcha not selected');
    return res.redirect('/users/sign-up');
  }
  // Put secret key here, which we get from google console
  const secret_key = '6LdMH8IjAAAAABtrVD3bonuO6bWtsGpFCZz5j8U9';

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
      // google as a response
      if (google_response.success != true) {
        //   if captcha is not verified
        req.flash('error', error);
        return res.redirect('/users/sign-up');
      }
    })
    .catch((error) => {
      // Some error while verify captcha
      req.flash('error', error);
      return res.redirect('/users/sign-up');
    });
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      req.flash('error', err);
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          req.flash('error', err);
          return;
        }
        req.flash('success', 'You have signed up, login to continue!');
        return res.redirect('/users/sign-in');
      });
    } else {
      req.flash('error', 'User already exists!');
      return res.redirect('/users/sign-in');
    }
  });
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in Successfully');
  return res.redirect('/');
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'You have logged out!');
    res.redirect('/');
  });
};
