define(function(require, exports, module) {

return loadPaymentHandller = (id, link)=>{
	const {loginForm} = require("../logins");
	const {flutterwave} = require("../payment/paystack");
	const sessionItem = JSON.parse(sessionStorage.getItem("user")) !== null?JSON.parse(sessionStorage.getItem("user")):{"token":"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"}; 
     console.log(id)
	const {getRequest} = require("request");
	let url ;
	if (link) {
		url = link
		paymentLink = "payments/verify/transaction/"+id
	}else{
		url = "products/merchant/invoice/"+id;
		paymentLink = "payments/verify/"+id;
	}
console.log(url)

		getRequest(url, sessionItem, "GET", function (response) {
					if (response.status === 200) {
						flutterwave(response, id, paymentLink);
					}else if (response.status === 401) {
					 body.insertAdjacentHTML('afterbegin', loginForm);
					}else if (response.status === 403) {
						alert(response.message);
						window.location = "/users/dashboard";	
					}
			});
		
	}







});