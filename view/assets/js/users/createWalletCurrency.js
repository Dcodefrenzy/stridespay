define(function(require, exports, module) {
const {request} = require("../request");
return createWalletCurrency = (event, link)=>{
	let sessionItem = sessionStorage.getItem("user")!=="undefined"?JSON.parse(sessionStorage.getItem("user")):{"token":"No token"}; 

	console.log(link)
	const {getRequest} = require("request");
	const {loginForm} = require("../logins");

	request(link, sessionItem, "PATCH", {"":""}, function(response){
		console.log(response);
		if (response.currency === "USD") {			
		 	alert("Successfully created a USD wallet")
			location.reload();
		}
	});

	}







});