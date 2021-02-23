const {payments} = require("./paymentModel.js");
require('dotenv').config()
const request = require('request-promise');

var paystack = require('paystack')(process.env.PAYSTACK_KEY);
const paystackLive =  process.env.paystackLive;

//console.log(process.env.PAYSTACK_KEY)
/*exports.getAllBanks = (req, res, next)=>{
	console.log(paystackLive)
	request.get("https://api.paystack.co/bank", {
		headers: {"Authorization": paystackLive}
	}).then((bank)=>{
		res.status(200).send(bank);
	})
}*/

let FLUTTERWAVE, FLUTTERWAVEV;
if (process.env.Local) {
	FLUTTERWAVE =  process.env.FLUTTERWAVELOCAL;
	FLUTTERWAVEV = process.env.FLUTTERWAVEVLOCAL;
	console.log('using local')
}else if (!process.env.Local) {
	FLUTTERWAVE = process.env.FLUTTERWAVE;
	FLUTTERWAVEV = process.env.FLUTTERWAVEV;
	console.log("using prod")
}

exports.getAllBanks = (req, res, next)=>{
		
	request.get("https://api.ravepay.co/v2/banks/NG?public_key=FLWPUBK-ce9b11e05a3fbc88ad63ac2e3f5af1de-X", {
		headers: {"Content-Type": "application/json", "public_key":"FLWPUBK-ce9b11e05a3fbc88ad63ac2e3f5af1de-X"}
	}).then((bank)=>{
		res.status(200).send(bank);
	})
}

exports.checkBankName = (req, res, next)=>{

	request.get("https://api.ravepay.co/v2/banks/NG?public_key=FLWPUBK-ce9b11e05a3fbc88ad63ac2e3f5af1de-X", {
		headers: {"Content-Type": "application/json"}
	}).then((banks)=>{
		console.log(banks.status)
		b = JSON.parse(banks)
		const oneBank = b.data.Banks.find(bank => bank.Code === req.body.bankname)
		req.data = oneBank;
		next();
	})
}

exports.addRecipient = (req, res, next)=>{
	const body = {   
   			"account_number": req.body.accountnumber,
   			"account_bank":req.body.bankname,
   			"seckey": FLUTTERWAVE,
		}
	request.post("https://api.ravepay.co/v2/gpx/transfers/beneficiaries/create", {
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify(body)
	}).then((response)=>{
		req.data.recipient = JSON.parse(response).data;
		next();
	})
    .catch(function (err) {
    	console.log(err)
    	if (err.statusCode === 400) {}
        res.status(400).send({status:400, message:{accountnumber:"Your account number "+req.body.accountnumber}})
    });
 
}

exports.payOutUser = (req, res, next)=>{
	if (req.data.wallet.amount.toString().slice(0, -2) == 0) {
		return res.status(403).send({status:403, error:"wallet", subError:"amount", message:"Wallet amount is low, so you can not withdraw at this moment."});
	}
	const body = {      			
			  "recipient": req.data.bank.recipient,
			  "amount": req.data.wallet.amount.toString().slice(0, -2),
			  "seckey": FLUTTERWAVE,
			  "narration": "Paymerchant Transfer",
			  "currency": "NGN",
			  "beneficiary_name": req.data.bank.accountName,
		}
	request.post("https://api.ravepay.co/v2/gpx/transfers/create", {
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify(body)
	}).then((response)=>{
		console.log(JSON.parse(response));
		req.data.transfer = JSON.parse(response).data;
		next();
	})
    .catch(function (err) {
    	console.log(err)
    	if (err.statusCode === 400) {}
        res.status(400).send({status:400, message:{accountnumber:"Your account number "+req.body.accountnumber}})
    });
}
exports.verifyPayment=(req, res, next)=>{	
	const body =  {
			  "SECKEY": FLUTTERWAVE,
			  "txref": req.body.reference
			};

			console.log(body)
	request.post(FLUTTERWAVEV, {
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify(body)
	})
	.then((res)=>{

		console.log("fetch data")
		const response = JSON.parse(res)
            //check status is success.
          if (response.status === "success" && response.data.txref == req.body.reference) {
              //check if the amount is same as amount you wanted to charge just to be very sure
              if (response.data.amount == req.data.product.price.toString().slice(0, -2)) {
                  console.log("Payment successful");
                  //then give value for the payment
						req.data.paymentStatus = true; 
						req.data.redirect = "/users/products";
	  						next();
              }else if (response.body.data.status !== "success" &&  response.body.data.amount !== req.data.product.price.toString().slice(0, -2)) {
						req.data.paymentStatus = false;
	  						console.log("Failed");
						req.data.redirect = "/users/products/"+req.data.transaction._id+"/payment/failed";
	  						next();
				}
          }
	})

/*		paystack.transaction.verify(req.body.reference, function(error, body) {
				//console.log({"paymentbody":body})
					if (body.data.status === "success" && body.data.amount ===  Number(req.data.product.price)  ) {
						req.data.paymentStatus = true;
						req.data.redirect = "/users/products/"+req.data.product._id;
	  						next();
					}else if (body.data.status !== "success" &&  body.data.amount !== req.data.product.price) {
						req.data.paymentStatus = false;
	  						console.log("Failed");
						req.data.redirect = "/users/products/"+req.data.product._id+"/payment/failed";
	  						next();
					}	
		});*/
}


