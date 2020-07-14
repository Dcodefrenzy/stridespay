const express = require("express");
const usersController = require("../users/usersController.js");
const logsController = require("../logs/logsController.js");
const controller = require("./productController.js");
const milestonesController = require("../milestones/milestoneController.js");
const transactionController = require("../transaction/transcationController.js");
const router = express.Router();

router.route("/create")
	.post(usersController.userAuthenticate, controller.createProduct, milestonesController.addMilestone, transactionController.createMerchantTransactions, logsController.addLogs)

router.route("/buyer/invoice/:id")
	.get(usersController.userAuthenticate, controller.findBuyersProductById, milestonesController.fetchMilestonesById)

router.route("/merchant/invoice/:id")
	.get(usersController.userAuthenticate, controller.findMerchantProductById, milestonesController.fetchMilestonesById)

router.route("/")
	.get(usersController.userAuthenticate, controller.findUserProducts)

	
router.route("/service/:id")
	.get(usersController.userAuthenticate, 
		controller.findUserServiceById, 
		milestonesController.fetchServiceMilestone, 
		transactionController.findServiceTransactionById)


router.route("/services")
	.get(usersController.userAuthenticate, controller.findUserServices)

router.route("/services/create")
	.post(usersController.userAuthenticate, controller.createService, logsController.addLogs)

router.route("/transaction/create/:id")
	.post(usersController.userAuthenticate, controller.findProductById, milestonesController.fetchMilestonesPayment, transactionController.createNewMerchantTransactions, logsController.addLogs)


router.route("/freelancer/transaction/create/:id")
	.post(usersController.userAuthenticate, controller.findUserServiceById, milestonesController.fetchServiceMilestone, milestonesController.checkMilestone, transactionController.CreateTransactionForFreelancers, logsController.addLogs)


router.route("/product/:id")
	.get(usersController.userAuthenticate, 
		controller.findProductById, 
		milestonesController.fetchMilestonesPayment, 
		transactionController.findTransactionById)

module.exports = router;