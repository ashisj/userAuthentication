var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

router.post('/login',authController.userLogin);

router.post('/signup',authController.userSignup);

router.get('/email/:email',authController.checkNewEmail);

router.get('/phoneNumber/:phoneNumber',authController.checkNewPhoneNumber);

router.get('/logout',function(req,res){
    res.clearCookie('token');
    res.status(200).json({message:'logout sucessfully'});
})

module.exports = router;
