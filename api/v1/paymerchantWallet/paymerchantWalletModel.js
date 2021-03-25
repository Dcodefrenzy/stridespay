const mongoose = require("mongoose");

PaymerchantWalletsSchema = mongoose.Schema({
		transaction:{
            type:String,
            required:true,
        },
        currency:{
            type:String,
        },
        user:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        userPayment:{
            type:Number,
            required:true,
        },
        totalPayment:{
            type:Number,
            required:true,
        },
        paymerchantAmount:{
            type:Number,
            required:true,
        },
        dateCreated:{
            type: String,
            required:true,
        },
});


var PaymerchantWallets = mongoose.model("PaymerchantWallets", PaymerchantWalletsSchema);
module.exports = {PaymerchantWallets};