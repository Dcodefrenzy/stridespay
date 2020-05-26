define(function(require, exports, module) {


const mailValidation = (value, name)=>{
	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!value.match(mailformat)) {
			document.getElementById(`error-${name}`).innerHTML =`<span class="text-danger">${name} must be more valid</span>`;

		}
}

const passwordValidation =(value, name)=>{
	const lenghtValue = 6;
	if (value.length < lenghtValue) {
		document.getElementById(`error-${name}`).innerHTML =`<span class="text-danger">${name} must be more than ${lenghtValue}</span>`;
	}
}
const phoneValidation =(value, name)=>{
	const lenghtValue = 11;
	if (value.length !== lenghtValue) {
		document.getElementById(`error-${name}`).innerHTML =`<span class="text-danger">${name} must be more than ${lenghtValue}</span>`;
	}
}

return returnValidation = (val, name)=>{
		if (val === "") {
			document.getElementById(`error-${name}`).innerHTML =`<span class="text-danger">Please provide your ${name}</span>`;
		}else{
			document.getElementById(`error-${name}`).innerHTML = `<span class="text-success">${name.charAt(0).toUpperCase()+name.slice(1)}</span>`;
		}

		if (name === "password") {
			passwordValidation(val, name);
		}
		if (name === "phonenumber") {
			phoneValidation(val, name);
		}
		if (name === "email") {
			mailValidation(val, name);
		}

	}






});