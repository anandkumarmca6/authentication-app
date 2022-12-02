const express = require('express');
const passport = require('passport');

const router = express.Router();
const actionController = require('../controllers/action_controller');

router.get('/reset', passport.checkAuthentication, actionController.reset);
router.post(
  '/reset-password',
  passport.checkAuthentication,
  actionController.resetPassword
);

module.exports = router;
