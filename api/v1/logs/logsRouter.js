const express = require("express");
var router = express.Router();
var controller = require("./logsController.js");
const adminAuth = require("../admins/adminController");
const userController = require("../users/usersController");



router.route("/")
	.get(adminAuth.adminAuthenticate, controller.getAllLogs)


router.route("/admin")
	.get(adminAuth.adminAuthenticate,   controller.adminLogs)


router.route("/user")
	.get(userController.userAuthenticate,   controller.getUserLogs)


router.route("/user/:id")
	.get(userController.userAuthenticate,   controller.getUserChatLogs)
	

	router.route("/unread/user")
	.get(userController.userAuthenticate,   controller.getUserUnreadLogs)

	
router.route("/update/user")
	.get(userController.userAuthenticate,   controller.updateLogs)

	
router.route("/update/admin")
	.get(adminAuth.adminAuthenticate,   controller.updateLogs)
		





	module.exports = router;