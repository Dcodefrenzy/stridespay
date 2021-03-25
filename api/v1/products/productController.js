const products = require("./productModel");
const {ObjectID} = require("mongodb");

exports.createProduct=(req, res, next)=>{
    const isMerchant = req.body.isMerchant?true:false;
     product = new products({
        product:req.body.product,
        description:req.body.description,
        price:req.body.price+"00",
        isMerchant:isMerchant,
        currency:req.body.currency,
        display:true,
        user:req.user._id,
        dateCreated:new Date(),
    });

    product.save().then((product)=>{
          console.log(product)
        if (!product) {
            const err = {status:404, message:"unable to add product."}
            console.log(err)
            return res.status(404).send(err);
            
        }else{  

            const newproduct = {status:201, product:product.product, currency:product.currency, price:product.price, isMerchant:product.isMerchant,description:product.description,  productId:product._id, _id:req.user._id};
            req.data = newproduct;
            req.data.loggerUser = "User";
            req.data.logsDescription = "You created a product token.";
            req.data.title = "Product";
            if (product.isMerchant === true) {
                req.data.redirect = "/users/products/"+product._id;
            }else{
                req.data.redirect = "/users/product/payment/"+product._id;
            }       
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
exports.addProduct=(req, res, next)=>{
  
    product = new products({
        product:req.body.product,
        description:req.body.description,
        price:req.body.price+"00",
        isMerchant:req.data.isMerchant,
        display:true,
        currency:req.body.currency,
        user:req.data._id,
        dateCreated:new Date(),
    });

    product.save().then((product)=>{
          
        if (!product) {
			const err = {status:404, message:"unable to add product."}
			console.log(err)
			return res.status(404).send(err);
            
        }else{	
        if (product.isMerchant === true) {
            req.data.redirect = "/users/products/"+product._id;
        }else{
            req.data.redirect = "/users/product/payment/"+product._id;
        }		
			req.data.productId = product._id;
            req.data.price = product.price;
            req.data.product = product.product;
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

exports.ViewAllProducts = (req, res)=>{
    products.find(null, {sort: {_id: -1}}).then(products=>res.status(200).send({status:200, products:products}));
}

exports.findUserProducts = (req, res)=>{
    products.find({user:req.user._id, /*delete:false*/}, null, {sort: {_id: -1}}).then((products)=>{
        if (!products) {
			const err = {status:404, message:"No product listed yet."}
			return res.status(404).send(err);
        }else{
            res.status(200).send({status:200, products:products});
        }
    }).catch((e)=>{
		let err ={}
		if(e.errors) {err = {status:403, message:e.errors}}
		else if(e){err = {status:403, message:e}}
		res.status(404).send(err);
	});
}

exports.findBuyersProductById= (req, res, next)=>{
    console.log(req.params.id)
    products.findOne({_id:req.params.id, isMerchant:true, isService:false, /*delete:false*/}).then((product)=>{
        if (!product) {
			const err = {status:404, message:"No product listed yet."}
			return res.status(404).send(err);
        }else{
            req.data = {status:200, product:product, user:req.user};
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

exports.findMerchantProductById= (req, res, next)=>{
    products.findOne({_id:req.params.id, isMerchant:false, isService:false, /*delete:false*/}).then((product)=>{
        if (!product) {
            const err = {status:404, message:"No product listed yet."}
            return res.status(404).send(err);
        }else{
            req.data = {status:200, transaction:product, product:product, user:req.user};
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



exports.findProductById= (req, res, next)=>{

    products.findOne({_id:req.params.id, user:req.user._id}).then((product)=>{
console.log('here products id')
        if (!product) {
            const err = {status:404, message:"No product listed yet."}
            return res.status(404).send(err);
        }else{
            req.data = {status:200, product:product, user:req.user};
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


exports.createService=(req, res, next)=>{
     product = new products({
        product:req.body.service,
        description:req.body.description,
        price:"000",
        isMerchant:true,
        display:true,
        currency:req.body.currency,
        user:req.user._id,
        isService:true,
        dateCreated:new Date(),
    });

    product.save().then((product)=>{
          console.log(product)
        if (!product) {
            const err = {status:404, message:"unable to add product."}
            console.log(err)
            return res.status(404).send(err);
            
        }else{  

            const newproduct = {status:201, product:product.product, price:product.price, isMerchant:product.isMerchant,  productId:product._id, _id:req.user._id};
            req.data = newproduct;
            req.data.loggerUser = "User";
            req.data.logsDescription = "You created a service.";
            req.data.title = "Service";
            if (product.isMerchant === true) {
                req.data.redirect = "/users/services/"+product._id;
            }else{
                req.data.redirect = "/users/services/payment/"+product._id;
            }       
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

exports.updateServicePrice=(req, res, next)=>{
    products.findOneAndUpdate({_id:req.data.service._id}, {$set:{price:req.data.updatePrice}}).then((service)=>{
        next();
    })
}
exports.findUserServices = (req, res)=>{
    console.log(req.user._id)
    products.find({user:req.user._id, isService:true, /*delete:false*/}, null, {sort: {_id: -1}}).then((products)=>{
        if (!products) {
            const err = {status:404, message:"No Service Created yet."}
            return res.status(404).send(err);
        }else{
            res.status(200).send({status:200, products:products});
        }
    }).catch((e)=>{
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}


exports.findUserServiceById = (req, res, next)=>{
    products.findOne({user:req.user._id, _id:req.params.id, isService:true, /*delete:false*/}).then((service)=>{
        if (!service) {
            const err = {status:404, message:`Could not find a service with the id ${req.params.id}`}
            return res.status(404).send(err);
        }else{
            req.data = {status:200, service:service, user:req.user};
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


        
exports.updateUserServiceById = (req, res, next)=>{
    products.findOneAndUpdate({user:req.user._id, _id:req.params.id, isService:true}, {$set: {product:req.body.title, description:req.body.description, currency:req.body.currency,  dateUpdated: new Date()}}).then((product)=>{
        if (!product) {
            const err = {status:404, message:"No Service Created yet."}
            return res.status(404).send(err);
        }else{
            const newproduct = {status:201, product:product.product, productId:product._id, _id:req.user._id};
            req.data = newproduct;
            req.data.loggerUser = "User";
            req.data.logsDescription = "You updated a service.";
            req.data.title = "Service";
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
exports.deleteUserServiceById = (req, res, next)=>{
    products.findOneAndUpdate({user:req.user._id, _id:req.params.id, isService:true}, {$set:{delete:true,dateDeleted:new Date()}}).then((service)=>{
                if (!service) {
            const err = {status:403, message:{message:"This Service has either been deleted."} }
            console.log(err)
            return res.status(403).send(err);
        }
            req.data = {status:200,service:service};
            req.data._id = req.user._id;
            req.data.loggerUser = "User";
            req.data.logsDescription = "A Service was deleted by you";
                req.data.title = "Service";
                next();
        }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}


exports.updateProductById = (req, res,next)=>{
    product = new products({
        product:req.body.title,
        description:req.body.description,
        price:req.body.price
    });

    products.findOneAndUpdate({user:req.user._id, _id:req.params.id, isService:false}, {$set: {product:product.product, currency:req.body.currency, description:product.description, price:product.price+"00", dateUpdated:new Date()}}).then((product)=>{
        if (!product) {
            const err = {status:404, message:"Unable to update product."}
            return res.status(404).send(err);
        }else{
            req.data = {status:201,product:product};
            req.data.loggerUser = "User";
            req.data._id = req.user._id;
            req.data.logsDescription = "You Updated a product information.";
            req.data.title = "Product";
      
            next();
        }
    }).catch((e)=>{
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}

exports.deleteProductById=(req, res, next)=>{
    console.log(req.params.id)
        products.findOneAndUpdate({user:req.user._id, _id:req.params.id, isService:false}, {$set:{delete:true,dateDeleted:new Date()}}).then((product)=>{
                if (!product) {
            const err = {status:403, message:{message:"This Product has either been deleted."} }
            console.log(err)
            return res.status(403).send(err);
        }
            req.data = {status:200,product:product};
            req.data._id = req.user._id;
            req.data.loggerUser = "User";
            req.data.logsDescription = "A product was deleted by you";
                req.data.title = "Product";
                next();
        }).catch((e)=>{
        console.log(e)
        let err ={}
        if(e.errors) {err = {status:403, message:e.errors}}
        else if(e){err = {status:403, message:e}}
        res.status(404).send(err);
    });
}

exports.updateC = (req, res, next)=>{
    products.updateMany({user:req.user._id, currency:undefined}, {$set: {currency:"NGN"}}).then((product)=>{
        console.log('products')
        console.log({"product":product})
    next();
    })
}