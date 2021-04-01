const express = require("express");
const {addLogs} = require("../logs/logsController.js");
const {sendMail} = require("../mail/mailController.js");
const userController = require("../users/usersController.js");
const milestoneController = require("../milestones/milestoneController.js");
const transactionController = require("../transaction/transcationController.js");
const controller = require("./walletsController.js");
const withdrawalController = require("../withdraw/withdrawController.js");
const productController = require("../products/productController");
const adminController = require("../paymerchantWallet/paymerchantWalletController.js");
const paymentController = require("../payment/paymentController.js");

const router = express.Router();

router.route("/")
		.get(userController.userAuthenticate, controller.getUserWalletsForWithdrawal)

router.route("/update/currency")
		.patch(userController.userAuthenticate, controller.updateC, controller.updateCreateWallet, paymentController.updateWithdalC, transactionController.updateC, productController.updateC, adminController.updateWithdalC, withdrawalController.updateWithdalC, addLogs)




module.exports = router;
