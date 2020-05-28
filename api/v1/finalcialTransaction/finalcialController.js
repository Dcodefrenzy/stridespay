const {finalcials} = require("./finalcialModel.js");
const {ObjectID} = require("mongodb");



exports.addFinalcialTranaction = (req, res, next)=>{
	finalcial =	 new finalcials({
			from:req.user._id,
			to:req.data.merchant,
			transaction:req.data._id,
			paymentStatus:req.data.paymentStatus,
			amount:req.data.milestones[req.body.index].price,
			pamentDescription:req.data.milestones[req.body.index].description,
			dateCreated:new Date(),
	});

	finalcial.save().then((finalcials)=>{
			if (finalcials) {
				next();
			}else {
				
			const err = {status:404, message:"unable to add create finalcial transaction."}
			console.log(err)
			return res.status(404).send(err);
			}
	}).catch((e)=>{
		let err ={}
		if(e.errors) {err = {status:403, message:e.errors}}
		else if(e){err = {status:403, message:e}}
		res.status(404).send(err);
	});
}