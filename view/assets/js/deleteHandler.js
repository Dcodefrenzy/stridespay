define(function(require, exports, module) {

	return deleteHandler=(event, link, value, token)=>{
	const {getRequest} = require("request");
	const {sideBar} = require("./users/sidebar");
	const {loading} = require("./loading");
	const {loginForm} = require("./logins");
	
		if (value === "No") {
				window.location = link;
				
		}else if (value === "Yes") {
			const load=(response)=>{
				console.log(response)
				if (response.status === 401) {
					loading("user-side-bar-open", "display-none");
					body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 403) {
					alert(response.message.message);
					location.reload();
				} else if (response.status === 200) {
			 		alert("Your delete action was successful.")
					location.reload();
				}
			}
			getRequest(link, {token:token}, "POST", load);
		}
	}
})