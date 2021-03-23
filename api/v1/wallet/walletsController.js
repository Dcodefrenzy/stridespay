const {wallets} = require("./walletsModel.js");



exports.createWallet = (req, res, next)=>{
	const wallet =  new wallets({
		user:req.data._id,
		amount:0+"00",
		dateCreated:new Date(),
	});

console.log('Stupid wallets hehrehhe')
	wallet.save();
	next();
}
exports.createDollarAccount = (req, res, next)=>{
	const wallet = new wallets({
		user:req.data._id,
		amount:0+"00",
		currency:"USD",
		dateCreated:new Date(),
	});
console.log('hete wallets hehrehhe')
	wallet.save();
	next();
}

exports.updateCreateWallet = (req, res, next)=>{

		wallets.findOne({user:req.user._id, currency:"USD"}).then((wallet)=>{
		if (!wallet) {
			console.log({"!wallet":"here"})
					const wallet = new wallets({
						user:req.user._id,
						amount:0+"00",
						currency:"USD",
						dateCreated:new Date(),
					});
					console.log({'here':wallet})
			wallet.save().then((wallet)=>{	
			console.log(wallet)		
				req.data = wallet;
				req.data.status = 201;
				req.data.loggerUser = "User";
				req.data._id = req.user._id
				req.data.logsDescription = `Created a Dollar wallet account successfuly`;
				req.data.title = "Wallet";
				next();
			})
		}else if (wallet) {
			console.log({"iswallet":wallet})	
				req.data = wallet;
				req.data.status = 201;
				req.data.loggerUser = "User";
				req.data._id = req.user._id
				req.data.logsDescription = `Created a Dollar wallet account successfuly`;
				req.data.title = "Wallet";
				next();
		}
	})

}

exports.deleteC = (req, res)=>{
	wallets.findOneAndDelete({user:req.user._id, amount:0+"00", currency:undefined}).then((wallet)=>{
		console.log(wallet)
		next();
	/*res.status(200).send("jj")*/
	})
}
exports.updateC = (req, res, next)=>{
	wallets.updateMany({user:req.user._id, currency:undefined}, {$set: {currency:"NGN"}}).then((wallet)=>{
		console.log(wallet)
	next();
	})
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
		wallets.findOne({user:req.user._id, currency:req.data.wallet.currency}).then((wallet)=>{
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
		wallets.findOneAndUpdate({user:req.user._id, currency:req.data.wallet.currency}, {$set: {amount:subtractedValue}}).then((wallet)=>{
		console.log({"subtractwallet":wallet});
		if (wallet) {
			req.data.status = 201;
			req.data.redirect = "/users/dashboard";
			req.data.loggerUser = "User";
			req.data._id = req.user._id
			req.data.logsDescription = `Payout of ${req.data.wallet.currency} ${req.data.transfer.amount} successful`;
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
		if (wallet === "null" || wallet === null || !wallet) {	
				const wallet =  new wallets({
					user:req.user._id,
					amount:0+"00",
					dateCreated:new Date(),
				});
				wallet.save().then((wallet)=>{
					req.data = {status:200, wallet:wallet, user:req.user};
					next();

				});
		}else if (wallet) {
		req.data = {status:200, wallet:wallet, user:req.user};
		next();
			
		}
	})
}

exports.getUserWalletForWithdrawl = (req, res, next)=>{
	wallets.findOne({user:req.user._id, _id:req.params.id}).then((wallet)=>{
		if (wallet === "null" || wallet === null || !wallet) {	
				const wallet =  new wallets({
					user:req.user._id,
					amount:0+"00",
					dateCreated:new Date(),
				});
				wallet.save().then((wallet)=>{
					req.data = {status:200, wallet:wallet, user:req.user};
					next();

				});
		}else if (wallet) {
		req.data = {status:200, wallet:wallet, user:req.user};
		next();
			
		}
	})
}


exports.getUserWallets = (req, res, next)=>{
	wallets.find({user:req.user._id}).then((wallets)=>{
console.log('wallets hehrehhe')
		req.data.userWallets = wallets;
		next();
	})
}

exports.getUserWalletsByCurrency=(req, res, next)=>{
	wallets.find({user:req.user._id, currency:req.body.currency}).then((wallets)=>{
		req.data.wallets = wallets;
		next();
	})
}

exports.getUserWalletsForWithdrawal = (req, res, next)=>{
	wallets.find({user:req.user._id}).then((wallets)=>{
		req.data = {status:200, wallets:wallets, user:req.user};
		res.status(200).send(req.data);
		
	})
}