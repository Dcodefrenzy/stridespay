define(function(require, exports, module) {
		 
	return editProduct =(event, id, token, tokenId)=>{
	const {getRequest} = require("request");
	const {sideBar} = require("../sidebar");
	const {loading} = require("../../loading");
	const {loginForm} = require("../../logins");
	const {displayTextEditor} = require('../texteditor');
	const spinner = document.getElementById("product");

	spinner.className ="display-none";
		const editProducteHandller = (product)=>{
					const html = `<div id="revert" class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

			<!-- Breadcrumbs -->
			<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
				<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					<h1>Product</h1>
					<ol class="breadcrumb style-1">
						<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item"><a href=${"/users/products/"+product._id}>Product</a></li>
						<li class="breadcrumb-item" aria-current="page">Update Product</li>
					</ol>
				</div>
			</div>

			<div class="row">

				<div class="col-xl-12">
					<div class="card">
						<div class="card-body">
							<h1>Product</h1>
							<p class="text-dark">Update  Product</p>
							<form id=${"products/product/update/"+product._id} class="editMilestone" name="submitForm" onsubmit="return register(event)">
								<div class="row">
									<div class="col-12 col-sm-12 col-md-12">
										<div class="form-group">
											<label id="error-title">Title</label>
											<input type="text" name="title" value="${product.product}" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="eg design a prototype?">
										</div>
									</div>
									<div class="col-12 col-sm-12 col-md-12">							
										<div class="form-group">
											<label id="error-price">What is the price?</label>
											<input type="Number" name="price" value="${product.price.toString().slice(0, -2)}" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="How much is it?">
										</div>
									</div>
									<div class="col-12 col-sm-12 col-md-12">							
										<div class="form-group" id='textarea-div'>
											<label id="error-description">Description</label>	
											
										</div>
									</div>
									<div class="col-12 col-sm-12 col-md-12">
										<div class="form-group">
											<input type="submit" name=${id} class="form-control btn-lg btn-dark" value="Save">
										</div>
									<div>
								</div>
							</form>
						</div>
					</div>
				</div>

			</div>

		</div>`;
	 body.insertAdjacentHTML('beforeend', html);
	 displayTextEditor(product.description);
		}


	 	const load=(response)=>{
				console.log(response)
				if (response.status === 401) {

				loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					editProducteHandller(response.product);
				}
			}

			getRequest("products/product/"+id, {token:token, _id:tokenId}, "GET", load);
	}



});