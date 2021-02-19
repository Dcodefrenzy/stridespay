const express = require('express');
const {mongoose} = require("../db/mongoose.js");
const {ObjectID} = require('mongodb');
const {users} = require("./usersModel.js");
const _ = require('lodash');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const fs = require('fs'); 


let imgPath;
if ( process.env.DEV_ENV) {
	imgPath = "../../../view/assets/images";
	imgPath2 = "/../../../../client/public/Files";
}else{
    imgPath = "/../../../../client/build/Images";
	imgPath2 = "/../../../../client/public/Images";
}

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, path.join(__dirname, "../../../view/assets/images"))
	  
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' +file.originalname )
	  }
  })
  const upload = multer({ storage: storage }, {limits: { fileSize: 2 }}).single('image');

  exports.updateImage =  (req, res, next) => {
		upload(req, res, function (err) {

			const id = req.user._id;
			if (err instanceof multer.MulterError) {
				return res.status(500).json(err)
			} else if (err) {
				console.log(err)
				return res.status(500).json(err)
			}
			//const image = {filename:req.file.filename}

		users.findByIdAndUpdate(id, {$set: {image:req.file.filename}}).then((user)=>{
			if (!user) {
			const error = {status:403, message:"No admin!"}
			return res.status(403).send(error);
			}
			console.log(__dirname)
			fs.unlink("C:/vms/stridespay/view/assets/images/"+user.image, (err => { 
			  if (err){

				user ={status:201, message:"upload successful."}
				res.status(201).send(user);
			}	
			  else { 
			    console.log("\nDeleted file: example_file.txt"); 
			  
				user ={status:201, message:"upload successful."}
				res.status(201).send(user);
			    //getFilesInDirectory(); 
			  } 
			})); 
		}).catch((e)=>{
			console.log(e)
			const error = {status:403, message:e}
			return res.status(403).send(error);
		})

	})
}


exports.userAuthenticate =  (req, res, next)=>{
		//requesting our token from header.
		
		var token = req.header('u-auth');
		users.findByToken(token).then((body)=>{
			if (!body) {
		const error = {status:401, message:"Unauthorized! Session has ended"};
		return res.status(401).send(error);
			}
			console.log("token check successful")
			req.user = body;
			req.isUser = true;
			req.token = token;
			next();
	}).catch((e)=>{
		console.log(e)
		const error = {status:e.status, message:e.message}
		res.status(401).send(error);
	});
}

exports.verifyEmail=(req, res, next)=>{
	users.findOne({email:req.body.email}).then((email)=>{
		if (email) {
			res.status(403).send({status:403, email:req.body.email});
		}else{
			next();
		}
	})
}

exports.registerUser=(req, res, next)=>{
	let user = new users({
		email:req.body.email,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		name:req.body.firstname+"_"+req.body.lastname,
		phonenumber: req.body.phonenumber,
		password: req.body.password,
		lastLogin: new Date(),
		dateCreated: new Date(),		
	});
	console.log("here")
	user.save().then((user)=>{
		console.log(user)
		
		if (!user) {
			const err = {status:404, message:"unable to add user"}
			return res.status(404).send(err);
		}
		return user.generateAuthToken().then((token) =>{
			const userData = {status:201, token:token, email:user.email,  name:user.name, _id:user._id,};
			req.data = userData;
			req.data.redirect = "/users/dashboard";
			req.data.loggerUser = "User";
			req.data.logsDescription = "User Registration Was Successful";
			req.data.title = "Register";
			next();
		})
	}).catch((e)=>{
		console.log(e);
		let err ={}
		if(e.errors) {err = {status:403, message:e.errors}}
		else if(e){err = {status:403, message:e}}
		res.status(404).send(err);
	});
	
}


exports.addUser = (req, res, next)=>{
		
	let user = new users({
		email:req.body.email,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		name:req.body.firstname+"_"+req.body.lastname,
		phonenumber: req.body.phonenumber,
		password: req.body.password,
		lastLogin: new Date(),
		dateCreated: new Date(),		
	});
	user.save().then((user)=>{
		if (!user) {
			const err = {status:404, message:"unable to add user"}
			return res.status(404).send(err);
		}
		return user.generateAuthToken().then((token) =>{
			const userData = {status:201, token:token,  name:user.name, _id:user._id,};
			req.data = userData;

			if (req.body.isBuyer) {
				req.data.isMerchant = false;
			}else if (req.body.isMerchant) {
				req.data.isMerchant = true;
			}
			req.data.loggerUser = "User";
			req.data.logsDescription = "User Registration Was Successful";
			req.data.title = "Register";
			next();
		})
	}).catch((e)=>{
		console.log(e);
		let err ={}
		if(e.errors) {err = {status:403, message:e.errors}}
		else if(e){err = {status:403, message:e}}
		res.status(404).send(err);
	});
	
}

