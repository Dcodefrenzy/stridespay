define(function(require, exports, module) {
	const {loading} = require("./loading");
	const {loginForm} = require("logins");
	const {request} = require("request");
	const {filesRequest} = require("request")
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
	console.log(data)
		 request(url, token, "POST", data, (res)=>{
	 if (res.status === 200) {
	 	alert("Login Successful.")
		sessionStorage.setItem("user", JSON.stringify({"token":res.token, "_id":res._id}))
		loading("login", "display-none");
		location.reload();
	}else if (res.status === 400) {
				loading("spinner", "display-none");
		if (res.message) {
			if (res.message.message) {
				handleError({"message":"User do not exist"}, res.message.message);
			}
			if (res.message.name === "MongoError") {
				handleError(res.message.keyValue, "already exist");
			}else{
				handleError(res.message, "is invalid");
			}
		};
	}else {
		console.log(res);
		if (res.message) {
			handleError(res.message, "is invalid");
		}
		if (res.message.name === "MongoError") {
			handleError(res.message.keyValue, "already exist");
		}else{
		handleError(res, "is invalid");
			
		}
	}
	});
}

const userLogin=(url, token, data)=>{
	console.log(data)
		loading("spinner", "dsh-preloader bg-white");
		 request(url, token, "POST", data, (res)=>{
		 	console.log(res.status)
	 if (res.status === 200) {
	 	alert("Login Successful.")
		sessionStorage.setItem("user", JSON.stringify({"token":res.token, "_id":res._id}))
		window.location = "/users/dashboard";
	}else if (res.status === 400) {
				loading("spinner", "display-none");
		if (res.message) {
			if (res.message) {
				handleError({"message":"User do not exist"}, res.message.message);
			}
			if (res.message.name === "MongoError") {
				handleError(res.message.keyValue, "already exist");
			}
			handleError(res.message, "is invalid");
		}
		handleError(res, "is invalid or exist");
	} else {
		loading("spinner", "display-none");
		if (res.message) {
			if (res.message === "User do not exist.") {
				handleError({"message":"User do not exist"}, "is invalid");
			}
			if (res.message.name === "MongoError") {
				handleError(res.message.keyValue, "already exist");
			}
			handleError(res.message, "is invalid")
		}
		handleError(res, "is invalid or exist");
	}
	});
}

const createNewUser = (url, token, data)=>{

		loading("spinner", "dsh-preloader bg-white");
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

		loading("spinner", "dsh-preloader bg-white");
		 request(url, token, "POST", data, (res)=>{
	 if (res.status === 201) {
	 	alert("Yay! Excited to get going?  A mail has been sent to you.")
	 	window.location = "/users/registration/success/"+res._id;
	/*	sessionStorage.setItem("user", JSON.stringify({"token":res.token, "_id":res._id}))
		window.location = res.redirect;*/
	}else {
		loading("spinner", "display-none");
		console.log(res);
		if (res.message) {
			if (res.message === "User do not exist.") {
				handleError({"message":"User do not exist"}, "is invalid");
			}
			if (res.message.name === "MongoError") {
				handleError(res.message.keyValue, "already exist");
			}
			handleError(res.message, "is invalid")
		}
		handleError(res, "is invalid or exist");
	}
	});
}

const createProduct=(url, token, data)=>{
		loading("spinner", "dsh-preloader bg-white");
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
			loading("spinner", "dsh-preloader bg-white");
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
			loading("spinner", "dsh-preloader bg-white");
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

const editMilestone = (url, token, data)=>{
			loading("spinner", "dsh-preloader bg-white");
		 request(url, token, "POST", data, (res)=>{
			 if (res.status === 201) {
			 	alert("Milestone was Successfully Updated.")
				location.reload();
			}else if (res.status === 200) {
	 		alert("Milestone was Successfully Updated.")
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

const updateProfile = (url, token, data)=>{
		
	request(url, token, "POST", data, (res)=>{

		 if (res.status === 201) {
		 	alert("Your profile has been updated");
			window.location = "/users/profile";
		}else if(res.status === 403){
			loading("spinner", "display-none")
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
		
	loading("spinner", "dsh-preloader bg-white");
	request(url, token, "POST", data, (res)=>{
console.log(res)
		 if (res.status === 201) {

			loading("spinner", "display-none");
		 	alert("Your account has been created");
			window.location = "/users/withdraw";
		}else if(res.status === 400){
			loading("spinner", "display-none")
			handleError(res.message, "is invalid");
		}
	});
}

const changePassword = (url, token, data)=>{
	request(url, token, "PATCH", data, (res)=>{
		 if (res.status === 201) {
		 	alert("Your password has been changed successfully.");
		 	sessionStorage.removeItem("user");
			window.location = "/users/login";
		}else if(res.status === 403){
			loading("spinner", "display-none")
			if (res.message.name === "MongoError") {
				handleError(res.message.keyValue, "already exist");
			}
			handleError(res, "is invalid");
		}else if(res.status === 400){
			loading("spinner", "display-none")
			handleError(res.message, "is invalid");
		}
	});	
}

const newPassword = (url, token, data)=>{
	request(url, token, "PATCH", data, (res)=>{
		 if (res.status === 201) {
		 	alert("Your password has been changed successfully.");
			window.location = "/users/login";
		}else if(res.status === 401){
		 	alert("Your token has expired.");
		 	window.location = "/user/forget-password";
		}else if(res.status === 403){
			loading("spinner", "display-none")
			if (res.message.name === "MongoError") {
				handleError(res.message.keyValue, "already exist");
			}
			handleError(res, "is invalid");
		}else if(res.status === 400){
			loading("spinner", "display-none")
			handleError(res.message, "is invalid");
		}
	});	
}

const editContract = (url, token, data)=>{
	request(url, token, "PATCH", data, (res)=>{
		 if (res.status === 201) {
		 	alert("Your Contract has been edited successfully.");
			location.reload();
		}else if(res.status === 401){
		loading("spinner", "display-none");
	const body = document.getElementById("body");
		}else if(res.status === 403){
			loading("spinner", "display-none")
			if (res.message.name === "MongoError") {
				handleError(res.message.keyValue, "already exist");
			}
			handleError(res, "is invalid");
		}else if(res.status === 400){
			loading("spinner", "display-none")
			handleError(res.message, "is invalid");
		}
	});	

}
const editContractMilestone = (url, token, data)=>{
	request(url, token, "PATCH", data, (res)=>{
		 if (res.status === 201) {
		 	alert("Your Contract milestone has been edited successfully.");
			location.reload();
		}else if(res.status === 401){
		loading("spinner", "display-none");
	const body = document.getElementById("body");
		}else if(res.status === 403){
			loading("spinner", "display-none")
			if (res.message.name === "MongoError") {
				handleError(res.message.keyValue, "already exist");
			}
			handleError(res, "is invalid");
		}else if(res.status === 400){
			loading("spinner", "display-none")
			handleError(res.message, "is invalid");
		}
	});
}

const forgetPassword = (url, token, data)=>{
		request(url, token, "POST", data, (res)=>{
		 if (res.status === 200) {
		 	alert(res.message);
			window.reload();
		}else if(res.status === 403){
			loading("spinner", "display-none")
			if (res.message.name === "MongoError") {
				handleError(res.message.keyValue, "already exist");
			}
			handleError(res, "is invalid");
		}else if(res.status === 400){
			loading("spinner", "display-none")
			handleError(res.message, "is invalid");
		}
	});	
}

const uploadImage =(url, token, data)=>{
	        const formData = new FormData()
        	formData.append('image', data);
    filesRequest(url, token, "POST", formData, (res)=>{
		 if (res.status === 201) {
		 	alert("Your Image was uploaded successfully.");
			window.location = "/users/dashboard";
		}else if(res.status === 403){
			loading("spinner", "display-none")
			if (res.message.name === "MongoError") {
				handleError(res.message.keyValue, "already exist");
			}
			handleError(res, "is invalid");
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
  		loading("spinner", "dsh-preloader bg-white");
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
  	}else if (event.target.className === "updateProfile") {
  			updateProfile(form.id, sessionItem, formElement);
  	}else if (event.target.className === "changePassword") {
  		changePassword(form.id, sessionItem, formElement);
  	}else if (event.target.className === "editMilestone") {
  		editMilestone(form.id, sessionItem, formElement);
  	}else if (event.target.className === "uploadImage") {
  		const image = document.getElementById("profile-image");
  		uploadImage(form.id, sessionItem, image.files[0]);
  	}else if (event.target.className === "forgetPassword") {
  		forgetPassword(form.id, sessionItem, formElement);
  	}else if (event.target.className === "newPassword") {
  		newPassword(form.id, {token:formElement.token, id:""}, formElement);
  	}else if (event.target.className === "editContract") {
  		editContract(form.id, sessionItem, formElement);
  	}else if (event.target.className === "editContractMilestone") {
  		editContractMilestone(form.id, sessionItem, formElement);
  	}

}





});