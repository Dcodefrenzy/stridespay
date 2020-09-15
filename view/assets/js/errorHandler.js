define(function(require, exports, module) {

 exports.handleError = (res, msg)=>{
		if (res.status) {
			delete res.status;
		}
	const keys = Object.keys(res);
	const value = Object.values(res);
	keys.map((error, index)=>{

		document.getElementById(`error-${error}`).innerHTML =`<span class="text-danger">${value[index]} ${msg} enter a valid ${error}.</span>`;
	})
}



});