define(function(require, exports, module) {
const {request} = require("./request");
const {loginForm} = require("./logins");

return switchAccount = (event, role)=>{
	let sessionItem = sessionStorage.getItem("user")!=="undefined"?JSON.parse(sessionStorage.getItem("user")):{"token":"No token"}; 
console.log(role)

	request("users/update/role", sessionItem, "PATCH", {"role":role}, function(response){
		if (response.status === 201 || response.status === 200) {			
		 	alert("Switching account succssful.");
		 sessionStorage.setItem("user", JSON.stringify({"token":sessionItem.token, "_id":response.user._id, "role":response.user.roles}))

			window.location = "/users/dashboard";
		}else if(response.status === 401){
					loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
		}
	});

	}
});