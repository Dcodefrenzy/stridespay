define(function(require, exports, module) {

exports.serviceTokens = (token, id)=>{
	const {getRequest} = require("request");
	const {loading} = require("../../loading");
	const {sideBar} = require("../sidebar");
	const {createTransaction} = require("./createTransaction");
	const {loginForm} = require("../../logins");
	const {loadPaymentHandller} = require("../getPayment");
	const {copyText} = require("../../copyText");
	const {createMilestone} = require("./createMilestone");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";

			const showService=(transaction, milestones, user)=>{
				sideBar(token, id);
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
													<p class="">Token ID ${id}</p>
												</div>												
												<div class="col-12 col-sm-12 col-md-12 text-center">
													<h1>Milestones 
														<i class="fa fa-tasks" aria-hidden="true"></i>
													</h1>
												</div>
													${milestones.map((milestone)=>{
														return `<div class="col-12 col-sm-12 col-md-12 mt-3">

														<h5 class="" aria-hidden="true"> ${milestone.milestone} &#8358; ${milestone.price.toString().slice(0, -2)}</h5>
														<p class="display-block">${milestone.description}</p>
														<hr></div>`
														})}
													<div class="col-12 col-sm-12 col-md-12 mt-3">
														<form>
    													<script src="https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"></script>		
														  <h4 class="">Total price - &#8358; ${transaction.price.toString().slice(0, -2)}</h4> 
														  <button  id=${transaction._id} value=${"transactions/payment/token/"+transaction._id} class="btn btn-lg btn-green" type="button" onclick="return loadPaymentHandller(this.id, this.value)"> Pre Payment </button>
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

			const load=(response)=>{

				if (response.status === 401) {
						loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200 && response.transaction.paymentStatus !== true) {
					console.log(response)
					showService(response.transaction, response.transaction.milestones, response.user);
				}else if (response.status === 200 && response.transaction.paymentStatus === true) {
					alert("Yay you have paid for this Transaction already.");

                    window.location = "/users/transactions";
				}
			}

			getRequest("transactions/service/token/"+id, token, "GET", load);

	}







});