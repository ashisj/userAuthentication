var bcrypt = require('bcrypt');
const saltRounds = 10;
var con = require('../connection');
var jwt = require('jsonwebtoken');

exports.user_signup = (req,res,next) =>{
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if(err){
      res.status(500).json({
        message:error.message
      });
    } else {

      let user ={
        name:req.body.name,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
        password:hash
      };

      con.query("INSERT INTO tbl_users(name,email,phoneNumber,password) values(?,?,?,?)",[user.name,user.email,user.phoneNumber,user.password],function(error,results,fields){
        if(error) {
          //throw error;
          res.status(500).json({
            message:error.message
          });
        } else {
          res.status(201).json({
            message:"registered sucessfully",
            user:results
          });
        }
      })
    }
  });
}

exports.user_login = (req,res,next) => {
  con.query("SELECT name,email,userId,password FROM tbl_users where email = ?",[req.body.email],function(error,user){
    if(error){
      res.status(500).json({
        ERROR:error.message
      });
    } else {
      if(!user.length){
        res.status(401).json({
          message:"Authentication Failed"
        });
      }else{
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
            res.status(202).json({
              message:"login sucessfully",
              token:token
            });
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
