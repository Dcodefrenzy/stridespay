const express = require("express");
const usersController = require("../users/usersController");
const serviceController = require("../products/productController.js");
const logsController = require("../logs/logsController.js");
const mailerController = require("../mail/mailController");
const controller = require("./milestoneController.js");
const router = express.Router();


router.route("/create/:id")
	.post(usersController.userAuthenticate, serviceController.findUserServiceById, controller.checkForTotalMilestonePriceById, logsController.addLogs)


module.exports = router;
