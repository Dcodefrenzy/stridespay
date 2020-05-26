define(function(require, exports, module) {

 exports.handleError = (res, msg)=>{
	console.log(Object.keys(res));

	const keys = Object.keys(res);
	const value = Object.values(res);
	keys.map((error, index)=>{
		document.getElementById(`error-${error}`).innerHTML =`<span class="text-danger">${value[index]} ${msg} enter a valid ${error}.</span>`;
	})
}



});