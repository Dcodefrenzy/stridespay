define(function(require, exports, module) {
const {request} = require("../request");
return logout = (event)=>{
	let sessionItem = sessionStorage.getItem("admins")!=="undefined"?JSON.parse(sessionStorage.getItem("admins")):{"token":"No token"}; 

	const {loginForm} = require("../logins");

	request("admins/logout", sessionItem, "PATCH", {"":""}, function(response){
		if (response.status === 201) {			
		 	alert("Logout was succssful.");
		 	sessionStorage.removeItem("admin");
			window.location = "/admins/login";
		}else{
			widow.location = "/admins/login";
		}
	});

	}
});