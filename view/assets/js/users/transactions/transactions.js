define(function (require, exports, modules) {

exports.transactionsHandller = (token, id)=>{
	const {loginForm} = require("../../logins");
	let {createProduct} = require("../createProduct");
	const {loading} = require("../../loading");
	const {getRequest} = require("../../request");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	const {sideBar} = require("../sidebar");
	spinner.className ="display-none";
console.log(id)
			const transactions=(transactions)=>{

				sideBar(token, id);
				const html = `<div id="products">
							<div class="container">
								<div class="row align-items-center mt-3 p-0">
									<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
										<div class="card bg-background min-height">
											<div class="card-body">
												<div class="col-12 col-sm-12 col-md-12">
												<a href="/users/dashboard">
													<i class="fa fa-arrow-left text-dark mt-2" aria-hidden="true"></i>
												</a>
												</div>
												<div class="col-12 col-sm-12 col-md-12 mt-2">
													<h4>Manage Ongoing projects as a <b>${id.toUpperCase()}</b></h4>
													<i>Break things and move faster</i>
													<nav>
														  <div class="nav nav-tabs justify-center col-12" id="nav-tab" role="tablist">
														    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-handshake text-green" aria-hidden="true"></i> Ongoing Projects</a>
														    <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-hourglass-end text-green" aria-hidden="true"></i> Closed Projects</a>
														  </div>
													</nav>
													<div class="tab-content" id="nav-tabContent">
														<div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
														${transactions.map((transaction, index)=>{
															let query;
													  					if (id === "client") {query = transaction.buyer}
													  					else if (id === "freelancer") {query = transaction.merchant}
													  		if (transaction.transactionComplete === false && token._id === query) {
													  			
													  					return `<div class="card bg-background">
													  					<div class="card-header">${transaction.productName} <span class="float-right text-success">&#8358;  ${transaction.price.toString().slice(0, -2)}</span></div>
													  					<div class="card-body">
																		<p class="float-right">Date: ${moment(transaction.dateCreated).fromNow()}</p>
													  					<p>By: ${transaction.creator}</p>
													  					<p>Payment status: ${transaction.paymentStatus}</p>
													  					<a href=${"/users/transaction/"+transaction._id}>
																			<button class="btn-sm btn-green">Manage Deal</button>
																		</a>
													  					</div>
													  				</div>`;
													  			
													  		}else{
													  			console.log(transactions.length)
													  				if (index === 0) {

													  			return `<div class="card shadow-lg p-3 mb-3 bg-background rounded">
																				<div class="card-body text-center">
																				<img src="/assets/svg/empty.svg" width="50%" alt="online payment transfer">
																				<p class="text-dark"><b>You do not have an ongoing Project.</b></p>
																			</div>
																		</div>`;
													  				}
													  			}
													  	
													  	})}
													  	</div>
													  	<div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">	
													  	${transactions.map((transaction, index)=>{
													  		let query;
													  					if (id === "client") {query = transaction.buyer}
													  					else if (id === "freelancer") {query = transaction.merchant}
													 
													  			if (transaction.transactionComplete === true && token._id === query) {
													  					
													  				return	`<div class="card bg-background">
																  		<div class="card-header">${transaction.productName} <span class="float-right text-success">&#8358;  ${transaction.price.toString().slice(0, -2)}</span></div>
																  		<div class="card-body">
																		<p class="float-right">Date: ${moment(transaction.dateCreated).fromNow()}</p>
																  		<p>By: ${transaction.creator}</p>
																  		<p><i class="fa fa-check-circle text-success text-left"></i> Transaction completed</p>
																  		</div>
																  	</div>`
																  			
													  			}else{
													  				if (transactions.length  < 1) {

																	return `<div class="card shadow-lg p-3 mb-3 bg-background rounded">
																			<div class="card-body text-center">
																			<img src="/assets/svg/empty.svg" width="50%" alt="online payment transfer">
																			<p class="text-dark"><b>you have not completed Project yet.</b></p>
																		</div>
																	</div>`	
													  				}
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

		 		body.insertAdjacentHTML('beforeend', html);
			}

			const load=(response)=>{

				if (response.status === 401) {
					loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					console.log(response)
					transactions(response.transactions)
				}
			}

			getRequest("transactions", token, "GET", load);

	}



});
