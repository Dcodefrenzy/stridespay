const {ObjectID} = require('mongodb');
let {admins} = require("./adminModel.js");
const _ = require('lodash');
const bcrypt = require("bcryptjs");
const multer = require('multer');
const path = require('path');
//const h = require('../../../../client/public/Images')


let storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, path.join(__dirname, "/../../../../client/public/Images"))
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' +file.originalname )
	  }
  })
  const upload = multer({ storage: storage }, {limits: { fileSize: 2 }}).single('image');

   exports.updateImage =  (req, res, next) => {
		upload(req, res, function (err) {
			const id = req.admin._id;
			if (err instanceof multer.MulterError) {
				return res.status(500).json(err)
			} else if (err) {
				return res.status(500).json(err)
			}
			const image = {filename:req.file.filename, path:req.file.path}

		admins.findByIdAndUpdate(id, {$set: {image:image}}, {new:true}).then((admin)=>{
			if (!admin) {
				console.log("err")
			const error = {status:403, message:"No admin!"}
			return res.status(403).send(error);
			}
			logs ={loggerUser: "Admin", logsDescription: "Admin image upload successful",title: "Image", _id:admin._id}
			req.data = logs;
			next();
		}).catch((e)=>{
			console.log(e)
			const error = {status:403, message:e}
			return res.status(403).send(error);
		})

	})
  }

exports.adminAuthenticate =  (req, res, next)=> {
		//requesting our token from header.
		
		const token = req.header('x-auth');
		//console.log(token)
		admins.findByToken(token).then((admin)=>{
			if (!admin) {
				return promise.reject();
			}
			req.admin = admin;
			req.token = token;

			next();
	}).catch((e)=>{
		const error = {status:e.status, message:e.message}
		res.status(401).send(e);
	});
}

exports.masterAdminAuthenticate =  (req, res, next)=> {
		//requesting our token from header.
		const token = req.header('x-auth');
		admins.findByToken(token).then((admin)=>{
			if (!admin) {
				return promise.reject();
			}
			if (admin.level !== 1) {
				const error = {status:403, message:"unauthorised person"}
				 return promise.reject(error);
			}
			req.admin = admin;
			req.token = token;

			next();
	}).catch((e)=>{
		const error = {status:e.status, message:e.message}
		res.status(401).send(e);
	});
}


exports.addAdmin = (req, res, next)=> {
	const admin = new admins({
		email: req.body.email,
		phoneNumber: req.body.phonenumber,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		level: req.body.level,
		verification: false,
		dateCreated: new Date,
		deleteAdmin: 0,
		password: req.body.phonenumber,
		_createdBy: req.body.firstname
	});
	console.log(admin)
	admin.save().then((admin)=> {
		return admin.generateAuthToken().then((token)=>{	
		const adminData = {status:201,token:token, email:admin.email, name:admin.firstname +" "+ admin.lastname, _id:admin._id, isAdmin:true};
		req.data = adminData;
		req.data.loggerUser = "Admin";
		req.data.logsDescription = "Admin Registration Was Successful";
		req.data.title = "Register";
		next();
		});
	}).catch((e)=>{
		let err ={}
		if(e.errors) {err = {status:403, message:e.errors}}
		else if(e){err = {status:403, message:e}}
		res.status(403).send(err);
	});
}

exports.viewAdmins = (req, res)=> {
	admins.find().then((admins)=>{
		if(!admins) {
			const error = {status:404, message:"No Admin Found"}
			return res.status(404).send(error)
		}
		const adminDetails = {status:200, admins:admins}
		res.status(200).json(adminDetails);
	}).catch((e)=>{
			const error = {status:404, message:"No Admin Found"}
			return res.status(404).send(error)
	})
}

exports.getAdmins = (req, res, next)=> {
	admins.find().then((admins)=>{
		if(!admins) {
			const error = {status:404, message:"No Admin Found"}
			return res.status(404).send(error)
		}
			req.data.admins = admins;
			next();
	}).catch((e)=>{
			const error = {status:404, message:"No Admin Found"}
			return res.status(404).send(error)
	})
}

exports.adminLogin = (req, res)=> {
		const admin = new admins({
		email : req.body.email,
		password : req.body.password
	});
		console.log(admin)
	admins.findByCredentials(admin.email, admin.password)
	.then((admin)=>{
		return admin.generateAuthToken().then((token)=>{
			const adminUpdate = new admins({
				lastLogin: new Date(),
				loginStatus: true,
			});
			admins.findByIdAndUpdate(admin._id, {$set: {lastLogin:adminUpdate.lastLogin, loginStatus:adminUpdate.loginStatus,}}).then((admin)=>{
				if(!admin) {
					const err = {status:403, message:"unable to update login status"}
					return res.status(403).send(err);
				}else{	
				const adminDetails = {status:200, _id:admin._id, token:token, name:admin.firstname +" "+ admin.lastname, level:admin.level};
				res.header('x-auth', token).send(adminDetails);
				}
			})

		});
	}).catch((e)=>{
		const error = {status:403, message:"Email or password do not exist"}
		res.status(403).send(error);
	});
}

