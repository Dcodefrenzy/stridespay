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
				const html = `<div id="products"  class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

			<!-- Breadcrumbs -->
			<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
				<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					<h1>Client Projetcs</h1>
					<ol class="breadcrumb style-1">
						<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item"><a href="/users/client-database">Client Database</a></li>
						<li class="breadcrumb-item"><a href="#">Client Projects</a></li>
					</ol>
				</div>
			</div>


			<div class="row">
				<div class="col-xl-12">

					<!-- Basic Tabs -->
					<div class="card">
						<div class="card-body bg-background">
							<div class="dsh-section-title">
								<h5 class="card-title">Projects you have done or doing with <b>${clientName}</b></h5>
								<a href="mailto:${clientEmail}" class="mt-2 col-md-12  col-sm-12 col-12 btn-sm btn-green text-white">Mail ${clientName}</a>
								<a href="tel:+234${clientNumber}" class="mt-2 col-md-12  col-sm-12 col-12 btn-sm btn-primary text-white">Call ${clientName}</a>
							</div>
							<ul class="nav nav-tabs" id="myTab" role="tablist">
								<li class="nav-item">
									<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Ongoing</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Ended</a>
								</li>
							</ul>
							<div class="tab-content" id="myTabContent">
								<div class="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab">
									${transactions.map((transaction, index)=>{
										if (transaction.transactionComplete === false) {
													  			
											return `<div class="card">
												<div class="card-body">
													<h5 class="card-title">${transaction.productName}</h5>
													<h6 class="card-subtitle">&#8358 ${transaction.price.toString().slice(0, -2)}</h6>
													<h6 class="card-subtitle">${moment(transaction.dateCreated).fromNow()}</h6>
													<hr>
													<h5>Description:</h5>
													<p class="card-text">${transaction.description}</p>
													<a href="${"/users/transaction/"+transaction._id}" class="btn btn-primary">Manage Transaction</a>
												</div>
											</div>`;
													  			
										}
											  	
									})}
								</div>
								<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
										${transactions.map((transaction, index)=>{
												if (transaction.transactionComplete === true) {
													  			
													  return `<div class="card">
														<div class="card-body">
															<h5 class="card-title">${transaction.productName}</h5>
															<h6 class="card-subtitle">&#8358 ${transaction.price.toString().slice(0, -2)}</h6>
															<h6 class="card-subtitle">${moment(transaction.dateCreated).fromNow()}</h6>
															<p><i class="fa fa-check-circle text-success text-left"></i> Transaction completed</p>
															<hr>
															<h5>Description:</small>
															<p class="card-text">${transaction.description}</p>
														</div>
													</div>`;
															  			
												}
													  	
										})}
								</div>
							</div>
						</div>
					</div>
					<!-- /Basic Tabs -->
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