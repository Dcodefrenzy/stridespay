const express = require("express");
const controller = require("./usersController");
const auth = require("../admins/adminController");
const logsController = require("../logs/logsController.js");
const mailerController = require("../mail/mailController.js");
const productController = require("../products/productController.js");
const milestoneController = require("../milestones/milestoneController.js");
const transactionController = require("../transaction/transcationController.js");
const walletController = require("../wallet/walletsController.js");
const withdrawController = require("../withdraw/withdrawController.js");
const premiumController = require("../premium/premiumController.js")
const router = express.Router();


router.route("/signup")
	.post(controller.verifyEmail, controller.registerUser, 
			walletController.createWallet, 
			withdrawController.createWithdraw, 
			premiumController.addUserCoupon, 
			/*mailerController.sendRegistrationMail,*/ 
			mailerController.welcomeMail, 
			mailerController.adminNotification, 
			logsController.addLogs)


router.route("/subscribe/:id")
	.post(controller.verifyEmail, controller.registerUser, 
			walletController.createWallet, 
			withdrawController.createWithdraw, 
			premiumController.addUserCoupon, 
			premiumController.updatePremium, 
			mailerController.welcomeMail, 
			mailerController.adminNotification, 
			logsController.addLogs)

	
router.route("/register")
	.post(controller.addUser, walletController.createWallet, withdrawController.createWithdraw, productController.addProduct, milestoneController.addMilestone,transactionController.createMerchantTransactions, logsController.addLogs)

router.route("/login")
	.post(controller.userLogin)


router.route("/verify/user")
	.post(controller.findUserByMail, controller.sendVerification, mailerController.sendMail, logsController.addLogs)


router.route("/update/user")
	.post(controller.userAuthenticate, controller.updateUser,  logsController.addLogs)

router.route("/update/notification")
	.post(controller.userAuthenticate, controller.updatePlayerID,  logsController.addLogs)


router.route("/verification")
	.post(controller.userAuthenticate, controller.chekMailVerification, controller.mailVerification)


router.route("/profile")
	.get(controller.userAuthenticate, walletController.getUserWallet, withdrawController.getUserWithdraw)

router.route("/create/user")
	.post(controller.addUser, logsController.addLogs)


router.route("/change/password")
	.patch(controller.userAuthenticate, controller.passwordChange, logsController.addLogs)

router.route("/logout")
	.patch(controller.userAuthenticate, controller.logout, logsController.addLogs)
	



module.exports = router;