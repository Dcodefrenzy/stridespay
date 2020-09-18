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

const returnInteger = (number)=>{
return parseInt(number);
}

 exports.checkMilestone = (req, res, next)=>{
 	if (req.data.milestones.length < 1) {
		const err = {status:403, message:"ERROR! You need to create milestone for before creating a payment link or token."}
		return res.status(403).send(err);
 	}else {
	const sum = req.data.milestones.map((milestone)=>{
				let price  =+ milestone.price;
				return price;
		}).reduce((total, amount) => total + amount); 
			//Used slice because we are storing amounts in Kobo which means there will always be two 00 at the end so to add our value we must remove those two zeros.

			const milestoneSum = returnInteger(sum.toString().slice(0, -2));
			const servicePrice = returnInteger(req.data.service.price.toString().slice(0, -2));

/*
		console.log(newPrice + milestoneSum);
		console.log(servicePrice);*/
		//we are adding the price the user entered to the previous milstones price to know if the total service price is lesser, if its lesser we trow an weeor.

			if (servicePrice !== milestoneSum) {
				const err = {status:403, message:"ERROR! What are you trying to do, Ensure the price for your milestones is  equals to the total  price. Your total milestone price is NGN"+milestoneSum+" But your Service total price is NGN"+servicePrice}
				return res.status(403).send(err);
			}
			else{
				next();
			}
 		
 	}

}
exports.checkForTotalMilestonePriceById=(req, res, next)=>{
	milestones.find({product:req.data.service._id}, {price:1, _id:0}).then((milestones)=>{

		const sum = milestones.map((milestone)=>{
				let price  =+ milestone.price;
				return price;
		}).reduce((total, amount) => total + amount); 
			//Used slice because we are storing amounts in Kobo which means there will always be two 00 at the end so to add our value we must remove those two zeros.
			req.data.updatePrice = sum;
			next();
	}).catch((e)=>{
		console.log(e);
		let err ={}
		if(e.errors) {err = {status:403, message:{message:e.errors}}}
		else if(e){err = {status:403, message:e}}
		res.status(404).send(err);
	});
}

exports.addServiceMilestone=(req, res, next)=>{
	console.log(req.body);
	const milestone = new milestones({
			milestone:req.body.title,
			description:req.body.description,
			price:req.body.price+"00",
			product:req.data.service._id,
			dateCreated:new  Date(),
	});

	milestone.save().then((milestone)=>{
        if (!milestone) {
			const err = {status:403, message:{message:"unable to add milestone."} }
			console.log(err)
			return res.status(403).send(err);
        }else{	
        	req.data.milestones = milestone;
        	req.data._id  = req.data.user._id		
			req.data.loggerUser = "User";
			req.data.logsDescription = "Added Service milestone successfully";
			req.data.title = "Milestones";
				next();
 
        }
	}).catch((e)=>{
		console.log(e);
		let err ={}
		if(e.errors) {err = {status:403, message:{message:e.errors}}}
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


exports.fetchServiceMilestone = (req, res, next)=>{
	milestones.find({product:req.data.service._id}).then((milestones)=>{
		
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

