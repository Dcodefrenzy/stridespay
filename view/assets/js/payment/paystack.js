  define(function(require, exports, module) {
    const {request}  = require("../request")
    const {loading} = require("../loading")
    let sessionItem = sessionStorage.getItem("user")!=="undefined"?JSON.parse(sessionStorage.getItem("user")):{"token":"No token"}; 


  exports.payWithPaystack = (payment, id, url)=>{
   let email = payment.user.email === undefined?"paymerchantafrica@gmail.com":payment.user.email;


  var handler = PaystackPop.setup({
        key: 'pk_test_511eb9851944a653141f6b6f99a57954b4738a55',
        email: email,
        phone:payment.user.phonenumber,
        amount: payment.transaction.price,
        currency: "NGN",
        ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        metadata: {
           custom_fields: [
              {
                  display_name: payment.user.name,
                  variable_name:payment.user.phonenumber,
                  value: payment.transaction.productName
              }
           ]
        },
        callback: function(response){  
           alert('success. transaction ref is ' + response.reference);
              loading("spinner", "");
          request(url, sessionItem, "POST", {reference:response.reference, transaction:id}, function(response){
                      if (response.status === 200) {
                   
                       window.location = response.redirect;
                      }else{
                       
                          window.location = response.redirect;
                      }
              })       
        },
 
      });
      handler.openIframe();

  }

  exports.flutterwave = (payment, id, url)=>{
   let email = payment.user.email === undefined?"paymerchantafrica@gmail.com":payment.user.email;
        var x = getpaidSetup({
            PBFPubKey: "FLWPUBK_TEST-10ea59347252ad28408d18b34a000edc-X",
            customer_email: email,
            amount: payment.transaction.price.toString().slice(0, -2),
            customer_phone: payment.user.phonenumber,
            currency: "NGN",
            txref: ''+Math.floor((Math.random() * 1000000000) + 1),
            meta: [{
                metaname: "customer name",
                metavalue: payment.user.name
            }],
            onclose: function() {},
            callback: function(response) {
                var txref = response.data.data.txRef; // collect txRef returned and pass to a                    server page to complete status check.
                console.log(response)
                if (response.data.data.status === "successful" && response.respcode === "00") {
                  console.log(response.data)

                    window.location = "/users/"+url+"/"+txref;
                } else {
                  console.log(response.data)
                  console.log('err')
                }

                x.close(); // use this to close the modal immediately after payment.
            }
        });
    
  }




});

