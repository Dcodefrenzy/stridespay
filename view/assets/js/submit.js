define(function(require, exports, module) {
	const {loginForm} = require("logins");
	const {request} = require("request");
	const {handleError} = require("errorHandler");

const registerBuyer = (url, token, data)=>{
	 request(url, token, "POST", data, (res)=>{
	 if (res.status === 201) {
		sessionStorage.setItem("user", JSON.stringify({"token":res.token, "_id":res._id}))
		window.location = res.redirect;
	}else {
		console.log(res);
		if (res.message.name === "MongoError") {
			handleError(res.message.keyValue, "already exist");
		}
		handleError(res, "is invalid");
	}
	});

}

const userLogin=(url, token, data)=>{
		 request(url, token, "POST", data, (res)=>{
	 if (res.status === 200) {
	 	alert("Login Successful.")
		sessionStorage.setItem("user", JSON.stringify({"token":res.token, "_id":res._id}))
		loading("login", "display-none");
		window.reload();
	}else {
		console.log(res);
		if (res.message) {
			handleError(res.message, "is invalid");
		}
		if (res.message.name === "MongoError") {
			handleError(res.message.keyValue, "already exist");
		}
		handleError(res, "is invalid");
	}
	});
}

const registerUser=(url, token, data)=>{
		 request(url, token, "POST", data, (res)=>{
	 if (res.status === 201) {
	 	alert("Registration Successful.")
		sessionStorage.setItem("user", JSON.stringify({"token":res.token, "_id":res._id}))
		window.location = res.redirect;
	}else {
		console.log(res);
		if (res.message === "User do not exist.") {
			handleError({"message":"User do not exist"}, "is invalid");
		}
		if (res.message.name === "MongoError") {
			handleError(res.message.keyValue, "already exist");
		}
		handleError(res, "is invalid");
	}
	});
}

const createProduct=(url, token, data)=>{
		 request(url, token, "POST", data, (res)=>{
	 if (res.status === 201) {
	 	alert("Post was Successful.")
		window.location = res.redirect;
	}else if (res.status === 401) {
	const body = document.getElementById("body");
		body.insertAdjacentHTML('afterbegin', loginForm);
	}
	else {
		console.log(res);
		if (res.message === "User do not exist.") {
			handleError({"message":"User do not exist"}, "is invalid");
		}
		if (res.message.name === "MongoError") {
			handleError(res.message.keyValue, "already exist");
		}
		handleError(res, "is invalid");
	}
	});

}

const registerMerchant = (res)=>{
	console.log(res)
}



 return register = (event)=>{
  	event.preventDefault();

    const sessionItem = JSON.parse(sessionStorage.getItem("user")) !== null?JSON.parse(sessionStorage.getItem("user")):{"token":"No token"}; 
  	form	=	document.forms["submitForm"];
  	let	input	= Array.from(form.elements);
  	let formElement = {};
  	for (variable in form.elements) {
  		 formElement[form.elements[variable].name] = form.elements[variable].value;
  	}
  	if (event.target.className === "registerBuyer") {
			registerBuyer(form.id, sessionItem, formElement);
  	}else if (event.target.className === "registerMerchant") {
  			registerMerchant(form.id, sessionItem, formElement);
  	}else if (event.target.className === "loginUser") {
  		userLogin(form.id, sessionItem, formElement);
  	}else if (event.target.className === "signUpUser") {
  		registerUser(form.id, sessionItem, formElement);	
  	}else if (event.target.className === "createProduct") {
  		createProduct(form.id, sessionItem, formElement);
  	}
}





});