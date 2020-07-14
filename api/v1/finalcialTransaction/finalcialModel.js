const mongoose = require("mongoose");

FinalcialsSchema = mongoose.Schema({
		from:{
            type:String,
            required:false,
        },
        to:{
            type:String,
            required:false,
        },
        transaction:{
            type:String,
            required:true,
        },
        paymentStatus:{
            type:Boolean,
            required:false,
        },
        amount:{
            type:Number,
            required:true,
        },
        paymentDescription:{
            type: String,
            required:true,
        },
        dateCreated:{
			type: String,
			required: true,
        },
});


var finalcials = mongoose.model("finalcials", FinalcialsSchema );
module.exports = {finalcials};