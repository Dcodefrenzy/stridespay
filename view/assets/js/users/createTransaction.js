define(function(require, exports, module) {
const {request} = require("../request");
return createTransaction = (event, link)=>{
	let sessionItem = sessionStorage.getItem("user")!=="undefined"?JSON.parse(sessionStorage.getItem("user")):{"token":"No token"}; 

	console.log(link)
	const {getRequest} = require("request");
	const {loginForm} = require("../logins");

	request(link, sessionItem, "POST", {"":""}, function(response){
		if (response.status === 200) {			
		 	alert("A new transaction was created Successfully.")
			location.reload();
		}
	});

	}







});