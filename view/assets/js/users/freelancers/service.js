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
					let currency, currencyCharacter;
					currencyCharacter = transaction.currency === "USD"?"$":transaction.currency === "NGN"?"&#8358":"&#8358"
				sideBar(token, id);
				const html = `<div id="service" class="">
										<!-- Body Content Wrapper -->
								<div class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

									<!-- Breadcrumbs -->
									<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
										<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
											<h1>Service</h1>
											<ol class="breadcrumb style-1">
												<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
												<li class="breadcrumb-item"><a href="/users/projects">Projetcs</a></li>
												<li class="breadcrumb-item" aria-current="page">Service</li>
											</ol>
										</div>
									</div>


									<div class="row">

										<div class="col-md-12">
											<div class="row">
												<div class="col-md-12">
													<div class="card">
														<div class="card-header bg-light media-body">
															<h5 class="card-title">${service.product}</h5>
															<div class="ml-5 float-right">
																<div class="list-icons">
																	<div class="dropdown">
																		<a href="#" data-toggle="dropdown" aria-expanded="false"><i class="lni-more-alt"></i></a>
																		<div class="dropdown-menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 20px, 0px); top: 0px; left: 0px; will-change: transform;">
																			<a id=${"products/freelancer/transaction/create/"+service._id} onclick="return createTransaction(event, this.id)" class="dropdown-item media align-items-center">
																				<i class="lni-enter text-success"></i>
																				<div class="media-body">
																					<h6>Generate Contract</h6>
																					<p class="text-muted fs-12">generate and send a contract to your client </p>
																				</div>
																			</a>
																			<a target=${token.token} name=${token._id} id=${id} onclick="return editService(event, this.id, this.target, this.name)"class="dropdown-item media align-items-center">
																				<i class="lni-pencil text-primary"></i>
																				<div class="media-body">
																					<h6>Edit</h6>
																					<p class="text-muted fs-12">edit your service</p>
																				</div>
																			</a>
																			<div class="dropdown-divider"></div>
																			<a id=${id} target=${token.token} name=${token._id} onclick="return deleteService(event, this.id, this.target, this.name)" class="dropdown-item media text-danger align-items-center">
																				<i class="lni-trash"></i>
																				<div class="media-body">
																					<h6>Delete</h6>
																					<p class="text-muted fs-12">Hate this service?</p>
																				</div>
																			</a>
																		</div>
																	</div>
																</div>
															</div>
															<h6 class="card-subtitle">${currencyCharacter} ${service.price.toString().slice(0, -2)}</h6>
														</div>
														<div class="card-body">
															<h5 class="card-title">Service Description</h5>
															<p class="card-text">${service.description}</p>
															<div class="text-center">
																<a class="btn btn-success text-white" id=${"products/freelancer/transaction/create/"+service._id} onclick="return createTransaction(event, this.id)"><i class="lni-enter"></i>Generate Contract</a>
																<a  class="btn btn-primary text-white" target=${token.token} name=${token._id} id=${id} onclick="return editService(event, this.id, this.target, this.name)"><i class="lni-pencil"></i> Update Service</a>
																<a  class="btn btn-danger text-white" id=${id} target=${token.token} name=${token._id} onclick="return deleteService(event, this.id, this.target, this.name)"><i class="lni-trash"></i>Delete Service</a>
															</div>
														</div>
														<div class="card-footer bg-light">
															Created: ${moment(service.dateCreated).format("L")}
														</div>
													</div>
												</div>
												<div class="col-lg-6">

													<!-- Basic timeline -->
													<div class="card">
														<div class="card-body">
															<div class="dsh-section-title">

																<a class="btn btn-dark text-white float-right" target="service" id=${service._id} onclick="return createMilestone(event, this.id, this.target)"><i class="lni-plus"></i> Add Milestone</a>
																<h5 class="card-title">Basic timeline</h5>
															</div>
															<ul class="dsh-timeline">
															${milestones.map((milestone, index)=>{
																return `<li>
																	<div class="dsh-timeline-dot bg-success"></div>
																	<h6>${milestone.milestone.toUpperCase()}</h6>
																	<span> <i class="lni-money-protection"></i> ${currencyCharacter} ${milestone.price.toString().slice(0, -2)}</span>
																	<span> <i class="lni-timer"></i> ${moment(milestone.dateCreated).format("L")}</span>
																	<p>${milestone.description.slice(0, 150)}</p>
																	<a class="btn btn-success text-white" href="/users/milestone/${milestone._id}">Manage Milestones details</a>
																</li>`
															})}

															</ul>
														</div>
													</div>
													<!-- /Basic timeline -->

												</div>
												<div class="col-lg-6">
													<div class="card">
														<div class="card-body text-center">
															<span class="btn btn-icon btn-lg btn-success-light btn-round mb-3">
																<i class="lni-book icon-2x"></i>
															</span>
															<h5 class="card-title">Contracts</h5>
															<p class="mb-3">You can share a contract link with your client. </p>
															<div><a class="btn btn-success text-white" id=${"products/freelancer/transaction/create/"+service._id} onclick="return createTransaction(event, this.id)"><i class="lni-enter"></i>Generate Contract</a></div>
														${transaction.map((transaction, index)=>{
															return	`<small>Copy your Contract link and Share with your clients/merchants</small>
															<input class="form-control" id=${transaction._id} type="text" value=${window.location.hostname+"/users/freelancer/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id} readonly="readonly"/>
															<button onclick="return copyText(this.value)" value=${transaction._id} class="mt-2 col-md-12  col-sm-12 col-12 btn-sm btn-green ">Copy</button>
															<button  class="mt-2 col-md-12  col-sm-12 col-12 btn-sm btn-danger" id=${transaction._id} value="service" name=${token.token} onclick='return deleteTransaction(event, this.id, this.value, this.name)'>Delete</button>	
															<div style="margin-top:5px;" class="mt-2">
																<p style="margin-bottom:2px">Share this with your Client</p>										                    
																 <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${window.location.hostname+"/users/freelancer/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}&quote=Project Title: ${transaction.productName} Project description: ${transaction.description.slice(0, 100)} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)}"  id="blake" class="facebookLink"><i class="fab fa-facebook-f"></i></a>
																 <a target="_blank" href="https://www.linkedin.com/sharing/share-offsite/?url=${window.location.hostname+"/users/freelancer/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}&title=${transaction.productName}&summary={text" class="linkdinLink"><i class="fab fa-linkedin-in"></i></a>
																 <a target="_blank" href="mailto:?subject=Project Title: ${transaction.productName}&amp;body=Project description: ${transaction.description.slice(0, 100)} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)} Link: ${window.location.hostname+"/users/freelancer/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}" class="gmailLink"><i class="fa fa-envelope"></i></a>
																 <a target="_blank" href="whatsapp://send?text=@Project Title: ${transaction.productName} Project description: ${transaction.description.slice(0, 100)} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)} -  ${window.location.hostname+"/users/freelancer/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}" data-action="share/whatsapp/share" class="whatsappLink"><i class="fab fa-whatsapp"></i></a>
															</div>`
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
				console.log(response)
				if (response.status === 401) {

				loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 403 || response.status === 404) {
					alert(response.message)
					window.location ="/users/projects";
				}else if (response.status === 200) {
					let allTransactions;
					let display = response.service.isMerchant === true?`<button onclick="return createTransaction(event, this.id)" class="btn-sm btn-green" id=${"products/transaction/create/"+response.service._id} >New Contrct</button>`:`<a class="btn-sm btn-green"  href=${"/users/product/payment/"+response.product._id}>New Contrct</a>`;
					
					showService(response.user, response.service, response.milestones, response.transactions);
				}
			}

			getRequest("products/service/"+id, token, "GET", load);

	}







});