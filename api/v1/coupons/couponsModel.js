const mongoose = require("mongoose");

CouponsSchema = mongoose.Schema({
        couponType:{
            type:String,
            required:true,
        },
        couponPrice:{
            type:Number,
            required:true,
        },
        amount:{
            type:Number,
            required:false,
        },
        isEnded:{
            type:Boolean,
            required:true,
        },
        dateCreated:{
			type: String,
			required: true,
        },
});


var coupons = mongoose.model("coupons", CouponsSchema );
module.exports = {coupons};