const mongoose = require("mongoose");

PaymentSchema = mongoose.Schema({
		createdBy:{
            type:String,
            required:true,
        },
        transaction:{
            type:String,
            required:true,
        },
        currency:{
            type:String,
        },
        paymentStatus:{
            type:Boolean,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        dateCreated:{
            type: String,
            required:true,
        },
});


var payments = mongoose.model("payments", PaymentSchema );
module.exports = {payments};