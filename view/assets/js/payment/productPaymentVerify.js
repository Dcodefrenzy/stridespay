

define(function (require, exports, module) {
	
	exports.verifyPaymentProduct = (sessionItem, productId, reference)=>{
                    const {request}  = require("../request");


                    request("payments/verify/"+productId, sessionItem, "POST", {reference:reference, transaction:productId}, function(response){
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