define(function(require, exports, module) {

exports.displayMerchantToken = (token, id)=>{
	const {getRequest} = require("request");
	const {loginForm} = require("../logins");
	const {startTransaction} = require("./startTransaction");
	const {loadPaymentHandller} = require("./getPayment");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";


			const showTransaction=(transaction, milestones)=>{
				const paymentStatus = transaction.paymentStatus == true?"Paid":"Not yet Paid";
				const html = `<div class="">
							<div class="container">
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2">
										<div class="card shadow-lg p-3 mb-5 bg-white rounded">
											<div class="card-body row">
											<div class="col-12 col-sm-12 col-md-12">
												<img width="10%" src="/assets/images/fav1.png" class="text-center float-left"/>
												<a href="https://stridespay.com" class="float-right text-dark" target="_blank">stridespay</a>
											</div>
												<div class="col-12 col-sm-12 col-md-12 text-center">
													<i class="fa fa-shopping-bag fa-5x" aria-hidden="true"></i>
												</div>
												<div class="col-12 col-sm-12 col-md-12 text-center mt-5">
													<p>By ${transaction.creator}</p>
													<p>Created ${moment(transaction.dateCreated).fromNow()}</p>
													<p><i class="fas fa-shopping-basket" aria-hidden="true"></i> ${transaction.productName}</p>
													<p class="text-success">Total price - &#8358;  ${transaction.price.toString().slice(0, -2)}</p>
													<p class="text-success"><i class="fa fa-credit-card" aria-hidden="true"></i> ${paymentStatus}</p>
													<p><i class="fa fa-tasks" aria-hidden="false"></i> Milestones</p>
													<ol>
														${milestones.map((milestone)=>{
														return `<li class="card shadow-lg p-3 mb-2 bg-white rounded">
														<i class="fa fa-circle text-green" aria-hidden="true"> ${milestone.milestone} &#8358; ${milestone.price.toString().slice(0, -2)}</i> 
															<span class="display-block">${milestone.description}</span>
														</li>`
														})}
													</ol>
													<div class="col-12">
													  <button onclick="startTransaction(event, this.id, this.value)" value="/users/dashboard"  id=${"transactions/start/"+transaction._id} class="btn btn-lg btn-green" type="button" onclick=""> Start Transaction</button> 
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

			const displayTransaction=(response)=>{
			
				if (response.status === 401) {
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					showTransaction(response.transaction, response.transaction.milestones);
				}
			}

			getRequest("transactions/merchant/token/"+id, token, "GET", displayTransaction);

	}







});