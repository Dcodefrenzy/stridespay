const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const _ = require('lodash');



const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: false,
		unique:true,
		validate: {
			validator: validator.isEmail,
			message: '{value} is not a valid email',
		},
	},
	firstname: {
		type: String,
		required: false,
		trim: true,
		minlenght: 3,
	},
	lastname: {
		type: String,
		required: false,
		trim: true,
		minlenght: 3,
	},
	name:{
		type:String,
		required:true,
	},
	phonenumber: {
		type: Number,
		trim:false,
		required: false,
		unique: true,	
	},
	about:{
		type:String,
		required:false,
	},
	gender:{
		type: String,
		required: false,
		trim: true,
		minlenght:1,
	},
	age: {
		type: String,
		require:false,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlenght: 6,
	},
	location:{
		type:String,
		required:false,
	},
	image: {
		type:String,
		required:false,		
	},
	verification: {
		type :Boolean,
		required: true,
		default: false,
	},
	playerId: {
		type :String,
		required: false,
	},
	lastLogin: {
		type:String,
		required: true,
		default: false,
	},
	loginStatus: {
		type:Boolean,
		required:false,
	},
	instagram:{
		type:String,
		required:false,
	},
	twitter:{
		type:String,
		required:false,
	},
	facebook:{
		type:String,
		required:false,
	},
	linkedin:{
		type:String,
		required:false,
	},
	skills:{
		type:String,
		required:false,
	},
	roles:{
		type:Number,
		required:false,
	},
	deleteUser: {
		type: Boolean,
		required: true, 
		default:false
	},
	deletedBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
	},

	dateCreated:{
		type: String,
		required:true,
	},
});


	userSchema.pre('save', function(next){
		const user = this;

		if (user.isModified('password')) {
			bcrypt.genSalt(10, (err, salt)=>{
				bcrypt.hash(user.password, salt, (err, hash)=>{
					user.password = hash;
					next();
				});
			});
		}else{
			next();
		}
	});

	userSchema.pre('findOneAndUpdate', function(next){
		var user = this.getUpdate(); 
		if (user.$set.password) {
			bcrypt.genSalt(10, (err, salt)=>{
				bcrypt.hash(user.$set.password, salt, (err, hash)=>{
					this.getUpdate().$set.password = hash;
					next();
				});
			});
		}else{
			next();
		}
	});

	userSchema.methods.toJSON = function(){
		const user = this;
		const userObject = user.toObject();
		return _.pick(userObject, ['_id', 'email', 'firstname', 'lastname', 'name', 'twitter', 'instagram', 'skills', 'facebook', 'linkedin',  'phonenumber', 'gender', 'age', 'location', 'about', 'verification','image', 'lastLogin','loginStatus','dateCreated']);
	};


		//creating an authentication token for user
	userSchema.methods.generateAuthToken = function(){
		//this keyword represent the object that uses this method.
		const user = this;
		const access = 'auth';
		//using the user id to generate a token which will expire.
		const token = jwt.sign({_id: user._id.toHexString(), access}, 'mongsufsrenz##', {expiresIn: 86400});
	
		return user.save().then(()=>{
			return token;
		});
	};
userSchema.statics.findByPhoneCredentials = function (phonenumber, password){
	const user = this;
	return user.findOne({phonenumber}).then((body)=>{
		if (!body) {
			const err = {status:400, message:{message:"User do not exist."}}
			return Promise.reject(err);
		}
		if(body.deleteUser === true) {
			const err = {status:400, message:{message:"This user has been deleted."}}
			return Promise.reject(err);
		}
		return new Promise((resolve, reject)=>{
			bcrypt.compare(password, body.password, (err, res)=>{
				if (res) {
					return resolve(body);
					
				}else{
					const error = {status:403, message:{message:"phonenumber or password do not exist"}}
					return reject(error);
				}	
			})
		})
	})
}


userSchema.statics.checkPassword = function(email, password){
	const user = this;
		return user.findOne({email}).then((body)=>{
		console.log({"credentialmail":body})
		if (!body) {
			const err = {status:400, message:{message:"User do not exist."}}
			return Promise.reject(err);
		}
		if(body.deleteUser === true) {
			const err = {status:400, message:{message:"This user has been deleted."}}
			return Promise.reject(err);
		}
		return new Promise((resolve, reject)=>{
			bcrypt.compare(password, body.password, (err, res)=>{
				if (res) {
					return resolve(body);
					
				}else{
					const error = {status:404, message:"Password is not correct"}
					return reject(error);
				}	
			})
		})
	})
}
userSchema.statics.findByEmailCredentials = function (email, password){
	const user = this;
	return user.findOne({email}).then((body)=>{
		console.log({"credentialmail":body})
		if (!body) {
			const err = {status:400, message:{message:"User do not exist."}}
			return Promise.reject(err);
		}
		if(body.deleteUser === true) {
			const err = {status:400, message:{message:"This user has been deleted."}}
			return Promise.reject(err);
		}
		return new Promise((resolve, reject)=>{
			bcrypt.compare(password, body.password, (err, res)=>{
				if (res) {
					return resolve(body);
					
				}else{
					const error = {status:403, message:{message:"Email or password do not exist"}}
					return reject(error);
				}	
			})
		})
	})
}


	//find by token
	userSchema.statics.findByToken = function(token){
		const user = this;
		let decode;
		try{
			decode = jwt.verify(token, 'mongsufsrenz##');
		}catch(e){
			return new Promise((resolve, reject)=>{
				e.status = 401;
				console.log({"model": e});
				return reject(e);
			});
		}	
		return user.findOne({
			'_id':decode._id,
		});
	}



const users = mongoose.model('users', userSchema);

module.exports = {users};
