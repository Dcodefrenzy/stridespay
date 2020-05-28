const {milestones} = require("./milestoneModel.js");
const {ObjectID} = require("mongodb");

exports.addMilestone=(req, res, next)=>{

	let description = !req.body.description?"Deliver"+" "+req.data.product:req.body.description;
	let milestoneType = !req.body.milestone?"Delivery":req.body.milestone;

	const milestone = new milestones({
			milestone:milestoneType,
			description:description,
			price:req.data.price,
			product:req.data.productId,
			dateCreated:new  Date(),
	});

	milestone.save().then((milestone)=>{
        if (!milestone) {
			const err = {status:404, message:"unable to add milestone."}
			console.log(err)
			return res.status(404).send(err);
        }else{	
        	req.data.milestones = milestone;
				next();
 
        }
	}).catch((e)=>{
		console.log(e);
		let err ={}
		if(e.errors) {err = {status:403, message:e.errors}}
		else if(e){err = {status:403, message:e}}
		res.status(404).send(err);
	});
}

exports.fetchMilestonesById = (req, res)=>{
	milestones.find({product:req.data.product._id}).then((milestones)=>{
		console.log("miles")
		req.data.milestones = milestones;
		res.status(200).send(req.data);
	}).catch((e)=>{
		console.log(e);
		let err ={}
		if(e.errors) {err = {status:403, message:e.errors}}
		else if(e){err = {status:403, message:e}}
		res.status(404).send(err);
	})
}


exports.fetchMilestonesPayment = (req, res, next)=>{
	milestones.find({product:req.data.product._id}).then((milestones)=>{
		
		req.data.milestones = milestones;
		next();
	}).catch((e)=>{
		console.log(e);
		let err ={}
		if(e.errors) {err = {status:403, message:e.errors}}
		else if(e){err = {status:403, message:e}}
		res.status(404).send(err);
	})
}