//To authenticate users for every request.
// exports.userAuthenticate =  (req, res, next)=>{
// 		requesting our token from header.
		
// 		var token = req.header('u-auth');
// 		users.findByToken(token).then((body)=>{
// 			if (!body) {
// 				return promise.reject();
// 			}
// 			console.log("token check successful")
// 			req.user = body;
// 			req.isUser = true;
// 			req.token = token;
// 			next();
// 	}).catch((e)=>{
// 		console.log(e)
// 		const error = {status:e.status, message:e.message}
// 		res.status(401).send(e);
// 	});
// }


//User login.

exports.userLogin = (req, res)=>{
	//
	if (req.body.email) {
		console.log({"mail":req.body})
		loginEmail(req, res);
	}else if (req.body.phonenumber) {
		console.log({"herephone":req.body})
		loginPhone(req, res);
	}
}
const loginPhone = (req, res)=>{
	const user = new users({
	phonenumber : req.body.phonenumber,
	password : req.body.password
});

		console.log({"loginphone":req.body})

users.findByPhoneCredentials(user.phonenumber, user.password).then((user)=>{
		return user.generateAuthToken().then((token)=>{
			const userUpdate = new users({
				lastLogin: Date.now,
				loginStatus: true,
			});
			users.findByIdAndUpdate(user._id, {$set: {lastLogin:userUpdate.lastLogin, loginStatus:userUpdate.loginStatus,}}).then((newUSer)=>{
				if(!newUSer) {
					const err = {status:403, message:"unable to update login status"}
					return res.status(403).send(err);
				}else{
					const userDetails = {status:200, token:token, name:user.firstname +" "+ user.lastname, _id:user._id};
					res.status(200).send(userDetails);
				}
			}) 
		})
	}).catch((e)=>{
		console.log(e);
		res.status(403).send(e);
	});
}


const loginEmail = (req, res)=>{
	const user = new users({
	email : req.body.email,
	password : req.body.password
});

users.findByEmailCredentials(user.email, user.password).then((user)=>{
	console.log(user)
		return user.generateAuthToken().then((token)=>{
			const userUpdate = new users({
				lastLogin: Date.now,
				loginStatus: true,
			});
			users.findByIdAndUpdate(user._id, {$set: {lastLogin:userUpdate.lastLogin, loginStatus:userUpdate.loginStatus}}).then((newUSer)=>{
				if(!newUSer) {
					const err = {status:403, message:"unable to update login status"}
					return res.status(403).send(err);
				}else{
					const userDetails = {status:200, token:token, name:user.firstname +" "+ user.lastname, _id:user._id};
					res.status(200).send(userDetails);
				}
			}) 
		})
	}).catch((e)=>{
		console.log(e);
		res.status(403).send(e);
	});
}

exports.userProfile  = (req, res,next)=> {		
		req.data = req.user
			next();
}

exports.mailVerification = (req, res)=>{
	const id = req.user._id;
	const userUpdate = new users({
		lastLogin: Date.now,
		loginStatus: true,
		verification: true
	});
	users.findByIdAndUpdate(id, {$set: {verification:userUpdate.verification,lastLogin:userUpdate.lastLogin, loginStatus:userUpdate.loginStatus,}}, {new: true}).then((user)=>{
		return user.generateAuthToken().then((token)=>{
			const userData = {status:200, token:token, email:user.email, name:user.name, _id:user._id};
			res.status(200).send(userData);
		})
	}).catch((e)=>{
		console.log(e)
		res.status(403).send(e);
	})
}

exports.chekMailVerification = (req, res, next)=>{
	const _id = req.user._id;
	users.findById({_id:_id}).then((user)=>{
		if (user.verification === true) {
			return user.generateAuthToken().then((token)=>{
				const userData = {status:200, token:token, email:user.email, name:user.name, _id:user._id};
				res.status(200).send(userData);
			})
		}else{
			next();
		}
	})
}

