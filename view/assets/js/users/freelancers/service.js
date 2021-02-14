define(function(require, exports, module) {

exports.showServiceHandller = (token, id)=>{
	const {getRequest} = require("request");
	const {createTransaction} = require("./createTransaction");
	const {loading} = require("../../loading");
	const {loginForm} = require("../../logins");
	const {loadPaymentHandller} = require("../getPayment");
	const {copyText} = require("../../copyText");
	const {createMilestone} = require("./createMilestone");
	const {sideBar} = require("../sidebar");
	const {editService} = require("./editService");
	const {deleteService} = require("./deleteService");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	const {deleteTransaction} = require("./deleteServiceToken");
	spinner.className ="display-none";

			const showService=(user, service, milestones, transaction, display)=>{
				sideBar(token, id);
				const html = `<div id="service" class="">
							<div class="container">
								<div class="row align-items-center mt-4 p-0">
									<div class="col-12 col-sm-12  col-md-8 offset-md-3 col-lg-8 offset-lg-3">
										<div class="card bg-background shadow-lg p-3 mb-5 rounded">
											<div class="card-body row">
											<a href="/users/projects">
												<i class="fa fa-arrow-left float-left mt-2 text-dark" aria-hidden="true"></i></a>
												<div class="col-12 col-sm-12 col-md-12 text-center mt-2">
													<p><i class="fas fa-tasks" aria-hidden="true"></i> ${service.product}</p>
													<small>${service.description}</small>
													<p class="text-success">&#8358; ${service.price.toString().slice(0, -2)}</p>
													<button class="btn-sm btn-green" id=${"products/freelancer/transaction/create/"+service._id} onclick="return createTransaction(event, this.id)">Generate Contract</button>
													<i class="display-block">Generate a contract for client.</i>
													<div class="row justify-content-center">
															<button id=${id} class="btn-sm btn-green col-md-5 col-sm-6 col-12 m-1" value=${token.token} name=${token._id} onclick="return editService(event, this.id, this.value, this.name)">Update  service details  <i class="fas fa-edit" aria-hidden="true"></i></button>
															<button id=${id} class="btn-sm btn-danger col-md-5 col-sm-6 col-12 m-1" value=${token.token} name=${token._id} onclick="return deleteService(event, this.id, this.value, this.name)">Delete service <i class="fas fa-trash" aria-hidden="true"></i></button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-12 col-sm-12  col-md-8 offset-md-3 col-lg-8 offset-lg-3">
										<div class="row">
											<div class="col-12 col-sm-12 col-md-12 col-lg-6  mt-2">
												<div class="card bg-background shadow-lg  mb-5  rounded p-3">
													<div class="col-12 col-sm-8 offset-sm-2 col-md-8  text-center">
														<p><i class="fa fa-thumbtack" aria-hidden="false"></i> Milestones</p>
														<button class="btn-sm btn-green" value="service" id=${service._id} onclick="return createMilestone(event, this.id, this.value)">Add Milestone</button>
													</div>
													${milestones.map((milestone, index)=>{
												return `<div class="col-12">
														<div class="card shadow-lg  bg-background rounded mt-0">
															<div class="card-body text-center">
																<h5>${milestone.milestone.toUpperCase()}</h5>
																<span>&#8358; ${milestone.price.toString().slice(0, -2)}</span>
																<p>${milestone.description.slice(0, 150)}<span>...</span></p>
																 <a href=/users/milestone/${milestone._id}><button class="btn-sm btn-green col-md-12  col-sm-12 col-12">Manage Milestones details </button></a>
															</div>
														</div>
													</div>`
													})}
												</div>
											</div>
											<div class="col-12 col-sm-12 col-md-12 col-lg-6 mt-2">
												<div class="card bg-background shadow-lg  mb-5  rounded p-3">
													<div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2 text-center">
														<p><i class="fa fa-star text-warning" aria-hidden="false"></i> <b>Contratcs</b></p>
														<p>Here are lists of dormant Contracts. you can delete or use them instead of creating another</p>
													</div>
													${transaction.map((transaction, index)=>{

												return `<div class="col-12">
														<div class="card bg-background shadow-lg   rounded mt-0">
															<div class="card-body text-center">
														<small>Copy your Contract link and Share with your clients/merchants</small>
														<input class="form-control" id=${transaction._id} type="text" value=${window.location.hostname+"/users/freelancer/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id} readonly="readonly"/>
															<button onclick="return copyText(this.value)" value=${transaction._id} class="mt-2 col-md-12  col-sm-12 col-12 btn-sm btn-green ">Copy</button>
															<button  class="mt-2 col-md-12  col-sm-12 col-12 btn-sm btn-danger" id=${transaction._id} value="service" name=${token.token} onclick='return deleteTransaction(event, this.id, this.value, this.name)'>Delete</button>										
														<div style="margin-top:5px;" class="mt-2">
										                  	<p style="margin-bottom:2px">Share this with your Client</p>										                    
										                    <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${window.location.hostname+"/users/freelancer/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}&quote=Project Title: ${transaction.productName} Project description: ${transaction.description} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)}"  id="blake" class="facebookLink"><i class="fab fa-facebook-f"></i></a>
										                    <a target="_blank" href="https://www.linkedin.com/sharing/share-offsite/?url=${window.location.hostname+"/users/freelancer/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}&title=${transaction.productName}&summary={text" class="linkdinLink"><i class="fab fa-linkedin-in"></i></a>
										                    <a target="_blank" href="mailto:?subject=Project Title: ${transaction.productName}&amp;body=Project description: ${transaction.description} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)} Link: ${window.location.hostname+"/users/freelancer/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}" class="gmailLink"><i class="fa fa-envelope"></i></a>
										                    <a target="_blank" href="whatsapp://send?text=@Project Title: ${transaction.productName} Project description: ${transaction.description} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)} -  ${window.location.hostname+"/users/freelancer/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}" data-action="share/whatsapp/share" class="whatsappLink"><i class="fab fa-whatsapp"></i></a>
										                </div>
															</div>
														</div>
													</div>`
													})}
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
				if (response.status === 401) {

				loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 403 || response.status === 404) {
					alert(response.message)
					window.location ="/users/projects";
				}else if (response.status === 200) {
					let allTransactions;
					let display = response.service.isMerchant === true?`<button onclick="return createTransaction(event, this.id)" class="btn-sm btn-green" id=${"products/transaction/create/"+response.service._id} >New Transaction</button>`:`<a class="btn-sm btn-green"  href=${"/users/product/payment/"+response.product._id}>New Transaction</a>`;
					
					showService(response.user, response.service, response.milestones, response.transactions);
				}
			}

			getRequest("products/service/"+id, token, "GET", load);

	}







});