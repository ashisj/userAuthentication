var express = require('express');
var router = express.Router();

router.post('/login',function(req,res,next){
  let user ={
    email:req.body.email,
    password:req.body.password
  };
  res.status(201).json({
    message:"login sucessfully",
    user:user
  });
});

router.post('/signup',function(req,res,next){
  let user ={
    name:req.body.name,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber,
    password:req.body.password,
    repeatPassword:req.body.repeatPassword
  };
  res.status(201).json({
    message:"registered sucessfully",
    user:user
  });
});

module.exports = router;
