define(function(require, exports, module) {
		 
	return deleteProduct =(event, id,  token, tokenId)=>{
	const {getRequest} = require("request");
	const {sideBar} = require("../sidebar");
	const {loading} = require("../../loading");
	const {loginForm} = require("../../logins");
	const {deleteHandler} = require("../../deleteHandler");
	const body = document.getElementById("body");
	const spinner = document.getElementById("product");

	spinner.className ="display-none";
		const deleteProductHandller = (product)=>{

					const html = `<div id="revert" class="bg-background container pt-5">
				<div class="container pt-5">
				<div id="loading"></div>
					<div class="row mt-2 p-3">
					<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
				<a href=${`/users/products/${product._id}`}><i class="fa fa-arrow-left text-dark"></i></div></a>
					</div>
				<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
					<h1>Delete Product</h1>
					<p class="text-dark">Do you want to delete this  Product</p>
					<small>Deleted Product are kept in the trash and can be recovered.</small>
					<h3>${product.product.toUpperCase()}</h3>
					<p>${product.price.toString().slice(0, -2)}</p>
					<p>${product.description}</p>
						<div class="">
								<button class="btn-sm btn-green col-md-5 col-sm-12 col-12 m-1" id=${`/users/products/${product._id}`} value="No" name=${token}  onclick="return deleteHandler(event, this.id, this.value, this.name)">No</button>
								<button  class="btn-sm btn-danger col-md-5 col-sm-12 col-12 m-1" id=${"products/product/delete/"+product._id} value="Yes" name=${token}  onclick="return deleteHandler(event, this.id, this.value, this.name)">Yes</button>
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
					deleteProductHandller(response.product);
				}
			}


			getRequest("products/product/"+id, {token:token, _id:""}, "GET", load);
	}



});