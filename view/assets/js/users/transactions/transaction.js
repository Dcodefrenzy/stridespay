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
				const html = `<div class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

			<!-- Breadcrumbs -->
			<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
				<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					<h1>Transaction Timeline</h1>
					<ol class="breadcrumb style-1">
						<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item"><a href="${link}">transactions</a></li>
						<li class="breadcrumb-item" aria-current="page">transaction</li>
					</ol>
				</div>
			</div>

			<div class="row">
				<div class="col-lg-12">
					<div class="card card-body">
						<ul class="list-group flex-list borderless mb-4">
							<li class="list-group-item">
								<h6>${transaction.productName}</h6>
								<span> &#8358;  ${transaction.price.toString().slice(0, -2)}</span>
							</li>
							<li class="list-group-item">
								<h6>${transaction.creator}</h6>
								<span>${moment(transaction.dateCreated).fromNow()}</span>
							</li>
							<li class="list-group-item">
								<h6>${transaction.description}</h6>
								<span class="dsh-semi-bold text-success"><i class="fa fa-credit-card" aria-hidden="true"></i>${paymentStatus}</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="col-lg-12">

					<!-- Basic timeline -->
					<div class="card">
						<div class="card-body">
							<div class="dsh-section-title">
								<h5 class="card-title">Basic timeline</h5>
							</div>
							<ul class="dsh-timeline">
								${milestones.map((milestone, index)=>{
										console.log(milestone._id)
										const userButton = token._id === transaction.buyer && milestone.buyer === false && milestone.merchant === true? `<button onclick="return updateBuyerMilestone(event, this.id, this.value, this.name)" value=${milestone._id} id=${transaction._id} name=${index} class="btn-sm btn-success">Pay Merchant</button>`:token._id === transaction.buyer && milestone.buyer === true && milestone.merchant === true? `<p class="text-success">PAID</p>`:"";
										const merchantButton = token._id === transaction.merchant && milestone.buyer === false && milestone.merchant === false? `<button onclick="return updateMerchantMilestone(event, this.id, this.value)" value=${milestone._id} id=${transaction._id} class="btn-sm btn-success">Complete Milestone</button>`:""
										const milestoneStatus = milestone.merchant === true? `<i class="fa fa-check-circle text-success text-left"> Milestone completed</i>`:milestone.merchant === false?`<i class="fa fa-circle text-left"> Milestone not completed</i>`:""
																
										return `<li>
											<div class="dsh-timeline-dot bg-primary"></div>
											<h6>${milestone.milestone}</h6>
											<p> ${milestoneStatus}</p>
											<p> &#8358;  ${milestone.price.toString().slice(0, -2)}</p>
											<p>${milestone.description}</p>
											${userButton}
											${merchantButton}
										</li>`;
									})}
								${complete}
							</ul>
						</div>
					</div>
					<!-- /Basic timeline -->

				</div>
			</div>

		</div>`;

		 				body.insertAdjacentHTML('beforeend', html);
			}

			const displayTransaction=(response)=>{
				//console.log(response)
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