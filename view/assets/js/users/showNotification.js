define(function (require, exports, modules) {
	
	exports.showNotification=()=>{
	const body = document.getElementById("body");


		html =`<div class=""><div class='onesignal-customlink-container fixed-top  notification  mt-5'></div></div>`

		 	body.insertAdjacentHTML('afterbegin', html);
	}
})