const mongoose = require("mongoose");

WithdrawsSchema = mongoose.Schema({
		user:{
            type:String,
            required:true,
        },
        amount:{
            type:Number,
            required:true,
        },
        recipient:{
            type:String,
            required:false,
        },
        transferId:{
            type:String,
            required:false,
        },
        reference:{
            type:String,
            required:false,
        },
        dateCreated:{
            type: String,
            required:true,
        },
});


var withdraws = mongoose.model("withdraws", WithdrawsSchema);
module.exports = {withdraws};