exports.verifyTransactionPayment=(req, res, next)=>{
	//console.log({'res.body':req.body})
	const body =  {
			  "SECKEY": FLUTTERWAVE,
			  "txref": req.body.reference
			};
			
			console.log({'body':body})
	request.get(`https://api.flutterwave.com/v3/transactions?tx_ref=${req.body.reference}`, {
		headers: {
					"Content-Type": "application/json",
					'Authorization': `Bearer ${FLUTTERWAVE}`
				}
	})
	.then((res)=>{
//console.log(res)
		const response = JSON.parse(res)
		console.log({'response':response})
            //check status is success.
            console.log(response.data)
            console.log(response.data.tx_ref)
            console.log(response.data.amount)
          if (response.status === "success" && response.data.tx_ref == req.body.reference.toString()) {
          	console.log(response.data.txref)
              //check if the amount is same as amount you wanted to charge just to be very sure
              if (response.data.amount == req.data.transaction.price.toString().slice(0, -2)) {
                  console.log("Payment successful");
                  //then give value for the payment
						req.data.paymentStatus = true; 
						req.data.redirect = "/users/transaction/"+req.data.transaction._id;
	  						next();
              }else if (response.body.data.status !== "success" &&  response.body.data.amount !== req.data.transaction.price.toString().slice(0, -2)) {
						req.data.paymentStatus = false;
	  						console.log("Failed");
						req.data.redirect = "/users/products/"+req.data.transaction._id+"/payment/failed";
	  						next();
				}
          }
	})
/*

		paystack.transaction.verify(req.body.reference, function(error, body) {
			
					if (body.data.status === "success" && body.data.amount ===  Number(req.data.transaction.price)  ) {
						console.log({"paymentbody":req.data.transaction})
						req.data.paymentStatus = true; 
						req.data.redirect = "/users/transactions/"+req.data.transaction._id;
	  						next();
					}else if (body.data.status !== "success" &&  body.data.amount !== req.data.transaction.price) {
						req.data.paymentStatus = false;
	  						console.log("Failed");
						req.data.redirect = "/users/products/"+req.data.transaction._id+"/payment/failed";
	  						next();
					}	
		});*/
}

exports.createNewPayment =(req, res, next)=>{
console.log('HERE')
			const payment = new payments({
				createdBy:req.user._id,
				transaction:req.data.transaction._id,
				paymentStatus:req.data.paymentStatus,
				price:req.data.transaction.price,
				dateCreated: new Date(),
			});
			payment.save().then((payment)=>{
				console.log('saved')
					if (payment) {
					const payMentStatus = req.data.paymentStatus === true?"successful":"not successful";
					req.data._id = req.user._id; 
					req.data.loggerUser = "User";
					req.data.logsDescription = `Your payment of ${payment.price} was ${payMentStatus}`;
					req.data.title = "Payment";
					req.data.mailTitle = "Payment Verification"; 
					req.data.link = "/users/transaction/"+req.data.transaction._id;
					req.data.mailMessage = `A payment of ${payment.price.toString().slice(0, -2)}NGN was made by ${req.user.firstname+" "+req.user.lastname} for project ${req.data.transaction.productName}. Please visit the link below and start your project.`;
					next();
					}
			})
}
