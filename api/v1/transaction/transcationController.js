const {transactions} = require("./transactionModel.js");
const {ObjectID} = require("mongodb");



exports.createBuyerTransactions=(req, res, next)=>{
    console.log(req.body.transaction)
    transactions.findOneAndUpdate({_id:req.body.transaction}, {$set:{paymentStatus:true,buyer:req.user._id}}, {new: true}).then((transaction)=>{
        if (transaction) {
            req.data.transaction = transaction;
            req.data.redirect = "/users/transaction/"+transaction._id;
            //console.log(transaction)
            next();
        }else{
           // console.log('checked')
           addNewTransaction(req, res, next); 
        }
    })
}
const addNewTransaction=(req, res, next)=>{
    transaction = new transactions({
        buyer:req.user._id,
        product:req.data.product._id,
        creator:req.user.name,
        productName:req.data.product.product,
        currency:req.data.currency,
        description:req.data.product.description,
        paymentStatus:req.data.paymentStatus,
        milestones:req.data.milestones,
        price:req.data.product.price,
        balance:req.data.product.price,
        paymentReference:req.body.reference,
        withdrawn:0,
        isService:false,
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
        description:req.data.product.description,
        product:req.data.product._id,
        currency:req.data.product.currency,
        paymentStatus:false,
        price:req.data.product.price,
        balance:req.data.product.price,
        milestones:req.data.milestones,
        withdrawn:0,
        isService:false,
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
         
        const user = req.user?req.user._id:req.data._id;
        const username = req.user?req.user.name:req.data.name;

    console.log({"reansact":req.data})
        transaction = new transactions({
        merchant:user,
        creator:username,
        productName:req.data.product.product||req.data.product,
        product:req.data.product._id||req.data.productId,
        description:req.data.description,
        paymentStatus:false,
        price:req.data.price,
        currency:req.data.currency,
        withdrawn:0,
        isService:false,
        balance:req.data.price,
        milestones:req.data.milestones,
        transactionStart:true,
        dateCreated:new Date(),
    });
        
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



exports.readTransactionById = (req, res)=>{

    transactions.findById({_id:req.params.id, transactionStart:false, transactionComplete:false}).then((transaction)=>{
        if (!transaction) {
            const err = {status:403, message:"This transaction has either been used and do not exist anymore."}
            return res.status(403).send(err);
        }
           
        res.status(200).send({status:200,transaction:transaction, user:req.user});
    }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });

}

exports.deleteTransactionById = (req, res, next)=>{
      transactions.findByIdAndDelete({_id:req.params.id, transactionStart:false, transactionComplete:false}).then((transaction)=>{
        if (!transaction) {
            const err = {status:403, message:{message:"This transaction has either been used and do not exist anymore."} }
            console.log(err)
            return res.status(403).send(err);
        }
            req.data = {status:200,transaction:transaction};
            req.data._id = req.user._id;
            req.data.loggerUser = "User";
            req.data.logsDescription = "Transaction was deleted";
                req.data.title = "Transactions";
                next();
        }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}

exports.findTransactionForPayment = (req, res, next)=>{

    transactions.findById({_id:req.params.id, paymentStatus:false}).then((transaction)=>{
        if (!transaction) {
            const err = {status:403, message:"This transaction Do not exist anymore."}
            return res.status(403).send(err);
        }
            
            req.data = {status:201,transaction:transaction, user:req.user};
            next();
    }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });

}

exports.findOneTransactionMilestone=(req, res)=>{
    const _id= req.params.id;
    const milestoneId = req.params.milestoneId;
    console.log(_id)
    console.log(milestoneId)
    transactions.findOne({"_id":_id, 'paymentStatus':false, "milestones._id":milestoneId}).then((transactionMilestone)=>{        
    if (!transactionMilestone) {
        res.status(404).send({status:404,message:"No transaction milestone with this ID"});  
    }
   
        const transaction = {status:200, transactionMilestone:transactionMilestone};
        res.status(200).send(transaction);
    
    }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(403).send(err);
    });
    
}


exports.editTransactionMilestone=(req, res, next)=>{
    const _id= req.params.id;
    const milestoneId = req.params.milestoneId;
    const price  = req.body.price+"00"
    console.log(_id)
    console.log(price)
    transactions.findOneAndUpdate({"_id":_id, "milestones._id":milestoneId}, {$set: {'milestones.$.milestone':req.body.title, 'milestones.$.description':req.body.description, 'milestones.$.price':price}}, {new: true}).then((transactionMilestone)=>{        
    if (!transactionMilestone) {
        res.status(404).send({status:404,message:"No transaction milestone with this ID"});  
    }
        const newTransaction = {status:201, transactionMilestone:transactionMilestone, milestones:transactionMilestone.milestones, _id:req.user._id};
        console.log(newTransaction.transactionMilestone.milestones)
         req.data = newTransaction;
        req.data = newTransaction;
        req.data.loggerUser = "Admin";
        req.data.logsDescription = "Transaction milestone updated.";
        req.data.title = "Transaction";
        next();
    }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(403).send(err);
    });
    
}



 exports.updateTransactionPrice = async(req, res, next)=>{
        const sum = req.data.transactionMilestone.milestones.map((milestone)=>{
                let price  =+ milestone.price;
                return price;
        }).reduce((total, amount) => total + amount); 
        transactions.findOneAndUpdate({_id:req.data.transactionMilestone._id}, {$set: {price:sum, balance:sum}}).then((transaction)=>{
            console.log(transaction);
            next();
        })
}

