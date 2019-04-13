function LoginValidation(config){
  if(!config){
    config = {
      email : $("#loginEmail"),
      password : $("loginPassword")
    };
  }

  let dom = {
    loginFail : $("#loginFail"),
    loginFormInput : $("#loginForm input")
  };

	let validator = {
		checkEmail: function(){
      let emailRegEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
			if ( (config.email.length === 0) || (!emailRegEX.test(config.email.val().trim())) ){
			     return false;
			}
			return true;
		},
		checkPassword: function (){
      let passwordRegEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
      if ( (config.password.length === 0) || (!passwordRegEX.test(config.password.val().trim())) ){
			     return false;
			}
			return true;
		},
    onElementFocus : function(element){
      element.removeClass("input-error")
      dom.loginFail.html("");
    },
    login : function(){
      if (this.checkEmail() && this.checkPassword()){
			     $.ajax({
      				type:"post",
      				url:"http://localhost:3000/auth/login",
      				data:{
      					email : config.email.val().trim(),
      					password : config.password.val().trim()
      				},
      				datatype :"json",
      				success : function (res){
                window.location.replace("http://localhost:3000/home.html");
              },
              error : function(err){
                dom.loginFormInput.val("");
                dom.loginFail.html("Authentication Failed");
              }
      			});
          }
		  }
	}
  return validator;
}
$(document).ready(function() {

	var loginEmail = $("#loginEmail");
	var loginPassword = $("#loginPassword");
	var login = $("#loginBtn");
  var formInput = $("#loginForm input");

  let user = {
    email : loginEmail,
    password : loginPassword
  };

	var loginValidator = new LoginValidation(user);

	loginEmail.focusout(function(){
		if(!loginValidator .checkEmail())
        loginEmail.addClass("input-error");
	});

	loginPassword.focusout(function(){
		if(!loginValidator .checkPassword())
      loginPassword.addClass("input-error");
	});

  loginPassword.focus(function(){
    loginValidator .onElementFocus(loginPassword);
  })

  formInput.focus(function(element){
    loginValidator.onElementFocus($(this))
  });
  
	login.click(function(event){
    event.preventDefault();
    console.log(loginValidator );
    
    loginValidator.login();
	});
});
