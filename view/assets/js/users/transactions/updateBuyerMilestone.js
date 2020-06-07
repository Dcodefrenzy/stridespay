define(function (require, exports, module) {
    const {request} = require("../../request");
  const {loginForm} = require("../../logins");
  const {loading} = require("../../loading");
    return updateBuyerMilestone = (event, id, milestone, index)=>{
      event.preventDefault();
      const sessionItem = JSON.parse(sessionStorage.getItem("user")) !== null?JSON.parse(sessionStorage.getItem("user")):{"token":"eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0"}; 
  
          loading("spinner", "");

           request("transactions/buyer/update/milestone", sessionItem, "PATCH", {id:id, milestoneId:milestone, index:index}, (res)=>{
               
               if (res.status === 201) {
                alert("You have completed a payment, HURRAY!!!")
                location.reload();
              }else if (res.status === 401) {
                  loading("spinner", "display-none");
                const body = document.getElementById("body");
                  body.insertAdjacentHTML('afterbegin', loginForm);
              }else if(res.status === 404) {
                loading("spinner", "display-none");
                alert(res.message)
                window.location = redirect;
              }
        });

    }
})