const express = require("express");
const router = express.Router();
const loader = require("./routerLoader.js");
var path = require('path');


router.route("/register")
	.get(loader.loadAdmin)


router.route("/dashboard")
	.get(loader.loadAdmin)



router.route("/login")
	.get(loader.loadAdmin)


router.route("/users")
	.get(loader.loadAdmin)


router.route("/transactions")
	.get(loader.loadAdmin)


router.route("/finalcial/transactions")
	.get(loader.loadAdmin)


router.route("/withdrawals")
	.get(loader.loadAdmin)


router.route("/wallet")
	.get(loader.loadAdmin)






module.exports = router;