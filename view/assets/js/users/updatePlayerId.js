define(function (require, exports, modules) {
	const {request} = require("../request");
	exports.updateNotification=(token)=>{

	const OneSignal = window.OneSignal || []; 
		OneSignal.push(function() { 
			OneSignal.getUserId().then(function(userId) {
				console.log(userId);
					 request("users/update/notification/", token, "POST", {playerId:userId}, (response)=>{
							console.log(response)
						});
			})
		});
	}	

})