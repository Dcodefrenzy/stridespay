define(function (require, exports, module) {
    const {request} = require("../request");
  const {loginForm} = require("../logins");
  const {loading} = require("../loading");
    return startTransfer = (event, url, redirect)=>{
      event.preventDefault();
      const sessionItem = JSON.parse(sessionStorage.getItem("user")) !== null?JSON.parse(sessionStorage.getItem("user")):{"token":"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"}; 
  
          loading("spinner", "");

           request("withdraws/initiate", sessionItem, "POST", {"no data":"no data"}, (res)=>{
               if (res.status === 201) {
                alert("Payment was Successful.")
                window.location = "/users/dashboard";

              }else if (res.status === 401) {
                  loading("spinner", "display-none");
                const body = document.getElementById("body");
                  body.insertAdjacentHTML('afterbegin', loginForm);
              }else if(res.status === 404) {
                loading("spinner", "display-none");
                alert(res.message)
                window.location = redirect;

              }else if (res.status === 400) {
                alert(res.message)
               
               // window.location = redirect;
              }else if (res.status === 403 && res.error === "wallet") {
                alert(res.message);
                window.location = "/users/dashboard";
              }
        });

    }
})