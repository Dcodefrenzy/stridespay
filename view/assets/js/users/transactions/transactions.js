define(function (require, exports, modules) {

exports.transactionsHandller = (token, id)=>{
	const {loginForm} = require("../../logins");
	let {createProduct} = require("../createProduct");
	const {getRequest} = require("../../request");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";


			const transactions=(transactions)=>{

				const html = `<div id="products">
							<div class="container">
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2">
										<div class="card min-height">
											<div class="card-body">
												<div class="col-12 col-sm-12 col-md-12">
												<a href="/users/dashboard">
													<i class="fa fa-arrow-left text-dark mt-2" aria-hidden="true"></i>
												</a>
												</div>
												<div class="col-12 col-sm-12 col-md-12 mt-2">
													<h4>Deals</h4>
													<i>Break things and move faster</i>
													<nav>
														  <div class="nav nav-tabs" id="nav-tab" role="tablist">
														    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-handshake text-green" aria-hidden="true"></i> Ongoing</a>
														    <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-hourglass-end text-green" aria-hidden="true"></i> Ended</a>
														  </div>
													</nav>
													<div class="tab-content" id="nav-tabContent">
														<div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
														${transactions.map((transaction)=>{
													  		if (transaction.transactionComplete === false) {
													  			return `<div class="card">
													  					<div class="card-header">${transaction.productName} <span class="float-right text-success">&#8358;  ${transaction.price.toString().slice(0, -2)}</span></div>
													  					<div class="card-body">
																		<p class="float-right">Date: ${moment(transaction.dateCreated).fromNow()}</p>
													  					<p>By: ${transaction.creator}</p>
													  					<p>Payment status: ${transaction.paymentStatus}</p>
													  					<a href=${"/users/transactions/"+transaction._id}>
																			<button class="btn-sm btn-green">Manage Deal</button>
																		</a>
													  					</div>
													  				</div>`
													  		}
													  	})}
													  	</div>
													  	<div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">	
													  	${transactions.map((transaction)=>{
													  			if (transaction.transactionComplete === true) {
													  			return	`<div class="card">
													  					<div class="card-header">${transaction.productName} <span class="float-right text-success">&#8358;  ${transaction.price.toString().slice(0, -2)}</span></div>
													  					<div class="card-body">
																		<p class="float-right">Date: ${moment(transaction.dateCreated).fromNow()}</p>
													  					<p>By: ${transaction.creator}</p>
													  					<p><i class="fa fa-check-circle text-success text-left"></i> Transaction completed</p>
													  					</div>
													  				</div>`
													  			}
													  	})}
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
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					transactions(response.transactions)
				}
			}

			getRequest("transactions", token, "GET", load);

	}



});
