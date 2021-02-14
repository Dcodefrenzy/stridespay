define(function(require, exports, module){

	exports.clientProjects=(token, id)=>{
	const {loading} = require("../loading");
	const {getRequest} = require("../request");
	const {loginForm} = require("../logins");		
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");	
	spinner.className ="display-none";
	const {sideBar} = require("./sidebar");



			const transactions=(clientName, clientNumber, clientEmail, transactions)=>{
	
				sideBar(token, id);
				const html = `<div id="products">
							<div class="container">
								<div class="row align-items-center mt-3 p-0">
									<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
										<div class="card bg-background min-height">
											<div class="card-body">
												<div class="col-12 col-sm-12 col-md-12">
												<a href="/users/client-database">
													<i class="fa fa-arrow-left text-dark mt-2" aria-hidden="true"></i>
												</a>
												</div>
												<div class="col-12 col-sm-12 col-md-12 mt-2">
													<h4>Clients projects</h4>
													<i>Projects you have done or doing with <b>${clientName}</b></i>

												      <td>	<a href="mailto:${clientEmail}"><button class="btn btn-sm btn-success">Mail ${clientName} <i class="fa fa-envelope" aria-hidden="true"></i></button></a>
												      		<a href="tel:+234${clientNumber}"><button class="btn btn-sm btn-danger">Call ${clientName} <i class="fa fa-phone" aria-hidden="true"></i></button></a>
													<nav>
														  <div class="nav nav-tabs justify-center" id="nav-tab" role="tablist">
														    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-handshake text-green" aria-hidden="true"></i> Ongoing</a>
														    <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-hourglass-end text-green" aria-hidden="true"></i> Ended</a>
														  </div>
													</nav>
													<div class="tab-content" id="nav-tabContent">
														<div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
														${transactions.map((transaction)=>{
													  		if (transaction.transactionComplete === false) {
													  			return `<div class="card bg-background">
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
													  			return	`<div class="card bg-background">
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

		 				body.insertAdjacentHTML('beforeend', html);
			}

			const load=(response)=>{
				console.log(response.data)
				if (response.status === 401) {
					loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					transactions(response.data.name, response.data.phone, response.data.email, response.data.transactions)
				}
			}

			getRequest("transactions/clients/"+id, token, "GET", load);

	}
})