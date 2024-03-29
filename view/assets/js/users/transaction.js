define(function(require, exports, module) {

  const {loginForm} = require("../logins");
  const {loading} = require("../loading");
exports.productPaymentHandller = (token, id)=>{
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";

			const showPaymentProduct=(user,product, milestones)=>{

				const html = `<div class="">
							<div class="container">
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2">
										<div class="card shadow-lg p-3 mb-5 bg-white rounded">
											<div class="card-body row">
												<i class="fa fa-arrow-left float-left mt-2" aria-hidden="true"></i>
												<div class="col-12 col-sm-12 col-md-12 text-center">
													<i class="fa fa-shopping-bag fa-10x" aria-hidden="true"></i>
												</div>
												<div class="col-12 col-sm-12 col-md-12 text-center mt-5">
													<p><i class="fas fa-shopping-basket" aria-hidden="true"></i> ${product.product}</p>
													<p class="text-success">&#8358; ${product.price.slice(0, -2)}</p>
													<p><i class="fa fa-tasks" aria-hidden="false"></i> Milestones</p>
													<ol>
														${milestones.map((milestone)=>{
														return `<li>${milestone.milestone} &#8358; ${product.price.slice(0, -2)}</li>`
														})}
													</ol>
													<div class="col-12">
													<form>
													  <script src="https://js.paystack.co/v1/inline.js"></script>
													  <button  id=${product._id} class="btn btn-lg btn-green" type="button" onclick="return loadPaymentHandller(this.id)"> Pre Payment </button> 
													</form>
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
					
					loading("user-side-bar-open", "display-none");
                const body = document.getElementById("body");
                  body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					payMent = {price:response.product.price, _id:response.product._id, }
					showPaymentProduct(response.user, response.product, response.milestones);
				}
			}

			getRequest("products/"+id, token, "GET", displayPayment);

	}







});