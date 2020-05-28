const express = require("express");
const usersController = require("../users/usersController");
const logController = require("../logs/logsController.js");
const productController = require("../products/productController.js");
const milestonesController = require("../milestones/milestoneController.js");
const transactionController = require("../transaction/transcationController.js");
const controller = require("./paymentController.js");
const router = express.Router();



router.route("/verify/:id")
		.post(usersController.userAuthenticate, productController.findBuyersProductById, milestonesController.fetchMilestonesPayment, controller.verifyPayment, transactionController.createBuyerTransactions, controller.createNewPayment, logController.addLogs)



module.exports = router;
