let nodemailer = require('nodemailer');
let sgTransport = require('nodemailer-sendgrid-transport');
require('dotenv').config()


const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: process.env.Email,
	  pass: process.env.Pass,
	}
});


	 


exports.sendRegistrationMail = (req, res, next) =>{
	const usersName = req.data.name;
	const usermail = req.data.email;
	const token = req.data.token;
	let url = "https://paymerchant.co/users/veriy/"+token;

	  let mailOptions = {
		to:usermail,
		from: `"Paymerchant" noreply@paymerchantafrica@gamil.com`,
		subject: 'Paymerchant Registration',
		text: '',
		html: `<div style="border:2px solid rgba(0,0,0,.125); border-radius: 10px; padding:20px;">
		<img style="50%"  />
		<h1 style="text-align:center">Registration Successful</h1><p><b>Dear ${usersName} </b></p>
		<p style="margin-bottom:50px">We are glad to inform you that your registration was successful please click on the button below to verify your account.</p> 
		<p><a href=${url} style="background-color:green; border:0px; border-radius:10px; width:100%; padding:10px;  color:white;">Click Here</a></p>
		<p> for support contact You can also reach our support team for any technical issues  at <a href="mailto: paymerchantafrica@gmail.com">paymerchantafrica@gmail.com</a><p>
	
		<p style="margin-top:70px">Ayodeji Fakunle,</p><p style="">PayMerchant.</p>
		<div>`,
		  };
		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
			console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		  next();
		});
}



exports.welcomeMail = (req, res, next) =>{
	const usersName = req.data.name;
	const usermail = req.data.email;
	let url = "https://paymerchant.co/users/login";

	  let mailOptions = {
		to:usermail,
		from: `"Paymerchant" paymerchantafrica@gmail.com`,
		subject: 'Welcome to paymerchant',
		text: '',
		html: `<div style="border:2px solid rgba(0,0,0,.125); border-radius: 10px; padding:20px;">
	<img style="50%" src="" />
		<p><b>Hi ${usersName}, </b></p><p style="margin-bottom:25px;">My name is Ayodeji Fakune, Co-founder of Paymerchant, I want to say a big thank you for registering with us and we are glad to have you onboard.</p> 
		<p style="margin-bottom:25px;">Paymerchant started with the goal of helping freelancers, small business collect payment with ease using a milestone based system.</p>
		<h3 style="margin-bottom:25px;"> What Happens After SignUp?</h3>
		<ol style="margin-bottom:25px">
			For Merchants
			<li>Login on paymerchant</li>
			<li>Create a product token: A token will be generated and you can share this with anyone who want to buy the product you created a token for.</li>
			<li>Start Delivery Process: Once the buyers pays, you can go on with the delivery of the item</li>
			<li>Confirm Delivery and Checkout </li>		
		</ol> 
		<ol style="margin-bottom:25px">
			For Buyers
			<li>Login on paymerchant</li>
			<li>Create a product token after agreement with merchant on your favorite market place and share with the merchant.</li>
			<li>Make Payment: Payment will be held by payMerchant until you verifies that your item has been delivered.</li>
			<li>Confirm Delivery and Pay merchant </li>		
		</ol> 
		<ol style="margin-bottom:25px">
			For Freelancers
			<li>Login on paymerchant</li>
			<li>Create a Service token and service milestones after agreement with your Client from any platform.</li>
			<li>Start Your gig: Once the clients pays, we will notify you to start working.</li>
			<li>Complete Milestones and get paid: Once you complete a milestone, the client is notified and money is disbursed into your paymerchant wallet and can be withdraw.</li>		
		</ol> 
		<a href=${url} style="background-color:green; border:0px; border-radius:10px; width:100%; padding:10px;  color:white;">Login</a>
		<p> for support contact You can also reach our support team for any technical issues  at <a href="mailto: paymerchantafrica@gmail.com">paymerchantafrica@gmail.com</a><p>
		<p style="margin-top:70px">Ayodeji Fakunle,</p><p style="">PayMerchant.</p><div>`,
		  };
	  
		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
			console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		  next();
		});
}


exports.mailUser = (req, res, next) =>{
	const usersName = req.data.name;
	const usermail = req.data.email;
	const mailMessage = req.data.message;
	let url = "google.com";

	  let mailOptions = {
		to:usermail,
		from: `"eaglesoptik" noreply@eaglesoptik.com`,
		subject: 'Eaglesoptik User Notification',
		text: '',
		html: `<div style="border:2px solid rgba(0,0,0,.125); border-radius: 10px; padding:20px;"><img style="50%" src="" /><h1 style="text-align:center">Registration Successful</h1><p><b>Dear ${usersName} </b></p><p style="margin-bottom:50px">We are glad to inform you that your registration was successful please click on the button below to verify your account.</p> <a href=${url} style="background-color:green; border:0px; border-radius:10px; width:100%; padding:10px;  color:white;">Click Here</a><div>`,
	  };
	  
			transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
			console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		  next();
		});
}

exports.adminNotification = (req, res, next) =>{
	const usersName = req.data.name;
	message = `An User ${usersName} just registered on paymerchant, please attend.`

	  
	  let mailOptions = {
		to: "paymerchantafrica@gmail.com",
		from: `"Paymerchant" paymerchantafrica@gmil.com"`,
		subject: `Registration Notification`,
		text: 'and easy to do anywhere, even with Node.js',
		html: `<div style="border:2px solid rgba(0,0,0,.125); border-radius: 10px; padding:20px;"><img style="50%" src="" /><p><b>Hello official, </b></p><p style="margin-bottom:50px">${message}</p><a href="https://paymerchant.co/admins/login">Login</a><div>`,
	 
		  };
	  
		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
			console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		  next();
		});

		
}

exports.sendMail = (req, res, next) =>{
	const usermail = req.data.email;
	const name = req.data.name;
	const url = req.data.link;
	const topic = req.data.mailTitle; 
	const message = req.data.mailMessage;
	let mailOptions = {
		to: usermail,
		from: `"Paymerchant" paymerchantafrica@gmail.com"`,
		subject: topic,
		text: '',
		html: `<div style="border:2px solid rgba(0,0,0,.125); border-radius: 10px; padding:20px;">
				<img style="50%" />
				<h1 style="text-align:center">${topic}</h1>
				<p><b>Dear ${name} </b></p><p style="margin-bottom:50px">${message}.</p> 
				<a href=${url} style="background-color:green; border:0px; border-radius:10px; width:100%; padding:10px;  color:white;">Click Here
				</a><div>`,
	  };

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
			console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		  next();
		});
}