exports.passwordChange =(req, res, next) =>{
	const email = req.admin.email;
	const oldPassword = req.body.oldPassword;

	admins.findByCredentials(email, oldPassword).then((admin)=>{ 
		const adminPassword = new admins({
			password : req.body.newPassword,
		})
		admins.findOneAndUpdate({_id:admin._id}, {$set: {password:adminPassword.password}}, {new:true}).then((admin)=>{
				if(!admin) {
					const err = {status:403, message:"unable to update password"}
					return res.status(403).send(err);
				}else {
					req.data ={status:201,loggerUser:"Admin", logsDescription:"Password change Was Successful",title:"Password Change", _id:admin._id}
					next();
				}
		})
	}).catch((e)=>{
		const error = {status:403, message:"Email or password do not exist"}
		res.status(403).send(error);
	})
}
exports.mailVerification = (req, res)=>{
	const id = req.admin._id;
	const adminUpdate = new admins({
		lastLogin: Date.now,
		loginStatus: true,
		verification: true
	});
	admins.findByIdAndUpdate(id, {$set: {verification:adminUpdate.verification,lastLogin:adminUpdate.lastLogin, loginStatus:adminUpdate.loginStatus,}}, {new: true}).then((admin)=>{
		return admin.generateAuthToken().then((token)=>{
			const adminData = {status:200, token:token, email:admin.email, name:admin.firstname +" "+ admin.lastname, _id:admin._id};
			res.status(200).send(adminData);
		})
	}).catch((e)=>{
		console.log(e)
		res.status(403).send(e);
	})
}

exports.logout =(req, res, next)=>{
	const id = req.admin._id;
	const adminUpdate = new admins({
		loginStatus: false,
	});
	admins.findByIdAndUpdate(id, {$set: { loginStatus:adminUpdate.loginStatus,}}, {new: true}).then((admin)=>{
		if (!admin) {
			const error = {status:403, message:"Unale to logout."}
			res.status(403).send(error);
		}else {
			req.data = {status:201, title:"Logout", logsDescription:"Admin logout", loggerUser:"Admin", _id:id}
			next();
		}
	}).catch((e)=>{
		const error = {status:403, message:"Unale to logout."}
		res.status(403).send(error);
	})
}


exports.updateAdmin = (req, res)=> {
	const id = req.params.id;
	const level = req.body.level;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send("Invalid Id");
	}
	admins.findByIdAndUpdate(id, {$set: {level:level,}}, {new: true}).then((data)=> {
		if (!data) {
			return res.status(404).send("unable to update");
		}
		res.status(200).send(data);
		
	}).catch((e)=>{
		res.status(404).send("unable to update");
	})
}

exports.updateProfile = (req, res,next)=> {
	const id = req.admin._id;
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	admins.findByIdAndUpdate(id, {$set: {firstname:firstname, lastname:lastname}}, {new: true}).then((admin)=> {
		if (!admin) {
			const err ={status:403, message:"Unable to update"};
			return res.status(403).send(err);
		}
		req.data ={status:201,loggerUser:"Admin", logsDescription:"Profile update  Successful",title:"Profile update", _id:admin._id}
		next();
	}).catch((e)=>{
		return res.status(403).send(e);
	})

}

exports.adminProfile = (req, res)=> {
	const id = req.admin._id;
	if(!ObjectID.isValid(id)) {
		const err = {status:404, message:"Bad user id"}
		return res.status(404).send(err);
	}
	admins.findOne(id).then((admin)=> {
	if (!admin) { 
		const err ={status:403, message:"No user with this id"};
		return res.status(403).send(err)
	}
		const adminProfile = {status:200, admin:admin}; 

		res.status(200).send(adminProfile);
	}).catch((e) => {
		return res.status(403).send(e);
	})
}


exports.adminDashboardProfile = (req, res, next)=> {
	const id = req.admin._id;
	if(!ObjectID.isValid(id)) {
		const err = {status:404, message:"Bad user id"}
		return res.status(404).send(err);
	}
	admins.findOne(id).then((admin)=> {
	if (!admin) { 
		const err ={status:403, message:"No user with this id"};
		return res.status(403).send(err)
	}
		const adminProfile = {status:200, admin:admin}; 
			req.data = adminProfile;
			next();
	}).catch((e) => {
		return res.status(403).send(e);
	})
}

exports.suspendAdmin = (req, res) => {
	const id = req.params.id;

	const deleteCode = req.body.deleteCode;
		console.log(id, deleteCode)
	const suspension = deleteCode===1? "suspension was successful":"you have unsuspend an admin.";
		if(!ObjectID.isValid(id)) {
			const err = {status:404, message:"Bad user id"}
			return res.status(404).send(err);
		}
		admins.findByIdAndUpdate(id, {$set: {deleteAdmin:deleteCode, deletedBy:req.admin._id}}, {new: true}).then(data => {
			if(!data) {
				const err = {status:402, message:"Unable to update"}
				return res.status(402).send(err)
			}
			const adminSuccess = {status:201, message:suspension}
			res.status(201).send(adminSuccess);
		}).catch((e)=>{
			e.status=403;
			console.log(e)
			res.status(403).send(e);
		})
	}

exports.deleteAdmin = (req, res)=> {
	const id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send("error no object id found");
	}
	admins.findByIdAndRemove(id).then((data)=>{
		if (!data) {
			return res.status(404).send("unable to delete admin");
		}
		res.status(200).send(data);
	}).catch((e)=>{
		res.status(404).send("e");
	})
}