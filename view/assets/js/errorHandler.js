define(function(require, exports, module) {

 exports.handleError = (res, msg)=>{
		if (res.status) {
			delete res.status;
		}
		console.log(res)
	const keys = Object.keys(res);
	const value = Object.values(res);
	keys.map((error, index)=>{
		console.log(value)
		document.getElementById(`error-${error}`).innerHTML =`<span class="text-danger">${value[index].message} ${msg} enter a valid ${error}.</span>`;
	})
}



});