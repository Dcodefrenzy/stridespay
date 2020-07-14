const {withdraws} = require("./withdrawModel.js");



exports.createWithdraw = (req, res, next)=>{
	const withdraw =  new withdraws({
		user:req.data._id,
		amount:0,
		dateCreated:new Date(),
	});


	withdraw.save();
	next();
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
	withdraws.find({user:req.user._id}).then((withdraws)=>{
		const totalwithdraws = withdraws.map((withdraw)=>{
			return withdraw.amount;
		}).reduce((total, amount) => total + amount);
		req.data.withdraw = totalwithdraws;
		res.status(200).send(req.data);

	})
}

exports.newWithdraw = (req, res, next)=>{
		const withdraw =  new withdraws({
		user:req.user._id,
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