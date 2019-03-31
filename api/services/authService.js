var userService ={
  checkName : function(name){
    if(name.trim().length===0){
      return "This field is required"
    } else if(!/^[A-Za-z ]+$/.test(name.trim())){
      return "Name should contain only alphabets";
    }
    return "";
  },
  checkEmail : function(email){
    let emailRegEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(email.trim().length===0){
      return "This field is required"
    } else if(!emailRegEX.test(email.trim())){
      return "please enter a valid email address eg:- a@gmail.com";
    }
    return "";
  },
  checkPhoneNumber : function(phoneNumber){
    if(phoneNumber.trim().length===0){
      return "This field is required"
    }
    if (!/[1-9][0-9]{9}/.test(phoneNumber)){
      return  "phone number must contain 10 digits";
    }
    return "";
  },
  checkPassword: function (password){
     let passwordRegEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
     if(password.trim().length===0){
       return "This field is required"
     }
     if ( !passwordRegEX.test(password.trim())){
       return "Password must contain at least 8 characters, including UPPER,lowercase and number";
     }
    return "";
  },
  checkUser : function(name,email,phoneNumber,password,result){
    let user = {
      nameMessage : this.checkName(name),
      emailMessage : this.checkEmail(email),
      phoneNumberMessage : this.checkPhoneNumber(phoneNumber),
      passwordMessage : this.checkPassword(password)
    };

    if(!user.nameMessage.length && !user.emailMessage.length && !user.phoneNumberMessage.length && !user.passwordMessage.length){
      result(true,user);
    } else {
      result(false,user);
    }
  }
};

module.exports = userService;