//Returns collection of users for only admin.
exports.viewUsers = (req, res)=> {
	users.find().then((users)=>{
		if(!users) {
			const error = {status:404, message:"No User Found"}
			return res.status(404).send(error)
		}
		const userDetails = {status:200, users:users}
		res.status(200).json(userDetails);
	}).catch((e)=>{
			const error = {status:404, message:"No User Found"}
			return res.status(404).send(error)
	})
}

//To fetch just one user by ID
exports.findUser  = (req, res,next)=> {
	const id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send("error no object id found");
		}
		users.findById(id).then((user)=>{
			if(!user) {
				const error = {status:404, message:"No User Found"}
				return res.status(404).send(error)
			}
			const userData = {status:201,email:user.email, phone:user.phonenumber, name:user.firstname +" "+ user.lastname, _id:user._id,message:"You can change your password using the link below."};
			req.data = userData;
			next();
		}).catch((e)=>{
			res.status(404).send(e)
		})
}


exports.findUserByMail = (req, res, next)=>{
	const email = req.body.email;
	users.findOne({email:email}).then((user)=>{
		if(!user) {
			const error = {status:404, message:"No User Found"}
			return res.status(404).send(error)
		}	
		return user.generateAuthToken().then((token)=>{
			const userData = {status:200, token:token, email:user.email, name:user.name, _id:user._id};
			req.data = userData;
			req.data.loggerUser = "User";
			req.data.logsDescription = "You were send a mail.";
			req.data.title = "Mailler";
			next();
		})
	}).catch((e)=>{
		res.status(404).send(e)
	})
}

exports.findUserForTransaction = (req, res, next)=>{
		console.log(req.data)
	users.findById({_id:req.data.userId}).then((user)=>{
		if(!user) {
			const error = {status:404, message:"No User Found"}
			return res.status(404).send(error)
		}	
		console.log(user)
			const userData = {email:user.email, phonenumber:user.phonenumber, playerId:user.playerId, name:user.name, _id:user._id};
			req.data.status = 201;
			req.data.email = user.email;
			req.data.phonenumber = user.phonenumber;
			req.data.playerId = user.playerId;
			req.data.name = user.name;
			req.data._id = req.user._id
			req.data.loggerUser = "User";
			req.data.logsDescription ="You updated a transaction with. "+user.name+" on "+req.data.productName;
			req.data.title = "Transactions";
			//console.log(req.data)
			next();
	}).catch((e)=>{
		console.log(e)
		res.status(404).send(e)
	})
}

exports.updatePlayerID=(req, res, next)=>{
	users.findByIdAndUpdate(req.user._id, {$set: {playerId:req.body.playerId}}, {new: true}).then((user)=>{
			const userData = {status:201, email:user.email, phonenumber:user.phonenumber, playerId:user.playerId, name:user.name, _id:user._id};
			req.data  = userData;
			req.data.loggerUser = "User";
			req.data.logsDescription ="Updated player id";
			req.data.title = "Profile";
			next();
	}).catch((e)=>{
		console.log(e)
		res.status(404).send(e)
	})	
}

exports.sendVerification=(req, res, next)=>{
	req.data.link = "https:paymerchant/users/verification/"+req.data.token;
	req.data.mailTitle = "Mail Verification";
	req.data.mailMessage = "Please click on the link below to verify your mail Thanks."
	next()
}

//User Update.
exports.updateUser = (req, res, next)=>{
	const id = req.user.id;
	const username = req.body.username.replace(' ', "_");
	const user = new users({
		firstname: req.body.firstname,
		linkedin:req.body.linkedin,
		instagram:req.body.instagram,
		twitter:req.body.twitter,
		facebook:req.body.facebook,
		lastname: req.body.lastname,
		skills:req.body.skills,
		gender: req.body.gender,
		age: req.body.age,
		about: req.body.about,
		location:req.body.location,
		name:username	
	});
	console.log(user)
	if (!ObjectID.isValid(id)) {
		return res.status(404).send("err")
	}
	users.findByIdAndUpdate(id, {$set: {firstname:user.firstname,about:user.about,name:user.name, lastname:user.lastname,gender:user.gender, age:user.age,location:user.location,instagram:user.instagram, twitter:user.twitter, linkedin:user.linkedin, facebook:user.facebook, skills:user.skills}}, {new: true}).then((user)=>{
		if (!user) {
			const err ={status:403, message:"Unable to update"};
			return res.status(403).send(err);
		}
		console.log(user)
		req.data ={status:201,loggerUser:"User", logsDescription:"Profile information update  Successful",title:"Profile update", _id:id}
		next();
	}).catch((e)=>{
		res.status(404).send("unable to update");
	})
}

