define(function(require, exports, module) {
	const {loading} = require("./loading");
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
const registerMerchant = (url, token, data)=>{
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

const loginUser=(url, token, data)=>{
		 request(url, token, "POST", data, (res)=>{
	 if (res.status === 200) {
	 	alert("Login Successful.")
		sessionStorage.setItem("user", JSON.stringify({"token":res.token, "_id":res._id}))
		loading("login", "display-none");
		location.reload();
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

const userLogin=(url, token, data)=>{
		loading("spinner", "");
		 request(url, token, "POST", data, (res)=>{
	 if (res.status === 200) {
	 	alert("Login Successful.")
		sessionStorage.setItem("user", JSON.stringify({"token":res.token, "_id":res._id}))
		window.location = "/users/dashboard";
	}else {
		loading("spinner", "display-none");
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

const createNewUser = (url, token, data)=>{

		loading("spinner", "");
		 request(url, token, "POST", data, (res)=>{
	 if (res.status === 201) {
	 	loading("spinner", "display-none");
	 	alert("Registration Successful.")
		sessionStorage.setItem("user", JSON.stringify({"token":res.token, "_id":res._id}))
		location.reload();
	}else {
		loading("spinner", "display-none");
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

const registerUser=(url, token, data)=>{

		loading("spinner", "");
		 request(url, token, "POST", data, (res)=>{
	 if (res.status === 201) {
	 	alert("Registration Successful.")
		sessionStorage.setItem("user", JSON.stringify({"token":res.token, "_id":res._id}))
		window.location = res.redirect;
	}else {
		loading("spinner", "display-none");
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
		loading("spinner", "");
		 request(url, token, "POST", data, (res)=>{
	 if (res.status === 201) {
	 	alert("Post was Successful.")
		window.location = res.redirect;
	}else if (res.status === 401) {
		loading("spinner", "display-none");
	const body = document.getElementById("body");
		body.insertAdjacentHTML('afterbegin', loginForm);
	}
	else {
		loading("spinner", "display-none");
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

const createService =(url, token, data)=>{
			loading("spinner", "");
		 request(url, token, "POST", data, (res)=>{
	 if (res.status === 201) {
	 	alert("Service was Successfully created.")
		window.location = res.redirect;
	} else if (res.status === 401) {
		loading("spinner", "display-none");
	const body = document.getElementById("body");
		body.insertAdjacentHTML('afterbegin', loginForm);
	}
	else {
		loading("spinner", "display-none");
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
const createMilestone = (url, token, data)=>{
			loading("spinner", "");
		 request(url, token, "POST", data, (res)=>{
			 if (res.status === 201) {
			 	alert("Milestone was Successfully created.")
				location.reload();
			}else if (res.status === 200) {
	 		alert("Milestone was Successfully created.")
			location.reload();
		}	else if (res.status === 404) {
				loading("spinner", "display-none");
				const body = document.getElementById("body");
				alert(res.message);
			} else if (res.status === 401) {
				loading("spinner", "display-none");
				const body = document.getElementById("body");
				body.insertAdjacentHTML('afterbegin', loginForm);
			}else {
				loading("spinner", "display-none");
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

const sendMailVerification = (url, token, data)=>{
		
	request(url, token, "POST", data, (res)=>{

		 if (res.status === 200) {
		 	alert("A verification mail has been sent to your mail please check");
			window.location = "/users/login";
		}else if(res.status === 403){
			loading("spinner", "display-none")
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

const createAccount = (url, token, data)=>{
		
	request(url, token, "POST", data, (res)=>{
console.log(res)
		 if (res.status === 201) {
		 	alert("Your account has been created");
			window.location = "/users/withdraw";
		}else if(res.status === 400){
			loading("spinner", "display-none")
			handleError(res.message, "is invalid");
		}
	});
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
  			registerBuyer(form.id, sessionItem, formElement);
  	}else if (event.target.className === "loginUser") {
  		loginUser(form.id, sessionItem, formElement);
  	}else if (event.target.className === "signUpUser") {
  		registerUser(form.id, sessionItem, formElement);	
  	}else if (event.target.className === "createProduct") {
  		createProduct(form.id, sessionItem, formElement);
  	}else if (event.target.className === "sendMailVerification") {
  		loading("spinner", "");
  		sendMailVerification(form.id, sessionItem, formElement);
  	}else if (event.target.className === "userLogin") {
  		userLogin(form.id, sessionItem, formElement);
  		
  	}else if (event.target.className === "createNewUser") {
  		createNewUser(form.id, sessionItem, formElement);
  	}else if (event.target.className === "createService") {
  		createService(form.id, sessionItem, formElement);
  	}else if (event.target.className === "createMilestone") {
  		createMilestone(form.id, sessionItem, formElement);
  	}else if (event.target.className === "createAccount") {
  			createAccount(form.id, sessionItem, formElement);
  	}
}





});