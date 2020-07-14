const Router = require("express");
const adminController = require("./adminController.js");
const mailController = require("../mail/mailController");
const logsController = require("../logs/logsController");
const router = Router();


router.route("/register")
	.post( adminController.masterAdminAuthenticate,  adminController.addAdmin, mailController.sendRegistrationMail, logsController.addLogs)

router.route("/login")
	.post(adminController.adminLogin)

router.route("/logout")
	.patch(adminController.adminAuthenticate, adminController.logout, logsController.addLogs)

router.route("/update")
	.patch(adminController.adminAuthenticate, adminController.updateProfile)

router.route("/profile")
	.get(adminController.adminAuthenticate, adminController.adminProfile)

router.route("/profile/update")
.patch(adminController.adminAuthenticate, adminController.updateProfile, logsController.addLogs)

router.route("/image/update")
.post(adminController.adminAuthenticate, adminController.updateImage)

router.route("/admin-verify")
	.patch(adminController.adminAuthenticate, adminController.mailVerification)

router.route("/")
	.get( adminController.masterAdminAuthenticate,  adminController.viewAdmins)

router.route("/:id")
	.patch(adminController.masterAdminAuthenticate, adminController.updateAdmin)

router.route("/suspend/:id")
	.patch(adminController.masterAdminAuthenticate, adminController.suspendAdmin)

router.route("/password/change")
	.patch(adminController.adminAuthenticate, adminController.passwordChange, logsController.addLogs)


	module.exports =	router;