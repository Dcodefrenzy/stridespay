const {transactions} = require("./transactionModel.js");
const {ObjectID} = require("mongodb");



exports.createBuyerTransactions=(req, res, next)=>{

    transaction = new transactions({
        buyer:req.user._id,
        product:req.data.product._id,
        paymentStatus:req.data.paymentStatus,
        milestones:req.data.milestones,
        price:req.data.product.price,
        paymentReference:req.body.reference,
        dateCreated:new Date,
    });

    transaction.save().then((transaction)=>{
        if (!transaction) {
			const err = {status:404, message:"unable to add create transaction."}
			console.log(err)
			return res.status(404).send(err);
            
        }else{			
			req.data.transaction = transaction;
			next();
        }
    }).catch((e)=>{
		let err ={}
		if(e.errors) {err = {status:403, message:e.errors}}
		else if(e){err = {status:403, message:e}}
		res.status(404).send(err);
	});
}

exports.updateProduct = (req, res,next)=>{
    product = new products({
        name:req.body.name,
        quantity:req.body.quantity,
        request:req.body.request,
        _category:req.body._category,
    });
    products.findByIdAndUpdate(req.params.id, {$set: {name:product.name, quantity:product.quantity,request:product.request,_category:product.category,}}).then((product)=>{
        if (!product) {
			const err = {status:404, message:"Unable to update product."}
			return res.status(404).send(err);
        }else{
            res.status(200).send({status:200, message:product});
        }
    }).catch((e)=>{
		let err ={}
		if(e.errors) {err = {status:403, message:e.errors}}
		else if(e){err = {status:403, message:e}}
		res.status(404).send(err);
	});
}

exports.ViewAllProducts = (req, res)=>{
    products.find().then(products=>res.status(200).send({status:200, message:products}));
}

exports.findUserProducts = (req, res)=>{
    products.find({_user:req.user._id}).then((products)=>{
        if (!products) {
			const err = {status:404, message:"No product listed yet."}
			return res.status(404).send(err);
        }else{
            res.status(200).send({status:200, message:products});
        }
    }).catch((e)=>{
		let err ={}
		if(e.errors) {err = {status:403, message:e.errors}}
		else if(e){err = {status:403, message:e}}
		res.status(404).send(err);
	});
}

exports.findTransactionById= (req, res)=>{
    transactions.find({$or: [ {product:req.data.product._id, buyer:req.user._id, transactionStart:false, transactionComplete:false}, {product:req.data.product._id, merchant:req.user._id, paymentStatus:false}]}).then((transactions)=>{
        if (!transactions) {
			const err = {status:404, message:"No transactions listed yet."}
			return res.status(404).send(err);
        }else{
                req.data.transactions = transactions;
            res.status(200).send(req.data);
        }
    }).catch((e)=>{
		let err ={}
		if(e.errors) {err = {status:403, message:e.errors}}
		else if(e){err = {status:403, message:e}}
		res.status(404).send(err);
	});
}