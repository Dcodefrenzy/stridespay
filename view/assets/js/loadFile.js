
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
	const {servicesHandller} = require("users/freelancers/services");
	const {showServiceHandller} = require("users/freelancers/service");
	const {serviceTokens} = require("users/freelancers/serviceToken");
	const {showServiceTransaction} = require("users/freelancers/serviceTransaction");
	const {createBankAccount} = require("users/bankAccount");
	const {verifyPayment} = require("payment/payment_verify");
	const {verifyPaymentProduct} = require("payment/productPaymentVerify");
	const {withdraw} = require("users/withdraw");
	const {transferMoney} = require("users/transferMoney");
	const {registrationSuccess} = require("users/registrationSuccess");
	const {profile} = require("users/profile");
	const {settingsHandler} = require("users/settings");
	const {uploadImage} = require("users/updateImage");
	const {changePassword} = require("users/changePassword");
	const {showMilestoneHandller} = require("users/freelancers/milestones/milestone");
	const {showClientDatabase} = require("users/clientDatabase");
	const {clientProjects} = require("users/clientProjects");
	const {finanlcialAnalysis} = require("users/analysis/financialAnalysis");
	const {projectAnalysisHandller} = require("users/analysis/projectAnalysis");
	const {showContracts} = require("users/transactions/contracts/contracts");
	const {displayNotification} = require("users/notifications");
	const {forgetPassword} = require("users/password/forgetPassword");
	const {newPassword} = require("users/password/newPassword");
	const {editContract} = require("users/transactions/contracts/editContract");
	const {wallets} = require("users/wallet/wallets");

	//Admin route
	const {createAdmin} = require("admins/register");
	const {adminDashboard} = require("admins/dashboard");
	const {showUserDatabase} = require("admins/users");
	const {adminUsersTransactions} = require("admins/transactions");
	const {showUserWithdraw} = require("admins/withdraw");
	const {adminStridespayWallets} =require("admins/wallet");
	const {adminUsersPaymentTransactions} = require("admins/payments");

	let styles; 
	let sessionItem = sessionStorage.getItem("user")==="undefined"?{"token":"No token"}: sessionStorage.getItem("user") === "null" ?{"token":"No token"}:sessionStorage.getItem("user") === null?{"token":"No token1"}:JSON.parse(sessionStorage.getItem("user"));


	let sessionItemAdmin = sessionStorage.getItem("admin")==="undefined"?{"token":"No token"}: sessionStorage.getItem("admin") === "null" ?{"token":"No token"}:sessionStorage.getItem("admin") === null?{"token":"No token1"}:JSON.parse(sessionStorage.getItem("admin")); 
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
				registerForm(sessionItem, 1);
				break;
				case "/users/register/"+path[3]:
				registerForm(sessionItem, path[3]);
				break;
				case "/users/dashboard":
				dashBoardHandller(sessionItem, path[0]);
				break;
				case "/users/products":
				productsHandller(sessionItem, path[0]);
				break;
				case "/users/projects":
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
				case "/users/freelancer/"+path[3]+"/token/"+path[5]:
				serviceTokens(sessionItem, path[5])
				break;
				case "/users/transactions/"+path[3]:
				transactionsHandller(sessionItem, path[3]);
				break;
				case "/users/transaction/"+path[3]:
				transactionHandller(sessionItem, path[3]);
				break;
				case "/users/services":
				productsHandller(sessionItem, path[0]);
				break;
				case "/users/upload/image":
				uploadImage(sessionItem, path[0]);
				break;
				case "/users/services/"+path[3]:
				showServiceHandller(sessionItem, path[3]);
				break;
				case "/users/milestone/"+path[3]:
				showMilestoneHandller(sessionItem, path[3]);
				break;
				case "/users/contracts":
				showContracts(sessionItem, path[0]);
				break;
				case "/users/notifications":
				displayNotification(sessionItem, path[0])
				break;
				case "/users/services/token/"+path[4]:
				showServiceTransaction(sessionItem, path[4]);
				break;
				case "/users/bank/account":
				createBankAccount(sessionItem, path[0]);
				break;
				case "/users/wallets":
				wallets(sessionItem, path[0]);
				break;
				case "/users/withdraw/all/"+path[4]:
				transferMoney(sessionItem, path[4]);
				break;
				case "/users/withdraw/"+path[3]:
				withdraw(sessionItem, path[3]);
				break;
				case "/users/withdraw":
				withdraw(sessionItem, path[0]);
				break;
				case "/users/payments/verify/transaction/"+path[5]+"/"+path[6]:
				verifyPayment(sessionItem, path[5], path[6]);
				break;
				case "/users/payments/verify/"+path[4]+"/"+path[5]:
				verifyPaymentProduct(sessionItem, path[4], path[5]);
				break;
				case "/users/registration/success/"+path[4]:
				registrationSuccess(sessionItem, path[4]);
				break;
				case "/users/profile":
				profile(sessionItem, path[0]);
				break;
				case "/users/settings":
				settingsHandler(sessionItem, path[0]);
				break;
				case "/users/change/password":
				changePassword(sessionItem, path[0]);
				break;
				case "/users/client-database":
				showClientDatabase(sessionItem, path[0]);
				break;
				case "/users/client-projects/"+path[3]:
				clientProjects(sessionItem, path[3]);
				break;
				case "/users/financial-analysis":
				finanlcialAnalysis(sessionItem, path[0]);
				break;
				case "/users/project-analysis":
				projectAnalysisHandller(sessionItem, path[0]);
				break;
				case "/users/forget-password":
				forgetPassword(sessionItem, path[0]);
				break;
				case "/users/new-password/"+path[3]:
				newPassword(sessionItem, path[3]);
				break;
				case "/users/contract/update/"+path[4]:
				editContract(sessionItem, path[4])
				break;

				//Admin Route

				case "/admins/register":
				createAdmin(sessionItemAdmin, path[0]);
				break;

				case "/admins/dashboard":
				adminDashboard(sessionItemAdmin, path[0]);
				break;

				case "/admins/users":
				showUserDatabase(sessionItemAdmin, path[0]);
				break;

				case "/admins/transactions":
				adminUsersTransactions(sessionItemAdmin, path[0]);
				break;

				case "/admins/withdrawals":
				showUserWithdraw(sessionItemAdmin, path[0]);
				break;

				case "/admins/wallet":
				adminStridespayWallets(sessionItemAdmin, path[0]);
				break;

				case "/admins/finalcial/transactions":
				adminUsersPaymentTransactions(sessionItemAdmin, path[0]);
				break;
				
				
				
			}


		
	}

});