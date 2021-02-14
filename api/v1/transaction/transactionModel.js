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
        description:{
            type:String,
             required:false,
        },
        paymentStatus:{
            type:Boolean,
            required:false,
        },
        creator:{
            type:String,
            required:true,
        },
        productName:{
            type:String,        
            required:true,
        },
        milestones:[{
            milestone:{
                type:String,
                required:true,
            },
            description:{
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
        milestoneComplete:{
            type:Number,
            default:0,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        balance:{
            type:Number,
        },
        withdrawn:{
            type:Number,
            required:false,
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
        isService:{
            type:Boolean,
            require:true,
        },
        dateCreated:{
			type: String,
			required: true,
        },
});


var transactions = mongoose.model("transactions", TransactionsSchema );
module.exports = {transactions};