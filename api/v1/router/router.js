const express = require("express");
const router = express.Router();
const loader = require("./routerLoader.js");
var path = require('path');


router.route("/product/payment/:id")
	.get(loader.load)


router.route("/products/:id")
	.get(loader.load)
	
router.route("/signup")
	.get(loader.load)

router.route("/dashboard")
	.get(loader.load)


router.route("/products")
	.get(loader.load)

router.route("/login")
	.get(loader.load)


router.route("/verification/:id")
	.get(loader.load)


router.route("/forget/password")
	.get(loader.load)

router.route("/change/password")
	.get(loader.load)

router.route("/products/transaction/:id")
	.get(loader.load)


router.route("/buyer/:name/token/:id")
	.get(loader.load)

router.route("/merchant/:name/token/:id")
	.get(loader.load)


router.route("/transactions")
	.get(loader.load)


router.route("/transactions/:id")
	.get(loader.load)

router.route("/services/")
	.get(loader.load)





module.exports = router;