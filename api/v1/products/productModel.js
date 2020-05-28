const mongoose = require("mongoose");

ProductSchema = mongoose.Schema({
		product:{
            type:String,
            required:true,
        },
        price:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:false,
        },
        display:{
            type:Boolean,
            required:true,
        },
        user:{
			type: mongoose.Schema.Types.ObjectId,
			required:true,
			trim:true,
        },
        isMerchant:{
            type:Boolean,
            required:true,
        },
        isService:{
            type:Boolean,
            required:false,
        },
        dateCreated:{
            type: String,
            required: true,
        },
});


var products = mongoose.model("productSchema", ProductSchema );
module.exports = products;