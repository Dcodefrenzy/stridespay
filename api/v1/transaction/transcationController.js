const {transactions} = require("./transactionModel.js");
const {ObjectID} = require("mongodb");



exports.createBuyerTransactions=(req, res, next)=>{
    console.log(req.body.transaction)
    transactions.findOneAndUpdate({_id:req.body.transaction}, {$set:{paymentStatus:true,buyer:req.user._id}}, {new: true}).then((transaction)=>{
        if (transaction) {
            req.data.transaction = transaction;
            req.data.redirect = "/users/transactions";
            //console.log(transaction)
            next();
        }else{
           // console.log('checked')
           caddNewTransaction(req, res, next); 
        }
    })
}
const caddNewTransaction=(req, res, next)=>{
    transaction = new transactions({
        buyer:req.user._id,
        product:req.data.product._id,
        creator:req.user.name,
        productName:req.data.product.product,
        paymentStatus:req.data.paymentStatus,
        milestones:req.data.milestones,
        price:req.data.product.price,
        balance:req.data.product.price,
        paymentReference:req.body.reference,
        withdrawn:0,
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

exports.createNewMerchantTransactions=(req, res, next)=>{
         console.log(req.data.product)

        transaction = new transactions({
        merchant:req.user._id,
        creator:req.user.name,
        productName:req.data.product.product,
        product:req.data.product._id,
        paymentStatus:false,
        price:req.data.product.price,
        balance:req.data.product.price,
        milestones:req.data.milestones,
        withdrawn:0,
        transactionStart:true,
        dateCreated:new Date(),
    });
        console.log(transaction)
    transaction.save().then((transaction)=>{
        console.log(transaction)
        if (!transaction) {
            const err = {status:404, message:"unable to add create transaction."}
            console.log(err)
            return res.status(404).send(err);
            
        }else{          
            req.data.transaction = transaction;
            req.data._id = req.user._id;
            req.data.loggerUser = "User";
            req.data.logsDescription = "User Registration Was Successful";
            req.data.title = "Register";
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

exports.createMerchantTransactions=(req, res, next)=>{
    if (req.data.isMerchant || req.data.product.isMerchant === true) {
         console.log(req.data.product)
        const user = req.user?req.user._id:req.data._id;
        const username = req.user?req.user.name:req.data.name;

        transaction = new transactions({
        merchant:user,
        creator:username,
        productName:req.data.product.product||req.data.product,
        product:req.data.product._id||req.data.productId,
        paymentStatus:false,
        price:req.data.price,
        withdrawn:0,
        balance:req.data.price,
        milestones:req.data.milestones,
        transactionStart:true,
        dateCreated:new Date(),
    });
        console.log(transaction)
    transaction.save().then((transaction)=>{
        console.log(transaction)
        if (!transaction) {
            const err = {status:404, message:"unable to add create transaction."}
            console.log(err)
            return res.status(404).send(err);
            
        }else{          
            req.data.transaction = transaction;
            next();
        }
    }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });

    }else{
        next();
    }
    
}


exports.findOneTransactionById = (req, res)=>{
    transactions.findById(req.params.id).then((transaction)=>{
        res.status(200).send({status:200,transaction:transaction});
    })
}

exports.findTransactionById= (req, res)=>{
    transactions.find({$or: [ {product:req.data.product._id, buyer:req.user._id, transactionStart:false, transactionComplete:false}, {product:req.data.product._id, merchant:req.user._id, paymentStatus:false}]},  null, {sort: {_id: -1}}).then((transactions)=>{
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

exports.checkOngoingTransaction =(req, res, next)=>{
    transactions.findOne({_id:req.params.id, transactionStart:false}).then((transaction)=>{
        if (!transaction) {
            const err = {status:404, message:"This Transaction no longer exist or has been giving to another merchant please contact your Client."}
            return res.status(404).send(err);
        }else{
            next();
        }
    })
}
exports.startTransaction =(req, res, next)=>{
    transactions.findByIdAndUpdate(req.params.id, {$set: {transactionStart:true, merchant:req.user._id}}, {new: true}).then((transaction)=>{
        if (!transactions) {
            const err = {status:404, message:"No transactions listed yet."}
            return res.status(404).send(err);
        }else{
            const newTransaction = {
                                        _id : req.user._id,
                                        transaction:transaction._id,
                                        productName:transaction.productName,
                                        milestones:transaction.milestones,
                                        price:transaction.price,
                                        paymentStatus:transaction.paymentStatus,
                                        balance:transaction.balance,
                                        withdrawn:transaction.withdrawn, 
                                        userId:transaction.buyer,
                                        title:"Transaction",
                                        link:"https://paymerchant.co/users/login",
                                        mailTitle:"Transaction Notification",
                                        mailMessage:"Transaction for your request -"+transaction.productName+" has started by"+req.user.name    
                                     }
           
           req.data = newTransaction;
            req.data.mailMessage = 
                next();
        }
    }).catch((e)=>{
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });

}

exports.fetchUsersTransactions =(req, res, next)=>{
    transactions.find({$or: [ {buyer:req.user._id,transactionStart:true}, {merchant:req.user._id, paymentStatus:true}]}, null, {sort: {_id: -1}}).then((transactions)=>{
        if (!transactions) {
            const err = {status:404, message:"No Transactions Found."}
            return res.status(404).send(err);
        }else{
            res.status(200).send({status:200,transactions:transactions});
        }
    }).catch((e)=>{
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}


exports.fetchUserTransactionById =(req, res, next)=>{
    console.log(req.params._id)
    transactions.findOne({$or: [ {buyer:req.user._id, _id:req.params.id}, {merchant:req.user._id, _id:req.params.id}]}).then((transaction)=>{
        if (!transaction) {
            const err = {status:404, message:"No Transaction Found."}
            return res.status(404).send(err);
        }else{
            res.status(200).send({status:200,transaction:transaction});
        }
    }).catch((e)=>{
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}


exports.merchantUpdateMilestones =(req, res, next)=>{
 
    transactions.findOneAndUpdate({"_id":req.body.id, "merchant":req.user._id, "milestones._id":req.body.milestoneId}, {$set:{"milestones.$.merchant":true}}, {new: true}).then((transaction)=>{
 
        if (!transaction) {
            const err = {status:404, message:"No Transaction Found."}
            return res.status(404).send(err);
        }else{
            const newTransaction = {
                                        _id : req.user._id,
                                        transaction:transaction._id,
                                        productName:transaction.productName,
                                        milestones:transaction.milestones,
                                        price:transaction.price,
                                        paymentStatus:transaction.paymentStatus,
                                        balance:transaction.balance,
                                        withdrawn:transaction.withdrawn, 
                                        userId:transaction.merchant,
                                        title:"Transaction",
                                        link:"https://paymerchant.co/users/login",
                                        mailTitle:"Transaction Notification",
                                        mailMessage:"A milestone for your transaction -"+transaction.productName+" has been completed by"+req.user.name+" please verify and payout to merchant.",
                                }
           req.data = newTransaction;
 
 
        }
                  next()
    }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}


exports.updateBuyerWithdraw  = (req, res, next)=>{
    const balance = req.data.balance === 0 || req.data.balance < 0 ? 0 : req.data.balance === undefined? req.data.price - req.data.milestones[req.body.index].price:req.data.balance - req.data.milestones[req.body.index].price;
    const payout = req.data.withdrawn !== undefined && req.data.price === req.data.withdrawn? req.data.withdrawn  : req.data.withdrawn=== undefined? 0+ req.data.milestones[req.body.index].price : req.data.withdrawn +req.data.milestones[req.body.index].price;
    const transactionEnd = balance === 0 ?true:false;
    console.log({"price":req.data.milestones[req.body.index].price})
    transactions.findOneAndUpdate({"_id":req.body.id, "buyer":req.user._id,}, {$set: {transactionComplete:transactionEnd, balance:balance, withdrawn:payout}}).then((transaction)=>{
        if (transaction) {
            next()
        }
    })
}
 exports.buyerUpdateMilestones =(req, res, next)=>{
    transactions.findOneAndUpdate({"_id":req.body.id, "buyer":req.user._id, "milestones._id":req.body.milestoneId}, {$set:{"milestones.$.buyer":true}}, {new: true}).then((transaction)=>{
    console.log(transaction)
        if (!transaction) {
            const err = {status:404, message:"No Transaction Found."}
            return res.status(404).send(err);
        }else{            const newTransaction = {
                                        _id : req.user._id,
                                        transaction:transaction._id,
                                        productName:transaction.productName,
                                        milestones:transaction.milestones,
                                        price:transaction.price,
                                        paymentStatus:transaction.paymentStatus,
                                        balance:transaction.balance,
                                        withdrawn:transaction.withdrawn, 
                                        userId:transaction.buyer,
                                        title:"Transaction",
                                        link:"https://paymerchant.co/users/login",
                                        mailTitle:"Transaction Notification",
                                        mailMessage: "A milestone for your transaction -"+transaction.productName+" has been completed by"+req.user.name+" please verify and payout to merchant.",
                             }
                             req.data = newTransaction;
                      next()
        }
    }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}