define(function(require, exports, module) {

exports.showServiceHandller = (token, id)=>{
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

			const showService=(user, service, milestones, transaction, display)=>{
				sideBar(token, id);
				const html = `<div id="service" class="">
							<div class="container">
								<div class="row align-items-center mt-4 p-0">
									<div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2">
										<div class="card shadow-lg p-3 mb-5 bg-white rounded">
											<div class="card-body row">
											<a href="/users/projects">
												<i class="fa fa-arrow-left float-left mt-2 text-dark" aria-hidden="true"></i></a>
												<div class="col-12 col-sm-12 col-md-12 text-center mt-2">
													<p><i class="fas fa-tasks" aria-hidden="true"></i> ${service.product}</p>
													<p class="text-success">&#8358; ${service.price.toString().slice(0, -2)}</p>
										<button class="btn-sm btn-green" id=${"products/freelancer/transaction/create/"+service._id} onclick="return createTransaction(event, this.id)">Generate Token</button>
										<i class="display-block">Generate a payment link print out for client, remember that payment link print out can not be edited .</i>
												</div>
											</div>
										</div>
									</div>
									<div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2 mt-2">
										<div class="card shadow-lg  mb-5 bg-white rounded p-3">
									<div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2 text-center">
										<p><i class="fa fa-thumbtack" aria-hidden="false"></i> Milestones</p>
										<button class="btn-sm btn-green" value="service" id=${service._id} onclick="return createMilestone(event, this.id, this.value)">Add Milestone</button>
									</div>
											${milestones.map((milestone, index)=>{
										return `<div class="col-12">
												<div class="card shadow-lg  bg-white rounded mt-0">
													<div class="card-body text-center">
														<h5>${milestone.milestone}</h5>
														<span>&#8358; ${milestone.price.toString().slice(0, -2)}</span>
														<p>${milestone.description}</p>
														 <button class="btn-sm btn-green col-md-6  col-sm-6 col-12">Manage</button>
													</div>
												</div>
											</div>`
											})}
										</div>
									</div>
								</div>
							</div>
						 </div>`;

		 				body.insertAdjacentHTML('beforeend', html);
			}

			const load=(response)=>{
				console.log(response)
				if (response.status === 401) {
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					let allTransactions;
					let display = response.service.isMerchant === true?`<button onclick="return createTransaction(event, this.id)" class="btn-sm btn-green" id=${"products/transaction/create/"+response.service._id} >New Transaction</button>`:`<a class="btn-sm btn-green"  href=${"/users/product/payment/"+response.product._id}>New Transaction</a>`;
					console.log(response.milestones)
					showService(response.user, response.service, response.milestones);
				}
			}

			getRequest("products/service/"+id, token, "GET", load);

	}







});