define(function(require, exports, module) {

exports.showProductHandller = (token, id)=>{
	const {getRequest} = require("request");
	const {loading} = require("../loading");
	const {createTransaction}= require("./createTransaction");
	const {loginForm} = require("../logins");
	const {loadPaymentHandller} = require("./getPayment");
	const {copyText} = require("../copyText");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	const {sideBar} = require("./sidebar");
	const {deleteTransaction} = require('./freelancers/deleteServiceToken');
	const {editProduct} = require("./freelancers/editProduct");
	const {deleteProduct} = require("./freelancers/deleteProduct");
	spinner.className ="display-none";
	let payMent = {};

			const showProduct=(user,product, milestones, transaction, display)=>{
				
				sideBar(token, id);
				const html = `<div class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1" id="product">
								<!-- Breadcrumbs -->
								<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
									<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
										<h1>Product Details</h1>
										<ol class="breadcrumb style-1">
												<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
												<li class="breadcrumb-item"><a href="/users/projects">Projetcs</a></li>
												<li class="breadcrumb-item" aria-current="page">Product</li>
										</ol>
									</div>
								</div>

								<div class="dsh-product-details">

									<div class="card">
										<div class="card-body">
											<div class="row">
												<div class="col-lg-8">
													<div class="dsh-product-content">

														<!-- Product Title -->
														<h2>${product.product}</h2>
														<!-- /Product Title -->

														<!-- Product Short Description -->
														<p>${product.description}</p>
														<!-- /Product Short Description -->

														<!-- Price -->
														<div class="dsh-price-wrapper">
															<p class="dsh-price">&#8358; ${product.price.slice(0, -2)}</p>
															
														</div>
														<!-- /Price -->

														<hr class="dsh-seperator">

														<!-- Variations -->
														<div class="dsh-product-variations-wrapper">
															<a id=${id} class="btn-sm btn-green col-md-6 col-sm-6 col-12 m-1 text-white" target=${token.token} name=${token._id} onclick="return editProduct(event, this.id, this.target, this.name)">Update  <i class="fas fa-edit" aria-hidden="true"></i></a>
															<a id=${id} class="btn-sm btn-danger col-md-6 col-sm-6 col-12 m-1 text-white" target=${token.token} name=${token._id} onclick="return deleteProduct(event, this.id, this.target, this.name)">Delete  <i class="fas fa-trash" aria-hidden="true"></i></a>
														</div>
														<!-- /Variations -->

														<hr class="dsh-seperator">

														<!-- Product Meta -->
														<ul class="product-meta">
															${milestones.map((milestone, index)=>{
															return `<li>
																<span>Milestone:</span>
																<div class="dsh-product-meta-item">
																	<a href="#" class="btn-link">${milestone.milestone}</a>
																</div>
															</li>
															<li>
																<span>Description: </span>
																<div class="dsh-product-meta-item">
																	<a href="#" class="btn-link">${milestone.description}</a>
																</div>
															</li>`;
															})}
														</ul>
														<!-- /Product Meta -->

													</div>
												</div>
												<div class="col-lg-4">
													<div class="dsh-product-thumb">

														<!-- Main Thumb -->
														<div class="dsh-product-primary-thumb">
															<div class="thumb dsh-slider-item">
																<span class="btn btn-icon btn-lg btn-success-light btn-round mb-3">
																	<i class="lni-book icon-2x"></i>
																</span>
																<h5 class="card-title">Contract</h5>
																<p class="mb-3">You can share a contract link with your client.</p>
																${display}
															</div>
																${transaction}
														</div>
														<!-- /Main Thumb -->

													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

							</div>`;

		 				body.insertAdjacentHTML('beforeend', html);
			}

			const load=(response)=>{
					//console.log(response)
				if (response.status === 401) {
					loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					let allTransactions;
					let display = response.product.isMerchant === true?`<a onclick="return createTransaction(event, this.id)" class="btn btn-success text-white" id=${"products/transaction/create/"+response.product._id} >New Transaction</a>`:`<a class="btn btn-success text-white"  href=${"/users/product/payment/"+response.product._id}>New Transaction</a>`;
					if (response.transactions.length >0) {
						allTransactions = response.transactions.map((transaction)=>{
							const link = transaction.buyer===response.user._id?	"/users/merchant/"+response.user.name.replace(" ", "-")+"/token/"+transaction._id:"/users/buyer/"+response.user.name.replace(" ", "-")+"/token/"+transaction._id;
							return	`<small>Copy unique transaction token and Share to your clients/merchants</small>
										<input class="form-control" id=${transaction._id} type="text" value=${window.location.hostname+link} readonly="readonly"/>
										<button onclick="return copyText(this.value)" value=${transaction._id} class="mt-2 col-12 col-sm-12  col-md-12  btn-sm btn-green ">Copy</button>
										<button type="button" class="mt-2 col-12 col-sm-12 col-md-12  btn-sm btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="You can only delete an unused payment token" id=${transaction._id} value="product" name=${token.token} onclick='return deleteTransaction(event, this.id, this.value, this.name)'>Delete</button>
											<div style="margin-top:5px;" class="">
							                  		<p>Share to social media. Client</p>
										            <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${window.location.hostname+link}&quote=Product Name: ${transaction.productName} Product description: ${transaction.description.replace(/(<([^>]+)>)/gi, "")} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)}"  id="blake" class="facebookLink"><i class="fab fa-facebook-f"></i></a>
										            <a target="_blank" href="https://www.linkedin.com/sharing/share-offsite/?url=${window.location.hostname+link}&title=${transaction.productName}" class="linkdinLink"><i class="fab fa-linkedin-in"></i></a>
										            <a target="_blank" href="mailto:?subject=Product Title: ${transaction.productName}&amp;body=Product description: ${transaction.description.replace(/(<([^>]+)>)/gi, "")} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)} Link: ${window.location.hostname+link}" class="gmailLink"><i class="fa fa-envelope"></i></a>
										            <a target="_blank" href="whatsapp://send?text=@Product Title: ${transaction.productName} Product description: ${transaction.description.replace(/(<([^>]+)>)/gi, "")} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)} -  ${window.location.hostname+link}" data-action="share/whatsapp/share" class="whatsappLink"><i class="fab fa-whatsapp"></i></a>
							                </div>`;
										})
					}else{
						allTransactions	 =  `<li class="card shadow-lg p-3 bg-white rounded">No Transaction Token Yet</li>`;
					}
					showProduct(response.user, response.product, response.milestones, allTransactions, display);
				}
			}

			getRequest("products/product/"+id, token, "GET", load);

	}







});