define(function(require, exports, module) {

exports.displayBuyerToken = (token, id)=>{
	const {getRequest} = require("request");
	const {loginForm} = require("../logins");
	const {loading} = require("../loading");
	const {startTransaction} = require("./startTransaction");
	const {loadPaymentHandller} = require("./getPayment");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";


			const showTransaction=(transaction, milestones, user)=>{
				
				loading("user-side-bar-open", "display-none");
				loading("user-open-side-bar", "display-none");
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
												<div class="col-12 col-sm-12 col-md-12 float-right mt-3">
													<p>Payment Link Created</p>
													<p class="text-strides">By ${transaction.creator}</p>
													<p class="">+234 ${user.phonenumber}</p>
													<p class=""> ${user.email}</p>
													<p class=""> Created ${moment(transaction.dateCreated).format("L")}</p>
													<p class="">ID ${id}</p>
												</div>
												
												<div class="col-12 col-sm-12 col-md-12  mt-5">
													<p><i class="fas fa-shopping-basket" aria-hidden="true"></i> Product: ${transaction.productName}</p>
													<p class="text-success">Total price - &#8358;  ${transaction.price.toString().slice(0, -2)}</p>
													<div class="card card-body">
														<p> <i class="fa fa-tasks" aria-hidden="true"></i> Milestones</p>
													</div>
													<ol>
														${milestones.map((milestone)=>{
														return `<li class="p-3 mb-2 bg-white rounded">
															<p>
														<i class="fa fa-circle text-green" aria-hidden="true"> ${milestone.milestone} </i></p> 
															<span class="display-block float-left">${milestone.description}</span>
															<span class="float-right">&#8358; ${milestone.price.toString().slice(0, -2)}</span>
														</li>`
														})}
													</ol>
													<div class="col-12 text-center">
													<form>
													  <script src="https://js.paystack.co/v1/inline.js"></script>
													  <button  id=${transaction._id} value=${"transactions/payment/token/"+transaction._id} class="btn btn-lg btn-green text-center" type="button" onclick="return loadPaymentHandller(this.id, this.value)">Payment </button> 
													</form>
													<p>Secured by <a href="https://stridespay.com" class="text-dark" target="_blank">stridespay</a></p>
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
				console.log(response)
				if (response.status === 401) {
					loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					showTransaction(response.transaction, response.transaction.milestones, response.user);
				}else if (response.status === 403) {
					alert(response.message);
					window.location = "/"
				}
			}

			getRequest("transactions/buyer/token/"+id, token, "GET", displayTransaction);

	}







});