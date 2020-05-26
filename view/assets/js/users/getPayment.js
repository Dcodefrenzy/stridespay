define(function(require, exports, module) {

return loadPaymentHandller = (id)=>{
	const {loginForm} = require("../logins");
	const {payWithPaystack} = require("../payment/paystack");
	const sessionItem = JSON.parse(sessionStorage.getItem("user")) !== null?JSON.parse(sessionStorage.getItem("user")):{"token":"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"}; 
     console.log(sessionItem)
	const {getRequest} = require("request");


		getRequest("products/"+id, sessionItem, "GET", function (response) {
					if (response.status === 200) {
						payWithPaystack(response);
					}else if (response.status === 401) {
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}
			});
		
	}







});