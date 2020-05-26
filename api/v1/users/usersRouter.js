const express = require("express");
const controller = require("./usersController");
const auth = require("../admins/adminController");
const logsController = require("../logs/logsController.js");
const mailerController = require("../mail/mailController");
const productController = require("../products/productController.js");
const milestoneController = require("../milestones/milestoneController.js")
const router = express.Router();


router.route("/signup")
	.post(controller.verifyEmail, controller.registerUser, logsController.addLogs)

	
router.route("/register")
	.post(controller.addUser, productController.addProduct, milestoneController.addMilestone, logsController.addLogs)

router.route("/login")
	.post(controller.userLogin)


router.route("/profile")
	.get(controller.userAuthenticate, controller.userProfile)



module.exports = router;