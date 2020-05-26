const {payments} = require("./paymentModel.js");

var paystack = require('paystack')("sk_test_015b5407fc52c3638c09cb158ce355996e2cc1a9");

exports.verifyPayment=(req, res, next)=>{
		paystack.transaction.verify(req.body.reference, function(error, body) {
				
					if (body.data.status === "success" && body.data.amount ===  Number(req.data.product.price)  ) {
						req.data.paymentStatus = true;
						req.data.redirect = "/users/products/"+req.data.product._id;
	  						next();
					}else if (body.data.status !== "success" &&  body.data.amount !== req.data.product.price) {
						req.data.paymentStatus = false;
	  						console.log("Failed");
						req.data.redirect = "/users/products/"+req.data.product._id+"/payment/failed";
	  						next();
					}	
		});
}

exports.createNewPayment =(req, res, next)=>{
			const payment = new payments({
				createdBy:req.user._id,
				transaction:req.data.transaction._id,
				paymentStatus:req.data.paymentStatus,
				price:req.data.transaction.price,
				dateCreated: new Date(),
			});
			payment.save().then((payment)=>{
					if (payment) {
					const payMentStatus = req.data.paymentStatus === true?"successful":"not successful";
					req.data._id = req.user._id; 
					req.data.loggerUser = "User";
					req.data.logsDescription = `Your payment of ${payment.price} was ${payMentStatus}`;
					req.data.title = "Payment";
					next();
					}
			})
}
