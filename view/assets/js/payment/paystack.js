  define(function(require, exports, module) {
    const {request}  = require("../request")
    const {loading} = require("../loading")
  const sessionItem = JSON.parse(sessionStorage.getItem("user")) !== null?JSON.parse(sessionStorage.getItem("user")):{"token":"No token"}; 

  exports.payWithPaystack = (payment)=>{
   let email = payment.user.email === undefined?"paymerchantafrica@gmail.com":payment.user.email;

console.log(email)
  var handler = PaystackPop.setup({
        key: 'pk_test_511eb9851944a653141f6b6f99a57954b4738a55',
        email: email,
        phone:payment.user.phonenumber,
        amount: payment.product.price,
        currency: "NGN",
        ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        metadata: {
           custom_fields: [
              {
                  display_name: payment.user.name,
                  variable_name:payment.user.phonenumber,
                  value: payment.product.product
              }
           ]
        },
        callback: function(response){  
          
            alert('success. transaction ref is ' + response.reference);
          request("payments/verify/"+payment.product._id, sessionItem, "POST", {reference:response.reference}, function(response){
                      if (response.status === 201) {
                        window.location = response.redirect;
                      }else{
                          window.location = response.redirect;
                      }
              })       
        },
 
      });
      handler.openIframe();

  }




});

