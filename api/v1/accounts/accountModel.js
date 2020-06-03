const mongoose = require("mongoose");

AccountsSchema = mongoose.Schema({
		user:{
            type:String,
            required:true,
        },
        account:{
            type:Number,
            required:true,
        },
        accountName:{
            type:String,
            required:true,
        },
        bank:{
            type:String,
            required:true,
        },
        bankCode:{
            type:Number,
            required:true,
        },
        recipient:{
            type:String,
            required:false,
        },
        dateCreated:{
            type: String,
            required:true,
        },
});


var accounts = mongoose.model("accounts", AccountsSchema);
module.exports = {accounts};