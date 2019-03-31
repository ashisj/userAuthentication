var con = require('../connection');
var User = function(user){
    this.name = user.name;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.password = user.password;
};

User.login = function login(email,result){
    con.query("SELECT name,email,userId,password FROM tbl_users where email = ?", email ,function(err,res){
      if(err){
        result(err,null);
      }else{
        result(null,res);
      }
    });
};

User.signup = function signup(newUser,result){
    con.query("INSERT INTO tbl_users(name,email,phoneNumber,password) values(?,?,?,?)",[newUser.name,newUser.email,newUser.phoneNumber,newUser.password],function(err,res){
      if(err){
        result(err,null);
      }else{
        result(null,res);
      }
    });
};

User.email = function email(email,result){
  con.query("SELECT 1 FROM tbl_users  WHERE email = ?",email,function(err,res){
    if(err){
      result(err,null);
    }else{
      result(null,res);
    }
  });
}

User.phoneNumber = function email(phoneNumber,result){
  con.query("SELECT 1 FROM tbl_users  WHERE phoneNumber = ?",phoneNumber,function(err,res){
    if(err){
      result(err,null);
    }else{
      console.log(res);
      result(null,res);
    }
  });
}

module.exports = User;
