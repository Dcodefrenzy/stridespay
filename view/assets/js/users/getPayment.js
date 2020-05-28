define(function(require, exports, module) {

return loadPaymentHandller = (id, link)=>{
	const {loginForm} = require("../logins");
	const {payWithPaystack} = require("../payment/paystack");
	const sessionItem = JSON.parse(sessionStorage.getItem("user")) !== null?JSON.parse(sessionStorage.getItem("user")):{"token":"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"}; 
     console.log(id)
	const {getRequest} = require("request");
	let url ;
	if (link) {
		url = link
	}else{
		url = "products/"+id
	}

		getRequest(url, sessionItem, "GET", function (response) {
					if (response.status === 200) {
						console.log(id)
						payWithPaystack(response, id);
					}else if (response.status === 401) {
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}
			});
		
	}







});