//To change password.
exports.passwordChange =(req, res, next) =>{
	const email = req.user.email;
	const oldPassword = req.body.oldPassword;

	users.findByEmailCredentials(email, oldPassword).then((user)=>{ 
		users.findOneAndUpdate({_id:req.user._id}, {$set: {password:req.body.password}}, {new:true}).then((user)=>{
				if(!user) {
					const err = {status:403, message:"unable to update password"}
					return res.status(403).send(err);
				}else {
					req.data ={status:201,loggerUser:"User", logsDescription:"Password change Was Successful",title:"Password Change", _id:user._id}
					next();
				}
		})

	}).catch((e)=>{
		console.log(e);
		const error = {status:403, message:"Email or password do not exist"}
		res.status(403).send(error);
	})
}

//Forget password function.
exports.newPasswordChange =(req, res, next) =>{
	const _id = req.user._id;
	users.findById({_id}).then((user)=>{ 
		const userPassword = new users({
			password : req.body.newPassword,
		})
		users.findOneAndUpdate({_id:_id}, {$set: {password:userPassword.password}}, {new:true}).then((user)=>{
				if(!user) {
					const err = {status:403, message:"unable to update password"}
					return res.status(403).send(err);
				}else {
					return user.generateAuthToken().then((token)=>{
						if(!token) {
							const err = {status:403, message:"unable to generate toke"}
							return res.status(403).send(err);
						}else{	
							req.data = {status:201,token:token, email:user.email, name:user.firstname +" "+ user.lastname, _id:user._id,  loggerUser:"user", logsDescription:"Password change Was Successful",title:"New Password Change"}
							next();
						}
					})
				}
		})
	}).catch((e)=>{console.log(e)
		const error = {status:403, message:"Email or password do not exist"}
		res.status(403).send(error);
	})
}



exports.getMerchantDetails=(req, res, next)=>{
	users.findById({_id:req.data.transaction.merchant}).then((user)=>{
		if (user) {
			req.data.user = user;
			req.data.name = user.firstname+" "+user.lastname;
			req.data.email = user.email;
			res.status(200).send(req.data);
		}
	})
}

exports.getMerchantDetailsForMail=(req, res, next)=>{
		users.findById({_id:req.data.transaction.merchant}).then((user)=>{
		if (user) {
			req.data.user = user;
			req.data.name = user.firstname+" "+user.lastname;
			req.data.email = user.email;
			next();
		}
	})
}

exports.getBuyersDetailsForProfile=async(req, res)=>{
			let newData;
	newData = await req.data.transactions.map(async(data, index)=>{
			 const id = data.buyer;
			 console.log(id)
		buyers = await  users.findById({_id:id});
		return nData = {buyers:buyers};
	});
	const resp = await Promise.all(newData);
	res.status(200).send({status:200,clients:resp,user:req.data.user,wallet:req.data.wallet, withdraw:req.data.withdraw, transactions:req.data.transactions});
}


exports.fetchClient=async(req, res)=>{
			let newData;
	newData = await req.data.map(async(data, index)=>{
			 const id = data.buyer;
		buyers = await  users.findById({_id:id});
			// console.log(buyers)
		return nData = {clients:buyers};
	});
	const resp = await Promise.all(newData);
	res.status(200).send({status:200,data:resp});
}

//Logout function
exports.logout =(req, res, next)=>{
	const id = req.user._id;
	const userUpdate = new users({
		loginStatus: false,
	});
	users.findByIdAndUpdate(id, {$set: { loginStatus:userUpdate.loginStatus,}}, {new: true}).then((user)=>{
		if (!user) {
			const error = {status:403, message:"Unable to logout."}
			res.status(403).send(error);
		}else {
			req.data = {status:201, title:"Logout", logsDescription:"User logout successful", loggerUser:"User", _id:id}
			next();
		}
	}).catch((e)=>{
		const error = {status:403, message:"Unable to logout."}
		res.status(403).send(error);
	})
}

