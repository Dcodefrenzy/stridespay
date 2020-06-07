

define(function (require, exports, module) {
	
	exports.verifyPaymentProduct = (sessionItem, productId, reference)=>{
                    const {request}  = require("../request");


                    request("payments/verify/"+productId, sessionItem, "POST", {reference:reference, transaction:productId}, function(response){
                            if (response.status === 200) {
                        
                             window.location = response.redirect;
                            }else{
                             
                                window.location = response.redirect;
                            }
                    })
	}
})