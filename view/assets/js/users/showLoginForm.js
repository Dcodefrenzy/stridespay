define(function(require, exports, module) {
	let {loading} = require("../loading")

	 return showLoginForm = (event)=>{
	 	const {loginForm} = require("../logins");
	 	event.preventDefault();
		const body = document.getElementById("body");
	 	const hideRegisterForm = document.getElementById("createNewUser");
	 	hideRegisterForm.className = "display-none";
		body.insertAdjacentHTML('afterbegin', loginForm);


	 }



	});