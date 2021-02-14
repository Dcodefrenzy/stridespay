define(function(require, exports, module) {
		 
	return deleteService =(event, id,  token, tokenId)=>{
	const {getRequest} = require("request");
	const {sideBar} = require("../sidebar");
	const {loading} = require("../../loading");
	const {loginForm} = require("../../logins");
	const {deleteHandler} = require("../../deleteHandler");
	const body = document.getElementById("body");
	const spinner = document.getElementById("service");

	spinner.className ="display-none";
		const deleteServiceHandler = (service)=>{

					const html = `<div id="revert" class="bg-background container">
				<div class="container">
				<div id="loading"></div>
					<div class="row mt-2 p-3">
					<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
				<a href=${`/users/services/${service._id}`}><i class="fa fa-arrow-left text-dark"></i></div></a>
					</div>
				<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
					<h1>Delete Service</h1>
					<p class="text-dark">Do you want to delete this  Service</p>
					<small>Deleted services are kept in the trash and can be recovered.</small>
					<h3>${service.product.toUpperCase()}</h3>
					<p>${service.price.toString().slice(0, -2)}</p>
					<p>${service.description}</p>
						<div class="row justify-content-center">
								<button class="btn-sm btn-green col-md-5 col-sm-6 col-12 m-1" id=${`/users/services/${service._id}`} value="No" name=${token}  onclick="return deleteHandler(event, this.id, this.value, this.name)">No</button>
								<button  class="btn-sm btn-danger col-md-5 col-sm-6 col-12 m-1" id=${"products/service/delete/"+service._id} value="Yes" name=${token}  onclick="return deleteHandler(event, this.id, this.value, this.name)">Yes</button>
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
					deleteServiceHandler(response.service);
				}
			}


			getRequest("products/service/"+id, {token:token, _id:""}, "GET", load);
	}



});