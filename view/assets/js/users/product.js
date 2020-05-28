define(function(require, exports, module) {

exports.showProductHandller = (token, id)=>{
	const {getRequest} = require("request");
	const {createTransaction}= require("./createTransaction");
	const {loginForm} = require("../logins");
	const {loadPaymentHandller} = require("./getPayment");
	const {copyText} = require("../copyText");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";
	let payMent = {};

			const showProduct=(user,product, milestones, transaction, display)=>{

				const html = `<div class="">
							<div class="container">
								<div class="row align-items-center mt-2 p-0">
									<div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2">
										<div class="card shadow-lg p-3 mb-5 bg-white rounded">
											<div class="card-body row">
											<a href="/users/products">
												<i class="fa fa-arrow-left float-left mt-2 text-dark" aria-hidden="true"></i></a>
												<div class="col-12 col-sm-12 col-md-12 text-center">
													<i class="fa fa-shopping-bag fa-5x" aria-hidden="true"></i>
												</div>
												<div class="col-12 col-sm-12 col-md-12 text-center mt-5">
													<p><i class="fas fa-shopping-basket" aria-hidden="true"></i> ${product.product}</p>
													<p class="text-success">&#8358; ${product.price.slice(0, -2)}</p>
													<p><i class="fa fa-tasks" aria-hidden="false"></i> Milestones</p>
													<ol>
														${milestones.map((milestone, index)=>{
														return `<li class="card shadow-lg p-3 mb-5 bg-white rounded">${index +1} ${milestone.milestone} &#8358; ${product.price.slice(0, -2)}</li>`
														})}
													</ol>
													<div class="col-12">
													<p><i class="fa fa-history" aria-hidden="false"></i> Transactions</p>
															${display}
														<div class="mt-3">${transaction}</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						 </div>`;

		 				body.insertAdjacentHTML('afterbegin', html);
			}

			const load=(response)=>{
				console.log(response.status)
				if (response.status === 401) {
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					let allTransactions;
					let display = response.product.isMerchant === true?`<button onclick="return createTransaction(event, this.id)" class="btn-sm btn-green" id=${"products/transaction/create/"+response.product._id} >New Transaction</button>`:`<a class="btn-sm btn-green"  href=${"/users/product/payment/"+response.product._id}>New Transaction</a>`;
					if (response.transactions.length >0) {
						allTransactions = response.transactions.map((transaction)=>{
							const link = transaction.buyer===response.user._id?	"/users/merchant/"+response.user.name.replace(" ", "-")+"/token/"+transaction._id:"/users/buyer/"+response.user.name.replace(" ", "-")+"/token/"+transaction._id;
							return	`<div class="card shadow-lg p-3  bg-white rounded">
											<small>Copy unique transaction token and Share to your clients/merchants</small>
										<input class="form-control" id=${transaction._id} type="text" value=${window.location.hostname+link} readonly="readonly"/>
										<button onclick="return copyText(this.value)" value=${transaction._id} class="mt-2 col-12 col-sm-5 offset-sm-3 col-md-5 offset-md-3 btn-sm btn-green ">Copy</button>
									 </div>`;
										})
					}else{
						allTransactions	 =  `<li class="card shadow-lg p-3 bg-white rounded">No Transaction Token Yet</li>`;
					}
					showProduct(response.user, response.product, response.milestones, allTransactions, display);
				}
			}

			getRequest("products/"+id, token, "GET", load);

	}







});