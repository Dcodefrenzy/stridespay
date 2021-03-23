const mongoose = require("mongoose");

ProductSchema = mongoose.Schema({
		product:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        currency:{
            type:String,
            required:false,
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
            default:false,
        },
        delete:{
            type:Boolean,
            required:true,
            default:false,
        },
        dateCreated:{
            type: String,
            required: true,
        },
        dateUpdated:{
            type:String,
            required:false,
        },
        dateDeleted:{
            type:String,
            required:false,
        },

});


var products = mongoose.model("productSchema", ProductSchema );
module.exports = products;