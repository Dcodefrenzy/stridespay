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


router.route("")
	.get(usersController.userAuthenticate, controller.fetchUsersTransactions)

router.route("/contract")
	.get(usersController.userAuthenticate, controller.getAllTransactions)

router.route("/merchant/token/:id")
	.get(controller.findOneTransactionById, usersController.getMerchantDetails)

router.route("/buyer/token/:id")
	.get(controller.findOneTransactionById, usersController.getMerchantDetails)

router.route("/service/token/:id")
	.get(controller.findOneTransactionById, usersController.getMerchantDetails)


router.route("/service/tokens/:id")
	.get(usersController.userAuthenticate, controller.findOneTransactionById, usersController.getMerchantDetails)


router.route("/payment/token/:id")
	.get(usersController.userAuthenticate, controller.findOneTransactionByIdForPayment)

router.route("/manage/:id")
	.get(usersController.userAuthenticate, controller.findOneTransactionByIdForEdit)

router.route('/edit/:id')
	.patch(usersController.userAuthenticate, controller.updateUserTransaction, logsController.addLogs)

router.route('/milestone/edit/:id/:milestoneId')
	.patch(usersController.userAuthenticate, controller.editTransactionMilestone, controller.updateTransactionPrice, logsController.addLogs)

router.route('/milestone/:id/:milestoneId')
	.get(usersController.userAuthenticate, controller.findOneTransactionMilestone)


router.route("/read/token/:id")
	.get(usersController.userAuthenticate, controller.readTransactionById)


router.route("/delete/token/:id")
	.post(usersController.userAuthenticate, controller.deleteTransactionById, logsController.addLogs)


router.route("/clients/:id")
	.get(usersController.userAuthenticate, usersController.findUser, controller.findUserClients)


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