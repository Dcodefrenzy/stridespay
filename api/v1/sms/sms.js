 var request = require('request');
require('dotenv').config();

exports.sendSms =(req, res, next)=>{
var data = {
            "to":"234"+req.data.phonenumber,
            "from":"PayMerchnat",
            "sms":req.data.mailMessage,
            "type":"plain",
            "api_key":process.env.SMS,
            "channel":"generic"
            };
var options = {
  'method': 'POST',
  'url': 'https://termii.com/api/sms/send',
  'headers': {
    'Content-Type': ['application/json', 'application/json']
  },
  body: JSON.stringify(data)

};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
  next();
});

}