exports.updateUserTransaction = (req, res, next)=>{
    console.log(req.body)
    transactions.findOneAndUpdate({_id:req.params.id, paymentStatus:false}, {$set:{productName:req.body.service, currency:req.body.currency, description:req.body.description}}, {new: true}).then((transaction)=>{
            if (!transaction) {
            const err = {status:403, message:"This transaction has either been paid for and do not exist anymore for editing."}
            return res.status(403).send(err);
            }else if (transaction) {
                            const transactionData = {status:201, transaction:transaction, _id:req.user._id};
            req.data = transactionData;
            req.data.loggerUser = "User";
            req.data.logsDescription = `You edited your contract with the title ${req.body.service}`;
            req.data.title = "Contract";
            next();

            }
    })
}
exports.findOneTransactionById = (req, res, next)=>{
    transactions.findOne({_id:req.params.id, transactionComplete:false}).then((transaction)=>{
        if (!transaction) {
            const err = {status:403, message:"This transaction has either been used and do not exist anymore."}
            return res.status(403).send(err);
        }else if (transaction.paymentStatus === true) {
            const err = {status:403, message:"This transaction has either been used and do not exist anymore."}
            return res.status(403).send(err);
        }

        req.data = {status:200, transaction:transaction};
        next()/*
        res.status(200).send({status:200,transaction:transaction, user:req.user});*/
    }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}

exports.findOneTransactionByIdForPayment = (req, res)=>{
    transactions.findOne({_id:req.params.id,  paymentStatus:false}).then((transaction)=>{
        if (!transaction) {
            const err = {status:403, message:"This transaction has either been used and do not exist anymore."}
            return res.status(403).send(err);
        }
       
        if (req.user._id == transaction.merchant) {
            const err = {status:403, message:"This transaction Do not exist for you, As you are the user"}
            return res.status(403).send(err);
        }else{
        res.status(200).send({status:200,transaction:transaction, user:req.data });
        }
    }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}

exports.findOneTransactionByIdForEdit = (req, res)=>{
    console.log(req.params)
    transactions.findOne({_id:req.params.id,  paymentStatus:false}).then((transaction)=>{
        if (!transaction) {
            const err = {status:403, message:"This transaction has either been used and do not exist anymore."}
            return res.status(403).send(err);
        }
        //console.log(transaction)
        if (req.user._id != transaction.merchant) {
            console.log('elseIF')
            const err = {status:403, message:"You cannot edit this contract"}
            return res.status(403).send(err);
        }else{
            console.log('else')
        res.status(200).send({status:200,transaction:transaction, user:req.user});
        }
    }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}


exports.findServiceTransactionById= (req, res)=>{
    transactions.find({$or: [ {product:req.data.service._id, buyer:req.user._id, transactionStart:false, transactionComplete:false}, {product:req.data.service._id, merchant:req.user._id, paymentStatus:false}]},  null, {sort: {_id: -1}}).then((transactions)=>{
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

exports.findUserClients=(req, res)=>{

    transactions.find({merchant:req.user._id, buyer:req.params.id}).then((transactions)=>{
   
        if (!transactions) {
            const err = {status:404, message:"No transactions listed yet."}
            return res.status(404).send(err);
        }else{
            req.data.transactions = transactions;
            res.status(200).send({status:200,data:req.data});
        }
    }).catch((e)=>{
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
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
                                        description:transaction.description,
                                        milestones:transaction.milestones,
                                        price:transaction.price,
                                        paymentStatus:transaction.paymentStatus,
                                        balance:transaction.balance,
                                        withdrawn:transaction.withdrawn, 
                                        userId:transaction.buyer,
                                        isService:transaction.isService,
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

exports.fetchUsersTransactionsForProfile =(req, res, next)=>{
    transactions.find({merchant:req.user._id, paymentStatus:true}, null, {sort: {_id: -1}}).then((transactions)=>{
        if (!transactions) {
            const err = {status:404, message:"No Transactions Found."}
            return res.status(404).send(err);
        }else{
            if (req.data) {
            req.data.transactions = transactions;
            }else{
            req.data = transactions;
            }
            next();
        }
    }).catch((e)=>{
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}


exports.fetchUserTransactionById =(req, res, next)=>{

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

const getMilestonesNumbers=(id)=>{
    console.log(id)
    transactions.findById({"_id":id}).then((transaction)=>{
        console.log({"410":transaction.milestoneComplete})

    return updateMilestoneNumbers(id, transaction.milestoneComplete + 1);
    
    })
}

const updateMilestoneNumbers=(id, numb)=>{
    console.log({"numb":numb})
    transactions.findByIdAndUpdate({_id:id}, {$set:{milestoneComplete:numb}}, {new: true}).then((trans)=>{
        console.log(trans)
        return trans;
    });
}
exports.merchantUpdateMilestones =(req, res, next)=>{
    const milestoneCompleteNumber = getMilestonesNumbers(req.body.id);

    transactions.findOneAndUpdate({"_id":req.body.id, "merchant":req.user._id, "milestones._id":req.body.milestoneId}, {$set:{"milestones.$.merchant":true}}, {new: true}).then((transaction)=>{
 
        if (!transaction) {
            const err = {status:404, message:"No Transaction Found."}
            return res.status(404).send(err);
        }else{
            const newTransaction = {
                                        _id : req.user._id,
                                        transaction:transaction._id,
                                        isService:transaction.isService,
                                        productName:transaction.productName,
                                        description:transaction.description,
                                        milestones:transaction.milestones,
                                        price:transaction.price,
                                        paymentStatus:transaction.paymentStatus,
                                        balance:transaction.balance,
                                        withdrawn:transaction.withdrawn, 
                                        userId:transaction.buyer,
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
const returnInteger = (number)=>{
return parseInt(number);
}

exports.checkBuyerWithdrawForChanges= (req, res, next)=>{
    transactions.findOne({"_id":req.body.id, "buyer":req.user._id, "milestones._id":req.body.milestoneId}).then((transaction)=>{
        if (transaction) {
            if (transaction.milestones[req.body.index].buyer === true) {
            const err = {status:403, message:"You have already settled this transaction."}
            console.log(err);
             res.status(403).send(err);
            }else{
                next();
            }
        }
    })
}
exports.updateBuyerWithdraw  = (req, res, next)=>{
    const totalBalance =  returnInteger(req.data.balance);
    const totalMilestonePrrie = returnInteger(req.data.milestones[req.body.index].price);
    const balance =  totalBalance - totalMilestonePrrie;
    const payout =  returnInteger(req.data.withdrawn) + returnInteger(req.data.milestones[req.body.index].price);
    const transactionEnd = balance === 0 ?true:false;
    console.log({"payout":payout})
    console.log({"balance":balance})
    transactions.findOneAndUpdate({"_id":req.body.id, "buyer":req.user._id,}, {$set: {transactionComplete:transactionEnd, balance:balance, withdrawn:payout}}).then((transaction)=>{
        if (transaction) {
            next()
        }
    })
}
 exports.buyerUpdateMilestones =(req, res, next)=>{
    transactions.findOneAndUpdate({"_id":req.body.id, "buyer":req.user._id, "milestones._id":req.body.milestoneId}, {$set:{"milestones.$.buyer":true}}, {new: true}).then((transaction)=>{

        if (!transaction) {
            const err = {status:404, message:"No Transaction Found."}
            return res.status(404).send(err);
        }else{            const newTransaction = {
                                        _id : req.user._id,
                                        transaction:transaction._id,
                                        currency:transaction.currency,
                                        productName:transaction.productName,
                                        description:transaction.description,
                                        milestones:transaction.milestones,
                                        price:transaction.price,
                                        merchant:transaction.merchant,
                                        paymentStatus:transaction.paymentStatus,
                                        balance:transaction.balance,
                                        withdrawn:transaction.withdrawn, 
                                        userId:transaction.merchant,
                                        isService:transaction.isService,
                                        title:"Transaction",
                                        link:"https://paymerchant.co/users/login",
                                        mailTitle:"Transaction Notification",
                                        mailMessage: "A milestone for your transaction -"+transaction.productName+" has been completed by"+req.user.name+" please verify and payout to merchant.",
                             }
                             req.data = newTransaction;
                             //console.log(req.data)
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

exports.CreateTransactionForFreelancers = (req, res, next)=>{
             console.log(req.data.product)

        transaction = new transactions({
        merchant:req.user._id,
        creator:req.user.name,
        productName:req.data.service.product,
        description:req.data.service.description,
        product:req.data.service._id,
        paymentStatus:false,
        currency:req.data.currency,
        price:req.data.service.price,
        balance:req.data.service.price,
        milestones:req.data.milestones,
        withdrawn:0,
        isService:true,
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
            req.status = 201;
            req.data.redirect = "/users/services/token/"+transaction._id;
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

exports.getUserFinancies=(req, res, next)=>{
        transactions.find({merchant:req.user._id, transactionComplete:true}).then((transactions)=>{
        req.data.transactions = transactions;
        res.status(200).send(req.data);
    }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}

exports.updateC = (req, res, next)=>{
    transactions.updateMany({merchant:req.user._id, currency:undefined}, {$set: {currency:"NGN"}}).then((transaction)=>{
        console.log(transaction)
    next();
    })
}


exports.getUserFinanciesByCurrency=(req, res, next)=>{
        transactions.find({merchant:req.user._id, transactionComplete:true, currency:req.body.currency}).then((transactions)=>{
        req.data.transactions = transactions;
        res.status(200).send(req.data);
    }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}

exports.getAllTransactions= (req, res)=>{
    transactions.find({merchant:req.user._id, transactionComplete:false, paymentStatus:false}).then((transactions)=>{
            res.status(200).send({status:200,transactions:transactions});
    }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}