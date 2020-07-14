const express = require("express");
const usersController = require("../users/usersController");
const logController = require("../logs/logsController.js");
const productController = require("../products/productController.js");
const milestonesController = require("../milestones/milestoneController.js");
const transactionController = require("../transaction/transcationController.js");
const controller = require("./accountController.js");
const paymentController = require("../payment/paymentController.js");
const router = express.Router();


router.route("/create")
		.post(usersController.userAuthenticate, paymentController.checkBankName, paymentController.addRecipient, controller.createUserAccount, logController.addLogs)


module.exports = router;