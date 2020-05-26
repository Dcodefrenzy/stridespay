
define(function(require, exports, module) {
	const {productPaymentHandller} = require("users/payment");
	const {registerForm} = require("./signUp");
	const {dashBoardHandller}=  require("users/dashboard");
	const {productsHandller} = require("users/products");
	const {showProductHandller}  = require("users/product");
	let styles; 
	const sessionItem = JSON.parse(sessionStorage.getItem("user")) !== null?JSON.parse(sessionStorage.getItem("user")):{"token":"notoken"}; 

	const getId = (url)=>{
		var pathArray = window.location.pathname.split('/');
		return pathArray
	}
	exports.load = (url)=>{
		const path = getId(url);
		console.log(url);
			
	
			switch (url) {
				case "/users/product/payment/"+path[4]:
				productPaymentHandller(sessionItem, path[4]);
				break;
				case "/users/signup":
				registerForm(sessionItem, path[0]);
				break;
				case "/users/dashboard":
				dashBoardHandller(sessionItem, path[0]);
				break;
				case "/users/products":
				productsHandller(sessionItem, path[0]);
				break;
				case "/users/products/"+path[3]:
				showProductHandller(sessionItem, path[3]);
				break;
			}


		
	}

});