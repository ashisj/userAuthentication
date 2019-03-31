var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

router.post('/login',authController.userLogin);

router.post('/signup',authController.userSignup);

router.get('/email/:email',authController.checkNewEmail);

router.get('/phoneNumber/:phoneNumber',authController.checkNewPhoneNumber);

module.exports = router;
