define(function (require, exports, modules) {
	
	exports.showNotification=()=>{
	const body = document.getElementById("body");
	const OneSignal = window.OneSignal || []; 
	
	}
})

OneSignal.push(["getNotificationPermission", function(permission) {
    console.log("Site Notification Permission:", permission);
    // (Output) Site Notification Permission: default)
				if (permission !== "granted") {		
					/*OneSignal.registerForPushNotifications({
					        modalPrompt: true
					    });*/
					    console.log(permission)

				}else {
					console.log(permission);
				}
}]);