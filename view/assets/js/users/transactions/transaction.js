define(function(require, exports, module) {

exports.transactionHandller = (token, id)=>{
	const {getRequest} = require("request");
	const {loginForm} = require("../../logins");
	const {loadPaymentHandller} = require("../getPayment");
	const {updateMerchantMilestone} = require("./updateMilestone");
	const {updateBuyerMilestone} = require("./updateBuyerMilestone");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";


			const transaction=(transaction, milestones)=>{
				const paymentStatus = transaction.paymentStatus == true?"Paid":"Not yet Paid";
				const complete =  transaction.transactionComplete === true?`<p class="text-success mt-5"><i class="fa fa-hourglass-end text-success" aria-hidden="true"></i> Yay! finished transaction."</p>`:`<p class="mt-5"> <i class="fa fa-hourglass-end" aria-hidden="true"></i> You are almost done!</p>`
				const html = `<div class="">
							<div class="container">
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2">
										<div class="card shadow-lg p-3 mb-5 bg-white rounded">
											<div class="card-body row">
											<div class="col-12 col-sm-12 col-md-12">
												<a href="/users/transactions">
													<i class="fa fa-arrow-left text-dark mt-2" aria-hidden="true"></i>
												</a>
												<img width="10%" src="/assets/images/fav.png" class="text-center float-right"/>
												
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
													
													<div class="card shadow-lg p-3 mb-2 bg-white rounded">
													<p><i class="fa fa-tasks" aria-hidden="false"></i> Milestones</p>
													<div class="accordion" id="accordionExample">
													
															${milestones.map((milestone, index)=>{
																console.log(milestone._id)
																const userButton = token._id === transaction.buyer && milestone.buyer === false && milestone.merchant === true? `<button onclick="return updateBuyerMilestone(event, this.id, this.value, this.name)" value=${milestone._id} id=${transaction._id} name=${index} class="btn-sm btn-success">Pay Merchant</button>`:""
																const merchantButton = token._id === transaction.merchant && milestone.buyer === false && milestone.merchant === false? `<button onclick="return updateMerchantMilestone(event, this.id, this.value)" value=${milestone._id} id=${transaction._id} class="btn-sm btn-success">Complete Milestone</button>`:""
																const milestoneStatus = milestone.merchant === true? `<i class="fa fa-check-circle text-success text-left"></i>`:milestone.merchant === false?`<i class="fa fa-circle text-left"></i>`:""
																			return `	
																	  <div class="card shadow-lg p-3 mb-2 bg-white rounded">
																	    <div class="card-header" id="headingOne">
																	      <h2 class="mb-0">
																	        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
																	          <div>
																	          	<p class="text-dark float-left">${milestone.milestone} <i class="fas fa-eye text-green"></i></p>
																	          <span class="float-right"> </span
																	          </div>
																	        </button>
																	      </h2>
																	    </div>

																	    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
																	      <div class="card-body">
																	      <p><i class="fas fa-info-circle text-green text-left"></i> ${milestone.description}</p>
																	      <p> ${milestoneStatus} Milestone Status</p>
																	      <p>milestone price - &#8358;  ${transaction.price.toString().slice(0, -2)}</p>
																	      ${userButton}
																	      ${merchantButton}
																	      </div>
																	    </div>
																	  </div>
																	  	<div class="col-12 mt-1">
																	  <i class="small-font text-green"></i>
																	  </div>
																	  	<div class="col-12  mt-1">
																	  <i class="small-font text-green "></i>
																	  	</div>
																	  	<div class="col-12 mt-1">
																	  <i class="small-font text-green"></i>
																	  	</div>`
																})}
															${complete}
														</div>
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
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					transaction(response.transaction, response.transaction.milestones);
				}
			}

			getRequest("transactions/"+id, token, "GET", displayTransaction);

	}







});