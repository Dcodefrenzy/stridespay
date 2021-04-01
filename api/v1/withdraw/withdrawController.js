const {withdraws} = require("./withdrawModel.js");

//withdrawals do not use kobo

exports.createWithdraw = (req, res, next)=>{
	const withdraw =  new withdraws({
		user:req.data._id,
		amount:0,
		currency:"NGN",
		dateCreated:new Date(),
	});


	withdraw.save();
	next();
}


exports.updateCreateWithdraw = (req, res, next)=>{
		withdraws.findOne({user:req.user._id, currency:"USD"}).then((withdraw)=>{
		if (!withdraw) {
				const withdraw = new withdraws({
				user:req.user._id,
				amount:0+"00",
				currency:"USD",
				dateCreated:new Date(),
			});
			withdraw.save().then((withdraw)=>{
				console.log({"cereated dollar for withdraw": withdraw})
				req.data.withdraw = withdraw;
				next();
			})
		}else if (withdraw) {
				console.log({"retain dollar for withdraw": withdraw})
				req.data.withdraw = withdraw;
				next();
		}
	})

}
exports.updateWithdalC = (req, res, next)=>{
	withdraws.updateMany({user:req.user._id, currency:undefined}, {$set: {currency:"NGN"}}).then((withdraws)=>{
		console.log(withdraws)
	next();
	})
}

exports.createUSerBeforAdding=(req, res, next)=>{
	withdraws.findOne({user:req.data._id}).then((withdraw)=>{
		if (!withdraw) {
				const withdraw = new withdraws({
				user:req.data._id,
				amount:0,
				dateCreated:new Date(),
			});
			withdraw.save().then((withdraw)=>{
				req.data.withdraw = withdraw;
				addToUserWithdraw(req, res, next);
			})
		}else if (withdraw) {
				req.data.withdraw = withdraw;
			addToUserWallet(req, res, next);
		}
	})
}


const returnInteger = (number)=>{
return parseInt(number);
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


exports.subtractUserWithdraw= (req, res, next)=>{
		withdraws.findOneAndUpdate({user:req.data._id}, {$set: {amount:req.data.subtractedValue}}).then((withdraw)=>{
		console.log(withdraw);
		if (withdraw) {
			next();
		}
	})
}

const addWithdrawl = (req, res, next)=>{
	const withdraw =  new withdraws({
		user:req.user._id,
		amount:0,
		dateCreated:new Date(),
	});


	withdraw.save().then((withdraw)=>{
console.log('hh')
		req.data.withdraw = withdraw;
		res.status(200).send(req.data);
		next();
	});
}
exports.getUserWithdraw= (req, res, next)=>{
	withdraws.find({user:req.user._id, currency:req.data.wallet.currency}).then((withdraws)=>{
		const totalwithdraws = withdraws.map((withdraw)=>{
			return withdraw.amount;
		}).reduce((total, amount) => total + amount);
		req.data.withdraw = {"currency":req.data.wallet.currency, totalwithdraws:totalwithdraws};
		res.status(200).send(req.data);

	})
}

exports.getUserWithdrawForProfile= (req, res, next)=>{
	withdraws.find({user:req.user._id}).then((withdraws)=>{
		if (withdraws.length === 0) {
			console.log('here')
			req.data.withdraw = 0;
			next()
		}else if (withdraws.length > 0) {
			const totalwithdraws = withdraws.map((withdraw)=>{
				return withdraw.amount;
			}).reduce((total, amount) => total + amount);
			req.data.withdraw = totalwithdraws;
			next()
			
		}

	}).catch((e)=>{
		console.log('erro here')
			req.data.withdraw = 0;
			next()
	})
}


exports.newWithdraw = (req, res, next)=>{
		const withdraw =  new withdraws({
		user:req.user._id,
		currency:req.data.wallet.currency,
		amount:req.data.transfer.amount,
		transferId:req.data.transfer.id,
		reference:req.data.transfer.reference,
		recipient:req.data.bank.recipient,
		dateCreated:req.data.transfer.date_created,
	});

	withdraw.save().then((withdraw)=>{
		req.data.withdraw = withdraw;
		console.log({"withdraw":withdraw})
		next();
	})
}

exports.getUserWithdrawals = (req, res, next)=>{
	withdraws.find({user:req.user._id}).then((withdraws)=>{
		req.data = {status:200, withdraws:withdraws}
		next();
	})
}

exports.getAdminWithdrawal = (req, res, next)=>{
	withdraws.find().then((withdraws)=>{
		req.data.withdraws = withdraws
		next();
	})
}

exports.getUserWithdrawalsByCurrency = (req, res, next)=>{
	withdraws.find({user:req.user._id, currency:req.body.currency}).then((withdraws)=>{
		req.data = {status:200, withdraws:withdraws}
		next();
	})
}