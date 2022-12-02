const User = require('../models/users');

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

// render reset password page
module.exports.reset = async function (req, res) {
  return res.render('reset_password', {
    title: 'Authentication | Reset Password',
  });
};

// Reset password
module.exports.resetPassword = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    req.flash('error', 'Passwords do not match');
    return res.redirect('/action/reset');
  }
  const user = await User.findById(res.locals.user._id);
  user.password = req.body.password;
  user.save();
  req.flash('success', 'Password updated successfully!');
  return res.redirect('/');
};
