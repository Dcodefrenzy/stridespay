const express = require("express");
const usersController = require("../users/usersController.js");
const logsController = require("../logs/logsController.js");
const controller = require("./productController.js");
const milestonesController = require("../milestones/milestoneController.js");
const transactionController = require("../transaction/transcationController.js");
const router = express.Router();


router.route("/create")
	.post(usersController.userAuthenticate, controller.createProduct, milestonesController.addMilestone, logsController.addLogs)

router.route("/buyer/invoice/:id")
	.get(controller.findBuyersProductById, milestonesController.fetchMilestonesById)

router.route("/merchant/invoice/:id")
	.get(controller.findMerchantProductById, milestonesController.fetchMilestonesById)

router.route("/:id")
	.get(usersController.userAuthenticate, controller.findProductById, milestonesController.fetchMilestonesPayment, transactionController.findTransactionById)

router.route("/")
	.get(usersController.userAuthenticate, controller.findUserProducts)



module.exports = router;