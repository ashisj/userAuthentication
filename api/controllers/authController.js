var bcrypt = require('bcrypt');
const saltRounds = 10;
var con = require('../connection');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')

var User = require("../models/authModel");
var userService = require("../services/authService");

exports.userSignup = (req,res,next) =>{
  let user ={
    name:req.body.name,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber,
    password:req.body.password
  };
  userService.checkUser(user.name,user.email,user.phoneNumber,user.password,function(code,userMessage){
    if(!code){
      res.status(400).json(userMessage)
    } else {
      bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if(err){
          res.status(500).json({message:err.message});
        } else {

          user.password = hash;
          var newUser = new User(user);

          User.signup(newUser,function(error,results){
            if(error) {
              res.status(500).json({message:error.message});
            } else {
              res.status(201).json({
                message:"registered sucessfully",
                user:results
              });
            }
          });
        }
      });
    }
  });
}

exports.userLogin = (req,res,next) => {
  //var login_user = new User(req.body.email);
  User.login(req.body.email,function(error,user){
    if(error){
      res.status(500).json({
        ERROR:error.message
      });
    } else {
      if(!user.length){
        res.status(401).json({
          message:"Authentication Failed"
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
          if(err){
            res.status(500).json({
              ERROR:error.message
            });
          }

          if(result){
            var token = jwt.sign(
              {
                name:user[0].name,
                email:user[0].email,
                id:user[0].userId
              },
              process.env.JWT_PRIVATE_KEY,
              {
                expiresIn: 120
              }
            );
            res.cookie('token',token)
            res.status(202).json({
              message:"login successfull"
            });
            //return res.json({token:token});
          } else {
            res.status(401).json({
              message:"Authentication Failed"
            });
          }

        });
      }
    }
  });
}

exports.loginRequired = function(req,res,next){
  if(req.user){
    next();
  }else{
    return res.status(401).json({message:'Unauthorized user'});
  }
}

exports.checkNewEmail = (req,res,next) => {
  User.email(req.params.email,function(error,result){
    if(error){
      res.status(500).json({message:error.message})
    }else{
      if(result.length){
        res.status(200).json({
          status:200,
          message:"Email already exists"
        });
      } else {
        res.status(201).json({
          status:201,
          message:"Email"
        });
      }
    }
  });
}

exports.checkNewPhoneNumber = (req,res,next) => {
  User.phoneNumber(Number(req.params.phoneNumber),function(error,result){
    if(error){
      res.status(500).json({message:error.message})
    }else{
      if(result.length){
        res.status(200).json({
          status:200,
          message:"This Number is already registered please give another number"
        });
      } else {
        res.status(201).json({
          status:201,
          message:"Phone Number"
        });
      }
    }
  });
}
