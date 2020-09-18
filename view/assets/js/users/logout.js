define(function(require, exports, module) {
const {request} = require("../request");
return logout = (event)=>{
	let sessionItem = sessionStorage.getItem("user")!=="undefined"?JSON.parse(sessionStorage.getItem("user")):{"token":"No token"}; 

	const {loginForm} = require("../logins");

	request("users/logout", sessionItem, "PATCH", {"":""}, function(response){
		if (response.status === 201) {			
		 	alert("Logout was succssful.");
		 	sessionStorage.removeItem("user");
			window.location = "/users/login";
		}else{
			widow.location = "/users/login";
		}
	});

	}
});