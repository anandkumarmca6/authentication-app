const express = require('express');

const passport = require('passport');

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/action', require('./action'));

module.exports = router;
