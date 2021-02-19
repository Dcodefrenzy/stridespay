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
	const nav = document.getElementById("user-side-bar-open")
	spinner.className ="display-none";
	nav.className = "display-none";

			const showService=(transaction, milestones, user)=>{

				const html = `<div class="">
							<div class="container">
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1">
										<div class="card shadow-lg p-3 mb-5 bg-background rounded">
											<div class="card-body row">
											<div class="col-12 col-sm-12 col-md-12">
												<img width="10%" src="/assets/images/fav1.png" class="text-center float-left"/>
												<a href="https://stridespay.com" class="float-right text-dark" target="_blank">powered by stridespay</a>
											</div>

												<div class="col-12 col-sm-12 col-md-12 float-right mt-3">
													<h1>${transaction.productName.toUpperCase()}</h1>
													<p><b>Overview: </b>${transaction.description}</p>
													<p class="text-strides">By ${transaction.creator}</p>
													<p class="">+234 ${user.phonenumber}</p>
													<p class=""> ${user.email}</p>
													<p class=""> Created ${moment(transaction.dateCreated).format("L")}</p>
													<p class="">Token: ID-${id}</p>
												</div>												
												<div class="col-12 col-sm-12 col-md-12 text-center">
													<h1>Milestones 
														<i class="fa fa-tasks" aria-hidden="true"></i>
													</h1>
												</div>
												<div class="col-lg-12">

													<!-- Basic timeline -->
													<div class="">
														<div class="card-body">
															<div class="dsh-section-title">
																<h5 class="card-title">Project timeline</h5>
															</div>
															<ul class="dsh-timeline">
																${milestones.map((milestone, index)=>{
																		console.log(milestone._id)
																		return `<li>
																			<div class="dsh-timeline-dot bg-primary"></div>
																			<h6>${milestone.milestone}</h6>
																			<p> &#8358;  ${milestone.price.toString().slice(0, -2)}</p>
																			<p>${milestone.description}</p>
																			
																		</li>`;
																	})}
															</ul>
														</div>
													</div>
													<!-- /Basic timeline -->

												</div>
													<div class="col-12 col-sm-12 col-md-12 mt-3">
														<div class="row justify-content-center">
															<form>
	    													<script src="https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"></script>		
															  <h4 class="">Total price - &#8358; ${transaction.price.toString().slice(0, -2)}</h4> 
															  <button  id=${transaction._id} value=${"transactions/payment/token/"+transaction._id} class="btn btn-lg btn-success col-12" type="button" onclick="return loadPaymentHandller(this.id, this.value)">Make Payment</button>
															</form>
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
				console.log(response)
				 if (response.status === 200 && response.transaction.paymentStatus !== true) {
					
						loading("user-open-side-bar", "display-none");
					showService(response.transaction, response.transaction.milestones, response.user);
				}else if (response.status === 200 && response.transaction.paymentStatus === true) {
					alert("Yay you have paid for this Transaction already.");

                    window.location = "/users/transactions";
				}
			}

			getRequest("transactions/service/token/"+id, token, "GET", load);

	}







});