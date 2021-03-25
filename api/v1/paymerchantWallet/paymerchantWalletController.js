const {PaymerchantWallets} = require("./paymerchantWalletModel.js");




exports.addAddTooPaymerchant = (req, res, next)=>{

	let deduction;
	const checkDeduction = req.data.milestones[req.body.index].price * 3/100;
	if (checkDeduction > 300000) {
		deduction = 300000;
	}else if (checkDeduction < 300000) {
		deduction = checkDeduction;	
	}

	   paymerchantWalletModel = new PaymerchantWallets({
	   		transaction:req.data.transaction,
	   		user:req.user._id,
	   		currency:req.data.currency,
	   		description: req.data.milestones[req.body.index].description,
	   		userPayment: req.data.milestones[req.body.index].price - deduction,
	   		totalPayment: req.data.milestones[req.body.index].price,
	   		paymerchantAmount:deduction,
	   		dateCreated: new Date(),
	   });
	   paymerchantWalletModel.save().then((paymerchantAmount)=>{
	   	console.log({"paymerchant amount":paymerchantAmount})
	   	 req.data.milestonesPrice = paymerchantAmount.userPayment;
  		req.data.milestonesDescription = req.user.name+" Paid "+ req.data.currency + " "+req.data.milestonesPrice.toString().slice(0, -2)+" for "+paymerchantAmount.description+" after paymerchant deduction of "+ req.data.currency +" "+paymerchantAmount.paymerchantAmount.toString().slice(0, -2);
  		 req.data.mailMessage = req.data.milestonesDescription;
  			next();
	   }).catch((e)=>{
		console.log(e)
		res.status(404).send(e)
	})
}