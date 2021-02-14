define(function(require, exports, module) {

exports.transactionHandller = (token, id)=>{
	const {getRequest} = require("request");
	const {loading} = require("../../loading");
	const {loginForm} = require("../../logins");
	const {loadPaymentHandller} = require("../getPayment");
	const {updateMerchantMilestone} = require("./updateMilestone");
	const {updateBuyerMilestone} = require("./updateBuyerMilestone");
	const body = document.getElementById("body");
	const {sideBar} = require("../sidebar");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";


			const transaction=(transaction, milestones)=>{

				sideBar(token, id);
				const paymentStatus = transaction.paymentStatus == true?"Paid":"Not yet Paid";
				let link;
				if (transaction.merchant === token._id) {
					link =  "/users/transactions/freelancer";
				}else if(transaction.buyer === token._id){
					link = "/users/transactions/client";
				}
				const complete =  transaction.transactionComplete === true?`<p class="text-success mt-5"><i class="fa fa-hourglass-end text-success" aria-hidden="true"></i> Yay! finished transaction."</p>`:`<p class="mt-5"> <i class="fa fa-hourglass-end" aria-hidden="true"></i> You are almost done!</p>`
				const html = `<div class="">
							<div class="container">
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-12  col-md-9 offset-md-3 col-lg-9 offset-lg-3">
										<div class="card bg-background shadow-lg p-3 mb-5 rounded">
											<div class="card-body row">
											<div class="col-12 col-sm-12 col-md-12">
												<a href=${link}>
													<i class="fa fa-arrow-left text-dark mt-2" aria-hidden="true"></i>
												</a>
												<img width="10%" src="/assets/images/3.png" class="text-center float-right"/>
												
											</div>
												<div class="col-12 col-sm-12 col-md-12 mt-2">
													<h1><i class="fas fas fa-align-justify" aria-hidden="true"></i> ${transaction.productName}</h1>
													<p>By ${transaction.creator}</p>
													<p>Created ${moment(transaction.dateCreated).fromNow()}</p>
													<p class="text-success">Total price - &#8358;  ${transaction.price.toString().slice(0, -2)}</p>
													<p class="text-success"><i class="fa fa-credit-card" aria-hidden="true"></i> ${paymentStatus}</p>
													
													<div class="card shadow-lg p-3 mb-2 bg-background rounded">
														<p><i class="fa fa-tasks" aria-hidden="false"></i> Milestones</p>
													</div>
													<ul id="timeline">
														<div>
															${milestones.map((milestone, index)=>{
																console.log(milestone._id)
																const userButton = token._id === transaction.buyer && milestone.buyer === false && milestone.merchant === true? `<button onclick="return updateBuyerMilestone(event, this.id, this.value, this.name)" value=${milestone._id} id=${transaction._id} name=${index} class="btn-sm btn-success">Pay Merchant</button>`:token._id === transaction.buyer && milestone.buyer === true && milestone.merchant === true? `<p class="text-success">PAID</p>`:"";
																const merchantButton = token._id === transaction.merchant && milestone.buyer === false && milestone.merchant === false? `<button onclick="return updateMerchantMilestone(event, this.id, this.value)" value=${milestone._id} id=${transaction._id} class="btn-sm btn-success">Complete Milestone</button>`:""
																const milestoneStatus = milestone.merchant === true? `<i class="fa fa-check-circle text-success text-left">Milestone completed</i>`:milestone.merchant === false?`<i class="fa fa-circle text-left">Milestone not completed</i>`:""
													return	`<div class="col-12 col-sm-12 col-md-12">
																<i class="fa fa-check-circle text-green fa-2x text-left timeline-icon" aria-hidden="true"></i>
																<li class="row">
																<span></span>
																	<div class="card shadow-lg p-3 mb-2 bg-background bg-radius-sm col-11">
																		
																		<p class="text-dark"><b>${milestone.milestone}</b></p>
																		<p><i class="fas fa-info-circle text-green text-left"></i> ${milestone.description}</p>
																		<p class="mt-3">Milestone Status-  ${milestoneStatus}</p>
																		<p>Milestone price - &#8358;  ${milestone.price.toString().slice(0, -2)}</p>
																		${userButton}
																		${merchantButton}
																	</div>
																</li>
															</div>`
														})}
														</div>
													</ul>
													<p class="align-items-center">${complete}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						 </div>`;

		 				body.insertAdjacentHTML('beforeend', html);
			}

			const displayTransaction=(response)=>{
				console.log(response)
				if (response.status === 401) {
					loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					transaction(response.transaction, response.transaction.milestones);
				}else if (response.status === 403) {
						alert(response.message);
				}	
			}

			getRequest("transactions/"+id, token, "GET", displayTransaction);

	}







});