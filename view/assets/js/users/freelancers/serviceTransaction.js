define(function(require, exports, module) {

exports.showServiceTransaction = (token, id)=>{
	const {getRequest} = require("request");
	const {createTransaction} = require("./createTransaction");
	const {loginForm} = require("../../logins");
	const {loadPaymentHandller} = require("../getPayment");
	const {copyText} = require("../../copyText");
	const {createMilestone} = require("./createMilestone");
	const {sideBar} = require("../sidebar");
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
												<div class="col-12 col-sm-12 col-md-12  mt-3">
													<p class="text-strides float-right">By ${transaction.creator}</p>
												</div>
												<div class="col-12 col-sm-12 col-md-12">
													<p class="float-right display-block">+234 ${user.phonenumber}</p>
												</div>
												<div class="col-12 col-sm-12 col-md-12">
													<p class="float-right"> ${user.email}</p>
												</div>
												<div class="col-12 col-sm-12 col-md-12">
													<p class="float-right"> Created ${moment(transaction.dateCreated).format("L")}</p>
												</div>
												<div class="col-12 col-sm-12 col-md-12  mt-2">
													<h6><i class="fa fa-circle text-green" aria-hidden="true"></i> Service: ${transaction.productName}</h6>
													<p class="text-success">Total price - &#8358;  ${transaction.price.toString().slice(0, -2)}</p>
													<div class="mt-5 text-center card-body">
														<p> <i class="fa fa-tasks" aria-hidden="true"></i> Milestones</p>
													</div>
													${milestones.map((milestone)=>{
														return `<div class="col-12 col-sm-12 col-md-12 mt-3">

														<h5 class="" aria-hidden="true"> ${milestone.milestone} &#8358; ${milestone.price.toString().slice(0, -2)}</h5>
														<p class="display-block">${milestone.description}</p>
														<hr></div>`
														})}
													<div class="col-12 col-sm-12 col-md-12">
												<small>Copy unique transaction token and Share to your clients/merchants</small>
												<input class="form-control" id=${transaction._id} type="text" value=${window.location.hostname+"/users/freelancer/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id} readonly="readonly"/>
													<button onclick="return copyText(this.value)" value=${transaction._id} class="mt-2 col-12 col-sm-5 offset-sm-3 col-md-5 offset-md-3 btn-sm btn-green ">Copy</button>
														</form>
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
				if (response.status === 401) {
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {

					showService(response.transaction, response.transaction.milestones, response.user);
				}
			}

			getRequest("transactions/service/tokens/"+id, token, "GET", load);

	}


});