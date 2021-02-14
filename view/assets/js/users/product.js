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
				const html = `<div id="product">
							<div class="container">
								<div class="row align-items-center mt-2 p-0">
									<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
										<div class="card bg-background shadow-lg p-3 mb-5 rounded">
											<div class="card-body row">
											<a href="/users/products">
												<i class="fa fa-arrow-left float-left mt-2 text-dark" aria-hidden="true"></i></a>
												<div class="col-12 col-sm-12 col-md-12 text-center">
													<i class="fa fa-shopping-bag fa-5x" aria-hidden="true"></i>
												</div>
												<div class="col-12 col-sm-12 col-md-12 text-center mt-5">
													<p><i class="fas fa-shopping-basket" aria-hidden="true"></i> ${product.product}</p>
													<small>${product.description}</small>
													<p class="text-success">&#8358; ${product.price.slice(0, -2)}</p>
													<div class="row justify-content-center">
															<button id=${id} class="btn-sm btn-green col-md-5 col-sm-6 col-12 m-1" value=${token.token} name=${token._id} onclick="return editProduct(event, this.id, this.value, this.name)">Update  <i class="fas fa-edit" aria-hidden="true"></i></button>
															<button id=${id} class="btn-sm btn-danger col-md-5 col-sm-6 col-12 m-1" value=${token.token} name=${token._id} onclick="return deleteProduct(event, this.id, this.value, this.name)">Delete  <i class="fas fa-trash" aria-hidden="true"></i></button>
													</div>
													<p><i class="fa fa-tasks mt-5" aria-hidden="false"></i> Milestones</p>
													<ol>
														${milestones.map((milestone, index)=>{
														return `<li class="card shadow-lg p-3 mb-5 bg-white rounded">${index +1} ${milestone.milestone}</li>`
														})}
													</ol>
													<div class="col-12">
													<p><i class="fa fa-history" aria-hidden="false"></i> Transactions</p>
															${display}
														<div class="mt-3">
															${transaction}
														</div>
													</div>
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
					let display = response.product.isMerchant === true?`<button onclick="return createTransaction(event, this.id)" class="btn-sm btn-green" id=${"products/transaction/create/"+response.product._id} >New Transaction</button>`:`<a class="btn-sm btn-green"  href=${"/users/product/payment/"+response.product._id}>New Transaction</a>`;
					if (response.transactions.length >0) {
						allTransactions = response.transactions.map((transaction)=>{
							const link = transaction.buyer===response.user._id?	"/users/merchant/"+response.user.name.replace(" ", "-")+"/token/"+transaction._id:"/users/buyer/"+response.user.name.replace(" ", "-")+"/token/"+transaction._id;
							return	`<div class="card shadow-lg p-3  bg-background rounded">
											<small>Copy unique transaction token and Share to your clients/merchants</small>
										<input class="form-control" id=${transaction._id} type="text" value=${window.location.hostname+link} readonly="readonly"/>
										<button onclick="return copyText(this.value)" value=${transaction._id} class="mt-2 col-12 col-sm-5 offset-sm-3 col-md-5 offset-md-3 btn-sm btn-green ">Copy</button>
										<button type="button" class="mt-2 col-12 col-sm-5 offset-sm-3 col-md-5 offset-md-3 btn-sm btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="You can only delete an unused payment token" id=${transaction._id} value="product" name=${token.token} onclick='return deleteTransaction(event, this.id, this.value, this.name)'>Delete</button>
											<div style="margin-top:5px;" class="">
							                  <p style="margin-bottom:2px">Share this with your Client</p>
										                    <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${window.location.hostname+link}&quote=Product Name: ${transaction.productName} Product description: ${transaction.description.replace(/(<([^>]+)>)/gi, "")} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)}"  id="blake" class="facebookLink"><i class="fab fa-facebook-f"></i></a>
										                    <a target="_blank" href="https://www.linkedin.com/sharing/share-offsite/?url=${window.location.hostname+link}&title=${transaction.productName}" class="linkdinLink"><i class="fab fa-linkedin-in"></i></a>
										                    <a target="_blank" href="mailto:?subject=Product Title: ${transaction.productName}&amp;body=Product description: ${transaction.description.replace(/(<([^>]+)>)/gi, "")} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)} Link: ${window.location.hostname+link}" class="gmailLink"><i class="fa fa-envelope"></i></a>
										                    <a target="_blank" href="whatsapp://send?text=@Product Title: ${transaction.productName} Product description: ${transaction.description.replace(/(<([^>]+)>)/gi, "")} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)} -  ${window.location.hostname+link}" data-action="share/whatsapp/share" class="whatsappLink"><i class="fab fa-whatsapp"></i></a>
							                </div>
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