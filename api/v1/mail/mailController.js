let nodemailer = require('nodemailer');
let sgTransport = require('nodemailer-sendgrid-transport');
require('dotenv').config()

let options = {
	auth: {
	  api_user: process.env.SENDGRID_API_USER,
	  api_key: process.env.SENDGRID_API_PASS,
	}
  }
  let client = nodemailer.createTransport(sgTransport(options));


exports.sendRegistrationMail = (req, res, next) =>{
	const usersName = req.data.name;
	const usermail = req.data.email;
	const token = req.data.token;
	let url = "google.com";

	  let email = {
		to:usermail,
		from: `"eaglesoptik" noreply@eaglesoptik.com`,
		subject: 'Eaglesoptik User Notification',
		text: '',
		html: `<div style="border:2px solid rgba(0,0,0,.125); border-radius: 10px; padding:20px;"><img style="50%" src="" /><h1 style="text-align:center">Registration Successful</h1><p><b>Dear ${usersName} </b></p><p style="margin-bottom:50px">We are glad to inform you that your registration was successful please click on the button below to verify your account.</p> <a href=${url} style="background-color:green; border:0px; border-radius:10px; width:100%; padding:10px;  color:white;">Click Here</a><div>`,
	  };
	  
	  client.sendMail(email, function(err, info){
		if (err ){
		  console.log(err);
		}
		else {
		  console.log('Message sent: ' + info);
		}
		next()
	});	
}

exports.mailUser = (req, res, next) =>{
	const usersName = req.data.name;
	const usermail = req.data.email;
	const mailMessage = req.data.message;
	let url = "google.com";

	  let email = {
		to:usermail,
		from: `"eaglesoptik" noreply@eaglesoptik.com`,
		subject: 'Eaglesoptik User Notification',
		text: '',
		html: `<div style="border:2px solid rgba(0,0,0,.125); border-radius: 10px; padding:20px;"><img style="50%" src="" /><h1 style="text-align:center">Registration Successful</h1><p><b>Dear ${usersName} </b></p><p style="margin-bottom:50px">We are glad to inform you that your registration was successful please click on the button below to verify your account.</p> <a href=${url} style="background-color:green; border:0px; border-radius:10px; width:100%; padding:10px;  color:white;">Click Here</a><div>`,
	  };
	  
	  client.sendMail(email, function(err, info){
		if (err ){
		  console.log(err);
		}
		else {
		  console.log('Message sent: ' + info);
		}
		next()
	});	
}

exports.adminNotification = (req, res, next) =>{
	const usersName = req.data.name;

	if(req.data.isUser) {
		
	message = `A user ${usersName} just registered on eaglesoptik, please attend.`
	}else if(req.data.isDoctor) {
		message = `A Doctor ${usersName} just registered on eaglesoptik, please attend.`
	}
	else if(req.data.isAdmin) {
		message = `An Admin ${usersName} just registered on eaglesoptik, please attend.`
	}

	  
	  let email = {
		to: "eaglesoptik@gmil.com",
		from: `"Eaglesoptik" eaglesoptik@gmil.com"`,
		subject: `Registration Notification`,
		text: 'and easy to do anywhere, even with Node.js',
		html: `<div style="border:2px solid rgba(0,0,0,.125); border-radius: 10px; padding:20px;"><img style="50%" src="https://www.medikcare.com/MedikImage/MED3.png" /><p><b>Hello official, </b></p><p style="margin-bottom:50px">${message}</p><a href="https://eaglesoptik.com/admin/login">Login</a><div>`,
	 
		  };
	  
	  client.sendMail(email, function(err, info){
		  if (err ){
			console.log(err);
		  }
		  else {
			console.log('Message sent: ' + info);
		  }
		  next()
	  });
		
}

exports.sendPasswordMail = (req, res, next) =>{
	const usermail = req.data.email;
	const name = req.data.name;
	const url = req.data.link;
	const topic = req.data.title; 
	const message = req.data.logsDescription;
	let email = {
		to: usermail,
		from: `"Eaglesoptik" eaglesoptik@gmil.com"`,
		subject: `Registration Notification`,
		text: '',
		html: `<div style="border:2px solid rgba(0,0,0,.125); border-radius: 10px; padding:20px;"><img style="50%" src="https://www.medikcare.com/MedikImage/MED3.png" /><h1 style="text-align:center">${topic}</h1><p><b>Dear ${name} </b></p><p style="margin-bottom:50px">${message}.</p> <a href=${url} style="background-color:green; border:0px; border-radius:10px; width:100%; padding:10px;  color:white;">Click Here</a><div>`,
	  };

	  client.sendMail(email, function(err, info){
		if (err ){
		  console.log(err);
		}
		else {
			response = {status:201,message:`Hi, ${name} we found your account and have sent a link to your mail for a password update.`}
			return res.status(201).send(response);
		  //console.log('Message sent: ' + info);
		}
		
	});
}

