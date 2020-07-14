define(function (require, exports, module) {


	return copyText=(id)=>{

	  /* Get the text field */
	  var copyText = document.getElementById(id);

	  /* Select the text field */
	  copyText.select();
	  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

	  /* Copy the text inside the text field */
	  document.execCommand("copy");

	  /* Alert the copied text */
	  alert("Token Copied, you can safely share your token with the person you want to transact with: " + copyText.value);
	}
	
})