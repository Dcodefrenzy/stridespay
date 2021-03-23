const mongoose = require("mongoose");

WalletsSchema = mongoose.Schema({
		user:{
            type:String,
            required:true,
        },
        currency:{
            type:String,
        },
        amount:{
            type:Number,
            required:true,
        },
        dateCreated:{
            type: String,
            required:true,
        },
});


var wallets = mongoose.model("wallets", WalletsSchema);
module.exports = {wallets};