const {accounts} = require("./accountModel.js");

exports.check=(req, res)=>{
	console.log(req.body)
	console.log({"bank":req.data.name});
	console.log(req.data.recipient)
}


exports.createUserAccount = (req, res, next)=>{
	accounts.findOne({user:req.user._id}).then((account)=>{
		if (account) {
			updateAccount(req, res, next);
		}else{
			createrAccount(req, res, next);
		}
	})
}

const  updateAccount = (req, res, next)=>{
	accounts.findOneAndUpdate({user:req.user._id}, 
								{$set:{
									account:req.data.recipient.account_number, 
									accountName:req.data.recipient.fullname,
									bank:req.data.recipient.bank_name,
									bankCode:req.data.recipient.bank_code,
									recipient:req.data.recipient.id,
								}}).then((account)=>{
									if (account) {	
											req.data._id = req.user._id;
											req.data.status = 201;
										req.data.loggerUser = "User";
										req.data.logsDescription ="Updated to  "+account.accountname+" and account number of "+account.accountnumber;
										req.data.title = "Account";
										next();
									}
								})
}

const createrAccount=(req, res, next)=>{
	const account = new accounts({
		user:req.user._id,
		account:req.data.recipient.account_number,
		accountName:req.data.recipient.bank_name,
		bank:req.data.recipient.fullname,
		bankCode:req.data.recipient.bank_code,
		recipient:req.data.recipient.id,
		dateCreated: new Date()
	});
	account.save().then((account)=>{
	
				req.data._id = req.user._id;
				req.data.status = 201;
			req.data.loggerUser = "User";
			req.data.logsDescription ="Added "+account.accountname+" and account number of "+account.accountnumber;
			req.data.title = "Account";
			next();

	});
}

exports.findUserAccount = (req, res, next)=>{
	accounts.findOne({user:req.user._id}).then((account)=>{
		if (!account) {
			res.status(403).send({status:403, message:"You have not added your bank account yet"});
		}else{
			console.log(account)
			req.data.bank = account;
			next();
		}
	})
} 