define(function (require, expotrs, module) {


	return createTransaction=(event, url)=>{
		event.preventDefault();
			const {request} = require("../../request");
	const {loading} = require("../../loading");
	const {loginForm} = require("../../logins"); 
	const sessionItem = JSON.parse(sessionStorage.getItem("user")) !== null?JSON.parse(sessionStorage.getItem("user")):{"token":"No token"}; 
  
		request(url, sessionItem, "POST", {"no-body":"No-body"}, function (response) {
			
			loading("spinner", "");
					if (response.status === 200) {
						console.log(response)
						loading("spinner", "display-none");
						alert("Created A service token successfully.")
						//window.location  = "/users/services/token/";
					} else if (response.status === 401) {
						loading("spinner", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 403) {
						loading("spinner", "display-none");
						alert(response.message);
						location.reload();
				}
			});
	}
})