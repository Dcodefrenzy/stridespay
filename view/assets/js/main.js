define(function(require, exports, module) {
			const body = document.getElementById("app");
			let {returnValidation} = require("formValidation");
			let {register} = require("submit");
		  	let {buyersForm} = require('buyers');
		  	let {merchantForm} = require('merchants');
		  	let {subscribersForm} =require("users/subscribers");
		  	let {loginForm} = require('logins');
		  	let {load} = require("loadFile");
		  	let {loading} = require("./loading");
			let {createProduct} = require('users/createProduct');
			let {showNotification}= require("users/showNotification");
			let sessionItem = sessionStorage.getItem("user")!=="undefined"?JSON.parse(sessionStorage.getItem("user")):{"token":"No token"}; 


			showNotification();
		const buyers = Array.from(document.getElementsByClassName("buyers"));
		const subsciber = Array.from(document.getElementsByClassName("subscribe"));
		const merchants = Array.from(document.getElementsByClassName("merchants"));
		const logins = Array.from(document.getElementsByClassName("user-login"));
		const closeSideBars = Array.from(document.getElementsByClassName("close-side-bar"));
		const openSideBar = document.getElementById("open-side-bar");
		const useropenSideBar = document.getElementById("user-open-side-bar");
		const userCloseSideBar = document.getElementById("user-close");


	let displayHtml = (event, html)=>{
		event.preventDefault();
		body.insertAdjacentHTML('afterbegin', html);
		loading("body", "display-none");
	}

	let openSideBarFunc = (event)=>{
		event.preventDefault();
		const sideBarOpen = document.getElementById("side-bar-open");
		sideBarOpen.classList.remove("display-none");
	}
	let closeSideBarFunc = (event)=>{
		event.preventDefault();
		const sideBarOpen = document.getElementById("side-bar-open");
		sideBarOpen.classList.add("display-none");

	}

	let openUserSideBarFunc= (event)=>{
		event.preventDefault();
		const userSideBarOpen = document.getElementById("user-side-bar-open");
		userSideBarOpen.classList.remove("nav-hide");
		userCloseSideBar.classList.remove("display-none");

	}

	let closeUserSideBarFunc=(event)=>{
		event.preventDefault();
		console.log('jj')
		const sideBarOpen = document.getElementById("user-side-bar-open");
		sideBarOpen.classList.add("nav-hide");
		userCloseSideBar.classList.add("display-none");


	}


	if (openSideBar !== null) {
		openSideBar.addEventListener('click', openSideBarFunc, false);
	}

	if (useropenSideBar !== null) {
		useropenSideBar.addEventListener('click', openUserSideBarFunc, false);
	}
	if (userCloseSideBar !== null) {
			userCloseSideBar.addEventListener('click', closeUserSideBarFunc, false)
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
	subsciber.map((subscribe)=>{
		subscribe.addEventListener("click", event=>displayHtml(event, subscribersForm), false)
	});
	closeSideBars.map((closeSideBar)=>{
			closeSideBar.addEventListener('click', closeSideBarFunc, false)

	})




});