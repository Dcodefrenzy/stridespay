
define(function (require, exports, module) {
	
	exports.verifyPayment = (sessionItem, transactionId, reference)=>{
					const {request} = require("../request")
                    request("payments/verify/transaction/"+transactionId, sessionItem, "POST", {reference:reference, transaction:transactionId}, function(response){
                            if (response.status === 200) {
                            console.log(response)
                             window.location = response.redirect;
                            }else{
                              console.log(response)
                                window.location = response.redirect;
                            }
                    })
	}
})