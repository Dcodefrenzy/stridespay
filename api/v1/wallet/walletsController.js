const {wallets} = require("./walletsModel.js");



exports.createWallet = (req, res, next)=>{
	const wallet =  new wallets({
		user:req.data._id,
		amount:0,
		dateCreated:new Date(),
	});


	wallet.save();
	next();
}

exports.createUSerBeforAdding=(req, res, next)=>{
	wallets.findOne({user:req.data.merchant}).then((wallet)=>{
		if (!wallet) {
			console.log({"!wallet":"here"})
				const wallet = new wallets({
				user:req.data.merchant,
				amount:req.data.milestonesPrice,
				dateCreated:new Date(),
			});
			wallet.save().then((wallet)=>{
				req.data.wallet = wallet;
				next();
			})
		}else if (wallet) {
			console.log({"iswallet":"walletAMount"})
				req.data.wallet = wallet;
			addToUserWallet(req, res, next);
		}
	})
}


const returnInteger = (number)=>{
return parseInt(number);
}

const addToUserWallet = (req, res, next)=>{

	const newBalance  = returnInteger(req.data.milestonesPrice) + returnInteger(req.data.wallet.amount);

	wallets.findOneAndUpdate({user:req.data.merchant}, {$set: {amount:newBalance}}).then((wallet)=>{
		if (wallet) {
			next();
		}
	}).catch((e)=>{
		console.log(e)
		res.status(404).send(e)
	})
}


exports.checkUserForWithdraw = (req, res, next)=>{
		wallets.findOne({user:req.user._id}).then((wallet)=>{
				if (wallet && wallet.amount > req.body.amount) {
					subtractUserWallet(req, res, next);
				}else if (wallet && wallet.amount < req.body.amount) {
					const err = {status:404, message:"You are tying to withdraw an amount greated than your balance"}
            		return res.status(404).send(err);
				}
		}).catch((e)=>{
		console.log(e)
		res.status(404).send(e)
	})
}


exports.subtractUserWallet = (req, res, next)=>{
		const previousWalletAmount = req.data.wallet.amount.toString().slice(0, -2);
		const subtractedValue = returnInteger(previousWalletAmount) - returnInteger(req.data.transfer.amount)
		console.log("sub"+subtractedValue)
		wallets.findOneAndUpdate({user:req.user._id}, {$set: {amount:subtractedValue}}).then((wallet)=>{
		console.log({"subtractwallet":wallet});
		if (wallet) {
			req.data.status = 201;
			req.data.redirect = "/users/dashboard";
			req.data.loggerUser = "User";
			req.data._id = req.user._id
			req.data.logsDescription = `Payout of NGN ${req.data.transfer.amount} successful`;
			req.data.title = "Withdraw";
            req.data.link = "https://paymerchant.co/users/login",
            req.data.mailTitle = "Withdraw Notification",
            req.data.mailMessage = `Your Payout of NGN ${req.data.transfer.amount} was successful`
            req.data.playerId = req.user.playerId;  
			next();
		}
	})
}

exports.getUserWallet = (req, res, next)=>{
	wallets.findOne({user:req.user._id}).then((wallet)=>{
		req.data = {status:200, wallet:wallet, user:req.user};
		next();
	})
}