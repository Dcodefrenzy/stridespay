const products = require("./productModel");
const {ObjectID} = require("mongodb");

exports.createProduct=(req, res, next)=>{
    const isMerchant = req.body.isMerchant?true:false;
     product = new products({
        product:req.body.product,
        price:req.body.price+"00",
        isMerchant:isMerchant,
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

            const newproduct = {status:201, product:product.product, price:product.price,  productId:product._id, _id:req.user._id};
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
        price:req.body.price+"00",
        isMerchant:req.data.isMerchant,
        display:true,
        user:req.data._id,
        dateCreated:new Date(),
    });

    product.save().then((product)=>{
          console.log(product)
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
    products.find().then(products=>res.status(200).send({status:200, products:products}));
}

exports.findUserProducts = (req, res)=>{
    products.find({user:req.user._id}).then((products)=>{
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
    products.findOne({_id:req.params.id, isMerchant:true}).then((product)=>{
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
    products.findOne({_id:req.params.id, isMerchant:false}).then((product)=>{
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

exports.findProductById= (req, res, next)=>{
    products.findOne({_id:req.params.id, user:req.user._id}).then((product)=>{
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

