define(function(require, exports, module) {
			const body = document.getElementById("app");
			let {returnValidation} = require("formValidation");
			let {register} = require("submit");
		  	let {buyersForm} = require('buyers');
		  	let {merchantForm} = require('merchants');
		  	let {loginForm} = require('logins');
		  	let {load} = require("loadFile");
			let {createProduct} = require('users/createProduct');
			let {showNotification}= require("users/showNotification");
			let sessionItem = sessionStorage.getItem("user")!=="undefined"?JSON.parse(sessionStorage.getItem("user")):{"token":"No token"}; 


			showNotification();
		const buyers = Array.from(document.getElementsByClassName("buyers"));
		const merchants = Array.from(document.getElementsByClassName("merchants"));
		const logins = Array.from(document.getElementsByClassName("user-login"));


	let displayHtml = (event, html)=>{
		event.preventDefault();
		body.insertAdjacentHTML('afterbegin', html);
	}





		  	
	window.addEventListener('load', load(window.location.pathname), false)
	merchants.map((merchant)=>{
		merchant.addEventListener("click", event=>displayHtml(event, merchantForm), false);

	})
	logins.map((login)=>{
		login.addEventListener("click", event=>displayHtml(event, loginForm), false);
	}); 
	buyers.map((buyer)=>{
		buyer.addEventListener("click", event=>displayHtml(event, buyersForm), false)
	});




});