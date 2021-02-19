
define(function(require, exports, module) {

	exports.showToggle=()=>{

		const togg = document.getElementById("togg");
		const html=`
    	<div class="dsh-aside-toggler dsh-toggler">
	      <span class="dsh-toggler-bar bg-dark"></span>
	      <span class="dsh-toggler-bar bg-dark"></span>
	      <span class="dsh-toggler-bar bg-dark"></span>
	    </div>`

			 	togg.insertAdjacentHTML('afterbegin', html);
		 }
	


	});


