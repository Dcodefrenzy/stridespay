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







module.exports = router;