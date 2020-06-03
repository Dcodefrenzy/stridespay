const express = require("express");
const usersController = require("../users/usersController.js");
const logsController = require("../logs/logsController.js");
const controller = require("./transcationController.js");
const milestonesController = require("../milestones/milestoneController.js");
const transactionController = require("../products/productController.js")
const pushController = require("../push/pushController.js")
const mailController = require("../mail/mailController.js");
const finalcialTransactionController = require("../finalcialTransaction/finalcialController.js");
const paymerchantWalletController = require("../paymerchantWallet/paymerchantWalletController.js");
const walletController = require("../wallet/walletsController.js");
const smsController = require("../sms/sms.js");
const router = express.Router();

router.route("/merchant/token/:id")
	.get(controller.findOneTransactionById)

router.route("/buyer/token/:id")
	.get(controller.findOneTransactionById)

router.route("/service/token/:id")
	.get(controller.findOneTransactionById)


router.route("/payment/token/:id")
	.get(usersController.userAuthenticate, controller.findOneTransactionByIdForPayment)

router.route("/start/:id")
	.patch(usersController.userAuthenticate, controller.checkOngoingTransaction, controller.startTransaction, usersController.findUserForTransaction, pushController.pushNotification, mailController.sendMail, smsController.sendSms, logsController.addLogs)


router.route("/merchant/update/milestone")
	.patch(usersController.userAuthenticate, 
			controller.merchantUpdateMilestones, 
			usersController.findUserForTransaction,			
			pushController.pushNotification, 
			mailController.sendMail, 
			smsController.sendSms, 
			logsController.addLogs)

router.route("/buyer/update/milestone")
	.patch(		usersController.userAuthenticate,
				controller.checkBuyerWithdrawForChanges,
				 controller.buyerUpdateMilestones, 
				 controller.updateBuyerWithdraw,
				paymerchantWalletController.addAddTooPaymerchant,
				walletController.createUSerBeforAdding,
				 finalcialTransactionController.addFinalcialTranaction, 
				 usersController.findUserForTransaction,  
				 pushController.pushNotification, 
				 mailController.sendMail, 
				 smsController.sendSms, 
				 logsController.addLogs
			 )


router.route("/")
	.get(usersController.userAuthenticate, controller.fetchUsersTransactions)

router.route("/:id")
	.get(usersController.userAuthenticate, controller.fetchUserTransactionById)

module.exports = router;