const express = require("express");
const {addLogs} = require("../logs/logsController.js");
const {sendMail} = require("../mail/mailController.js");
const productController = require("../products/productController.js");
const milestoneController = require("../milestones/milestoneController.js");
const transactionController = require("../transaction/transcationController.js");
const {getUserWallet, subtractUserWallet, getUserWallets} = require("../wallet/walletsController.js");
const {getUserWithdraw, newWithdraw, getUserWithdrawals} = require("./withdrawController.js");
const {userAuthenticate} = require("../users/usersController.js");
const {findUserAccount} = require("../accounts/accountController.js");
const {pushNotification} = require("../push/pushController.js");
const {payOutUser} = require("../payment/paymentController.js");
const {sendSms} = require("../sms/sms.js");
const router = express.Router();

router.route("/withdraw")
		.get(userAuthenticate,  getUserWallet, findUserAccount, getUserWithdraw, addLogs)
router.route("/financial-analysis")
		.get(userAuthenticate, getUserWithdrawals, getUserWallets, transactionController.getUserFinancies)
router.route("/initiate")
		.post(userAuthenticate, 
			 getUserWallet, 
			 findUserAccount,
			 payOutUser, 
			 newWithdraw, 
			 subtractUserWallet, 
			 pushNotification, 
			sendMail, 
			sendSms, addLogs)



module.exports = router;
