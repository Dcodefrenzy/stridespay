const mongoose = require("mongoose");

PremiumSchema = mongoose.Schema({
        user:{
            type:String,
            required:true,
        },
        premiumType:{
            type:String,
            required:true,
        },
        premiumPrice:{
            type:Number,
            required:true,
        },
        count:{
            type:Number,
            required:false,
        },
        startDate:{
            type:String,
            required:false,
        },
        endDate:{
            type:String,
            required:false,
        },
        status:{
            type:Boolean,
            required:false,
        },
        isCoupon:{
            type:Boolean,
            required:true,
        },
        dateCreated:{
            type: String,
            required: true,
        },
});


var premium = mongoose.model("premium", PremiumSchema );
module.exports = {premium};