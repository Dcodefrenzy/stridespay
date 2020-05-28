  define(function(require, exports, module) {
    const {request}  = require("../request")
    const {loading} = require("../loading")
    let sessionItem = sessionStorage.getItem("user")!=="undefined"?JSON.parse(sessionStorage.getItem("user")):{"token":"No token"}; 


  exports.payWithPaystack = (payment, id)=>{
   let email = payment.user.email === undefined?"paymerchantafrica@gmail.com":payment.user.email;

console.log(id)
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
              loading("spinner", "");
          request("payments/verify/"+payment.product._id, sessionItem, "POST", {reference:response.reference, transaction:id}, function(response){
                      if (response.status === 201) {
                      console.log(response)
                        window.location = response.redirect;
                      }else{
                        console.log(response)
                          window.location = response.redirect;
                      }
              })       
        },
 
      });
      handler.openIframe();

  }




});

