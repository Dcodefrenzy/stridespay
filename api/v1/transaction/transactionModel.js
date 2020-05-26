const mongoose = require("mongoose");

TransactionsSchema = mongoose.Schema({
		buyer:{
            type:String,
            required:false,
        },
        merchant:{
            type:String,
            required:false,
        },
        product:{
            type:String,
            required:true,
        },
        paymentStatus:{
            type:Boolean,
            required:false,
        },
        milestones:[{
            milestone:{
                type:String,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            },
            merchant:{
                type:Boolean,
                default:false,
            },
            buyer:{
                type:Boolean,
                default:false,
            },
        }],
        price:{
            type:Number,
            required:true,
        },
        paymentReference:{
            type:String,
            required:false
        },
        transactionStart:{
            type:Boolean,
            required:false,
            default:false,
        },
        transactionComplete:{
            type:Boolean,
            required:false,
            default:false,
        },
        dateCreated:{
			type: String,
			required: true,
        },
});


var transactions = mongoose.model("transactions", TransactionsSchema );
module.exports = {transactions};