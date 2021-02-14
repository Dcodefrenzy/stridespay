define(function(require, exports, module) {
		 
	return deleteTransaction =(event, id, hide, token)=>{
	const {getRequest} = require("request");
	const {sideBar} = require("../sidebar");
	const {loading} = require("../../loading");
	const {loginForm} = require("../../logins");
	const {deleteHandler} = require("../../deleteHandler");
	console.log(hide)
	const body = document.getElementById("body");
	const spinner = document.getElementById(hide);

	spinner.className ="display-none";
		const deleteMilestoneHandler = (paymentToken)=>{
				let link;
				if (paymentToken.isService === true) {
					link = "services";
				}else if (paymentToken.isService === false) {
					link = "products";
				}
					const html = `<div id="revert" class="bg-background container">
				<div class="container">
				<div id="loading"></div>
					<div class="row mt-2 p-3">
					<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
				<a href=${`/users/${link}/${paymentToken.product}`}><i class="fa fa-arrow-left text-dark"></i></div></a>
					</div>
				<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
					<h1>Delete Milestone</h1>
					<p class="text-dark">Do you want to delete this  Payment token</p>
					<small>Remember that a deleted payment token can not be used again.</small>
					<h3>${paymentToken.productName.toUpperCase()}</h3>
					<p>${paymentToken.price.toString().slice(0, -2)}</p>
						<div class="row justify-content-center">
								<button class="btn-sm btn-green col-md-5 col-sm-6 col-12 m-1" id=${`/users/${link}/${paymentToken.product}`} value="No" name=${token}  onclick="return deleteHandler(event, this.id, this.value, this.name)">No</button>
								<button  class="btn-sm btn-danger col-md-5 col-sm-6 col-12 m-1" id=${"transactions/delete/token/"+paymentToken._id} value="Yes" name=${token}  onclick="return deleteHandler(event, this.id, this.value, this.name)">Yes</button>
						</div>
				</div>
			</div>
		</div>
	 </div>`;
	 body.insertAdjacentHTML('beforeend', html);
		}


	 	const load=(response)=>{
				console.log(response)
				if (response.status === 401) {

				loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					deleteMilestoneHandler(response.transaction);
				}
			}

			getRequest("transactions/read/token/"+id, {token:token, _id:""}, "GET", load);
	}



});