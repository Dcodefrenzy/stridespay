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
	let url = "https://stridespay.com/users/veriy/"+token;

	  let mailOptions = {
		to:usermail,
		from: `"stridespay" noreply@stridespay@gmail.com`,
		subject: 'stridespay Registration',
		text: '',
		html: `<div style="border:2px solid rgba(0,0,0,.125); border-radius: 10px; padding:20px;">
		<img style="50%"  />
		<h1 style="text-align:center">Registration Successful</h1><p><b>Dear ${usersName} </b></p>
		<p style="margin-bottom:50px">We are glad to inform you that your registration was successful please click on the button below to verify your account.</p> 
		<p><a href=${url} style="background-color:green; border:0px; border-radius:10px; width:100%; padding:10px;  color:white;">Click Here</a></p>
		<p> for support contact You can also reach our support team for any technical issues  at <a href="mailto: stridespay@gmail.com">stridespay@gmail.com</a><p>
	
		<p style="margin-top:70px">Ayodeji Fakunle,</p><p style="">stridespay.</p>
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
	let url = "https://stridespay.com/signup/"+req.data._id;

	  let mailOptions = {
		to:usermail,
		from: `"stridespay" stridespay@gmail.com`,
		subject: 'Welcome to stridespay',
		text: '',
		html: `<div style="border:2px solid rgba(0,0,0,.125); border-radius: 10px; padding:20px;">
	<img style="50%" src="" />
		<p><b>Hi ${usersName}, </b></p><p style="margin-bottom:25px;">My name is Ayodeji Fakune, Co-founder of stridespay, I want to say a big thank you for registering with us and we are glad to have you onboard.</p> 
		<p style="margin-bottom:25px;">stridespay started with the goal of helping freelancers, small business collect payment with ease using a milestone based system.</p>
		<p>Being a freelancer is a really hard job, so as Getting clients, delivering projets, and even payment transaction has always been a pain in the ass for us all. But, I am tired of that already and thats why we created stridespay, to help us can keep track of our finances, projects, clients while we do our jobs.</p>
		<p>In the coming weeks, our website will be ready for use and we have provided our early users such as you free coupons pior to when we launch.</p>
		<h3 style="margin-bottom:25px;"> Why should you should love us?</h3>
		<ul style="margin-bottom:25px">
			Project Tracking
			<li>Stridespay allows you and your clients to Track your time and project progress easily.</li>		
		</ul> 
		<ul style="margin-bottom:25px">
			Get Your Payment Once
			<li>Stridespay allows your Clients to pay you once and you get access to them as you complete milestones and deliver projects</li>	
		</ul> 
		<ul style="margin-bottom:25px">
			Finalcial Analysis
			<li>Stop worring and guessing about how much you have made as a freelancer or merchant, allow us to give you analysis of how much you have earned.</li>		
		</ul> 
		<ul style="margin-bottom:25px">
			Client community
			<li>Build your client community as you work. Stridepay provide a client database for you to reach out to your clients all at once through text notifications</li>		
		</ul> 
		<h2>Don't you love us already??</h2>
		<p>Tell your friends about us and win more coupons after they register using your uquiue link ${url}</p>
		<p>If you invite 12 people that means we have got you covered for 12 months without paying a dime.</p>
		<p> Any questions??  You can  reach our support team  at <a href="mailto: stridespay@gmail.com">stridespay@gmail.com</a><p>
		<p style="margin-top:70px">Ayodeji Fakunle,</p><p style="">Stridespay.</p><div>`,
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
		from: `"stridespay" noreply@stridespay.com`,
		subject: 'stridespay User Notification',
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
	message = `An User ${usersName} just registered on stridespay, please attend.`

	  
	  let mailOptions = {
		to: "stridespay@gmail.com",
		from: `"stridespay" stridespay@gmil.com"`,
		subject: `Registration Notification`,
		text: 'and easy to do anywhere, even with Node.js',
		html: `<div style="border:2px solid rgba(0,0,0,.125); border-radius: 10px; padding:20px;"><img style="50%" src="" /><p><b>Hello official, </b></p><p style="margin-bottom:50px">${message}</p><a href="https://stridespay.com/admins/login">Login</a><div>`,
	 
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
		from: `"stridespay" stridespay@gmail.com"`,
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

