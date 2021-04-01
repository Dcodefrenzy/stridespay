const {PaymerchantWallets} = require("./paymerchantWalletModel.js");

const returnInteger = (number)=>{
return parseInt(number);
}


const deductMoney = (milestonePrice, currency)=>{
		let deduction;
	if (currency === "USD") {
		console.log({"USD":milestonePrice})
	return  deduction = returnInteger(milestonePrice.toString().slice(0, -2))  * 6/100;

	}else if (currency === "NGN") {
		console.log({"NGN":milestonePrice})
	return  deduction = returnInteger(milestonePrice.toString().slice(0, -2)) * 3/100;
		if (deduction > 3000) {
			return deduction = 3000;
		}else if (deduction < 3000) {
			return deduction = checkDeduction;	
		}
	}
}
exports.addAddTooPaymerchant = (req, res, next)=>{

	let deduction = deductMoney(req.data.milestones[req.body.index].price, req.data.currency);

	let userPayment = returnInteger(req.data.milestones[req.body.index].price.toString().slice(0, -2))  - deduction
	   paymerchantWalletModel = new PaymerchantWallets({
	   		transaction:req.data.transaction,
	   		user:req.user._id,
	   		currency:req.data.currency,
	   		description: req.data.milestones[req.body.index].description,
	   		userPayment: userPayment+"00",
	   		totalPayment: req.data.milestones[req.body.index].price,
	   		paymerchantAmount:deduction+"00",
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

exports.getAdminWallet= (req, res, next)=>{
    PaymerchantWallets.find().then((adminWallets)=>{
            req.data.adminWallets = adminWallets;
            next();
    }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}

exports.updateWithdalC = (req, res, next)=>{
	PaymerchantWallets.updateMany({currency:undefined}, {$set: {currency:"NGN"}}).then((PaymerchantWallets)=>{
		console.log(PaymerchantWallets)
	next();
	})
}