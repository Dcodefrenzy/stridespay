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
				const html = `<div id="products"  class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

			<!-- Breadcrumbs -->
			<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
				<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					<h1>Transactions</h1>
					<ol class="breadcrumb style-1">
						<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item"><a>transactions</a></li>
					</ol>
				</div>
			</div>


			<div class="row">
				<div class="col-xl-12">

					<!-- Basic Tabs -->
					<div class="card">
						<div class="card-body bg-background">
							<div class="dsh-section-title">
								<h5 class="card-title">Manage projects as a <b>${id.toUpperCase()}</h5>
								<h6>Break things and move faster</h6>
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
														let query;
														let currencyCharacter = transaction.currency === "USD"?"$":transaction.currency === "NGN"?"&#8358":"&#8358"
													  if (id === "client") {query = transaction.buyer}
													  else if (id === "freelancer") {query = transaction.merchant}
												if (transaction.transactionComplete === false && token._id === query) {
													  			
													  return `
											<div class="card">
												<div class="card-body">
													<h5 class="card-title">${transaction.productName}</h5>
													<h6 class="card-subtitle">${currencyCharacter} ${transaction.price.toString().slice(0, -2)}</h6>
													<h6 class="card-subtitle">${moment(transaction.dateCreated).fromNow()}</h6>
													<hr>
													<h5>Description:</h5>
													<p class="card-text">${transaction.description}</p>
													<a href="${"/users/transaction/"+transaction._id}" class="btn btn-primary">Manage Transaction</a>
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
								<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
													${transactions.map((transaction, index)=>{
														let currencyCharacter = transaction.currency === "USD"?"$":transaction.currency === "NGN"?"&#8358":"&#8358"
														let query;
													  if (id === "client") {query = transaction.buyer}
													  else if (id === "freelancer") {query = transaction.merchant}
												if (transaction.transactionComplete === true && token._id === query) {
													  			
													  return `
											<div class="card">
												<div class="card-body">
													<h5 class="card-title">${transaction.productName}</h5>
													<h6 class="card-subtitle">${currencyCharacter} ${transaction.price.toString().slice(0, -2)}</h6>
													<h6 class="card-subtitle">${moment(transaction.dateCreated).fromNow()}</h6>
													<p><i class="fa fa-check-circle text-success text-left"></i> Transaction completed</p>
													<hr>
													<h5>Description:</small>
													<p class="card-text">${transaction.description}</p>
												</div>
											</div>`;
													  			
												}else{
												console.log(transactions.length)
													  if (transactions.length  < 1) {

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
