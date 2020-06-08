const {premium} = require("./premiumModel.js");
const {ObjectID} = require("mongodb");


exports.addUserCoupon = (req, res, next)=>{
			req.data.premiumType = "plus";
			req.data.premiumPrice = 350;
			req.data.count = 1;
			req.data.isCoupon = true;
			next();
			addPremiumTranaction(req, res, next);
}
const addPremiumTranaction = (req, res, next)=>{
	const newpremium =	 new premium({
			user:req.data._id,
			premiumType:req.data.premiumType,
			premiumPrice:req.data.premiumPrice,
			count:req.data.count,
			isCoupon:req.data.isCoupon,
			dateCreated:new Date(),
	});

	newpremium.save().then((premium)=>{
			if (premium) {
				next();
			}else {
				
			const err = {status:404, message:"unable to add create premium transaction."}
			console.log(err)
			return res.status(404).send(err);
			}
	}).catch((e)=>{
		console.log(e)
		let err ={}
		if(e.errors) {err = {status:403, message:e.errors}}
		else if(e){err = {status:403, message:e}}
		res.status(404).send(err);
	});
}

exports.updatePremium = (req, res, next)=>{
	console.log(req.params.id)
	premium.findOneAndUpdate({user:req.params.id}, {$inc: {count: 1}}, {new:true}).then((premium)=>{
		if (premium) {
			console.log({"new":premium})
			next();
		}
	}).catch((e)=>{
		console.log(e)
		let err ={}
		if(e.errors) {err = {status:403, message:e.errors}}
		else if(e){err = {status:403, message:e}}
		res.status(404).send(err);
	});
}