
define(function(require, exports, module) {
	const {productPaymentHandller} = require("users/payment");
	const  {loginSession} = require("users/loginSession");
	const {registerForm} = require("./signUp");
	const {displayMerchantToken} = require("users/displayMerchantToken");
	const {dashBoardHandller}=  require("users/dashboard");
	const {productsHandller} = require("users/products");
	const {showProductHandller}  = require("users/product");
	const {loadVerification} = require("users/verification");
	const {transactionsHandller} = require("users/transactions/transactions");
	const {transactionHandller} = require("users/transactions/transaction");
	const {displayBuyerToken} = require("users/displayBuyerToken");
	let styles; 
	let sessionItem = sessionStorage.getItem("user")==="undefined"?{"token":"No token"}: sessionStorage.getItem("user") === "null" ?{"token":"No token"}:sessionStorage.getItem("user") === null?{"token":"No token1"}:JSON.parse(sessionStorage.getItem("user")); 

	const getId = (url)=>{
		var pathArray = window.location.pathname.split('/');
		return pathArray
	}
	exports.load = (url)=>{
		const path = getId(url);
		//console.log(url);
			
	
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
				case "/users/verification/"+path[3]:
				loadVerification(sessionItem, path[3])
				break;
				case "/users/login":
				loginSession(sessionItem, path[0])
				break;
				case "/users/merchant/"+path[3]+"/token/"+path[5]:
				displayMerchantToken(sessionItem, path[5]);
				break;
				case "/users/buyer/"+path[3]+"/token/"+path[5]:
				displayBuyerToken(sessionItem, path[5])
				break;
				case "/users/transactions":
				transactionsHandller(sessionItem, path[0])
				break;
				case "/users/transactions/"+path[3]:
				transactionHandller(sessionItem, path[3])
				break;

			}


		
	}

});