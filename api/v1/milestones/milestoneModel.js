const mongoose = require("mongoose");

MilestoneSchema = mongoose.Schema({
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
        product:{
            type:String,
            required:false,
        },
        dateCreated:{
            type: String,
            required:true,
            trim:true
        },
        dateUpdated:{
			type: String,
			required: false,
        },
});


var milestones = mongoose.model("milestones", MilestoneSchema );
module.exports = {milestones};