const express = require("express");
const usersController = require("../users/usersController");
const logController = require("../logs/logsController.js");
const productController = require("../products/productController.js");
const milestonesController = require("../milestones/milestoneController.js");
const transactionController = require("../transaction/transcationController.js");
const mailController = require("../mail/mailController.js");
const controller = require("./paymentController.js");
const router = express.Router();



router.route("/verify/:id")
		.post(usersController.userAuthenticate, productController.findMerchantProductById, milestonesController.fetchMilestonesPayment, controller.verifyPayment, transactionController.createBuyerTransactions, controller.createNewPayment, logController.addLogs)

router.route("/verify/transaction/:id")
		.post(usersController.userAuthenticate, transactionController.findTransactionForPayment, controller.verifyTransactionPayment, transactionController.createBuyerTransactions,  controller.createNewPayment, usersController.getMerchantDetailsForMail, mailController.sendMail, logController.addLogs)

router.route("/banks")
		.get(usersController.userAuthenticate, controller.getAllBanks)

module.exports = router;
