define(function(require, exports, module) {

exports.showServiceTransaction = (token, id)=>{
	const {getRequest} = require("request");
	const {createTransaction} = require("./createTransaction");
	const {loading} = require("../../loading");
	const {loginForm} = require("../../logins");
	const {loadPaymentHandller} = require("../getPayment");
	const {copyText} = require("../../copyText");
	const {createMilestone} = require("./createMilestone");
	const {sideBar} = require("../sidebar");
	const {editContractMilestone} = require("./../transactions/contracts/editContractMilestone");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";

			const showService=(transaction, milestones, user)=>{
				sideBar(token, id);

				console.log(transaction)
				let link, backLink;
				if (transaction.isService === true) {
					link = "/users/freelancer/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id;
					backLink = "/users/services/"+transaction.product;
				}else if (transaction.isService === false) {
					link = "/users/buyer/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id;
					backLink = "/users/products/"+transaction.product;

				}
				const html = `<div  id="contract" class="pt-5">
							<div class="container">
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">
										<div class="card shadow-lg p-3 mb-5 bg-background rounded">
											<a href="${backLink}">
												<i class="fa fa-arrow-left float-left mt-2 text-dark" aria-hidden="true"></i>
											</a>
											<div class="card-body row">
											<div class="col-12 col-sm-12 col-md-12">
												<img width="10%" src="/assets/images/fav1.png" class="text-center float-left"/>
												<a href="https://stridespay.com" class="float-right text-dark" target="_blank">Powered and Secured by stridespay</a>
											</div>
												<div class="col-12 col-sm-12 col-md-12  mt-3">
													<p class="text-strides float-right">By ${transaction.creator}</p>
												</div>
												<div class="col-12 col-sm-12 col-md-12">
													<p class="float-right display-block">+234 ${user.phonenumber}</p>
												</div>
												<div class="col-12 col-sm-12 col-md-12">
													<p class="float-right"> ${user.email}</p>
												</div>
												<div class="col-12 col-sm-12 col-md-12">
													<p class="float-right"> <b>Created:</b> ${moment(transaction.dateCreated).format("L")}</p>
												</div>
												<div class="col-12 col-sm-12 col-md-12  mt-2">
													<h6><i class="fa fa-circle text-green" aria-hidden="true"></i> Service: ${transaction.productName}</h6>										
													<small><b>Overview: </b>${transaction.description}</small>
													<p class="text-success">Total price - &#8358;  ${transaction.price.toString().slice(0, -2)}</p>
													<a href="/users/contract/update/${transaction._id}" class="mt-2 col-md-12  col-sm-12 col-12 btn-lg btn-primary text-white">Edit</a>
													<div class="col-lg-12">

														<!-- Basic timeline -->
														<div class="">
															<div class="card-body">
																<div class="dsh-section-title">
																	<h5 class="card-title">Project timeline</h5>
																</div>
																<ul class="dsh-timeline">
																	${milestones.map((milestone, index)=>{
																			console.log(milestone._id)
																			return `<li>
																				<div class="dsh-timeline-dot bg-primary"></div>
																				<h6>${milestone.milestone}</h6>
																				<p> &#8358;  ${milestone.price.toString().slice(0, -2)}</p>
																				<p>${milestone.description}</p>
																				<a class="btn btn-success text-white" id=${id} target=${token.token} name=${milestone._id} onclick="return editContractMilestone(event, this.id, this.target, this.name)"><i class="lni-enter"></i>Update Milestone</a>
																				
																			</li>`;
																		})}
																</ul>
															</div>
														</div>
														<!-- /Basic timeline -->

													</div>
													<div class="col-12 col-sm-12 col-md-12">
														<small>Copy your contract link and Share to your clients/merchants</small>
														<input class="form-control" id=${transaction._id} type="text" value=${window.location.hostname+link} readonly="readonly"/>
															<button onclick="return copyText(this.value)" value=${transaction._id} class="mt-2 col-12 col-sm-5 offset-sm-3 col-md-5 offset-md-3 btn-sm btn-green ">Copy</button>
																</form>											
																<div style="margin-top:5px;" class="mt-2 col-9 offset-3 col-sm-9 offset-sm-3 col-md-9 offset-md-3 col-lg-8 offset-lg-4">
												                  	<p style="margin-bottom:2px">Share this with your Client</p>
												                    <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${window.location.hostname+link}&quote=Project Title: ${transaction.productName} Project description: ${transaction.description.replace(/(<([^>]+)>)/gi, "")} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)}"  id="blake" class="facebookLink"><i class="fab fa-facebook-f"></i></a>
												                    <a target="_blank" href="https://www.linkedin.com/sharing/share-offsite/?url=${window.location.hostname+link}&title=${transaction.productName}&summary={text" class="linkdinLink"><i class="fab fa-linkedin-in"></i></a>
												                    <a target="_blank" href="mailto:?subject=Project Title: ${transaction.productName}&amp;body=Project description: ${transaction.description.replace(/(<([^>]+)>)/gi, "")} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)} Link: ${window.location.hostname+link}" class="gmailLink"><i class="fa fa-envelope"></i></a>
												                    <a target="_blank" href="whatsapp://send?text=@Project Title: ${transaction.productName} Project description: ${transaction.description.replace(/(<([^>]+)>)/gi, "")} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)} -  ${window.location.hostname+link}" data-action="share/whatsapp/share" class="whatsappLink"><i class="fab fa-whatsapp"></i></a>
												                </div>
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
				}else if (response.status === 200) {

					showService(response.transaction, response.transaction.milestones, response.user);
				}
			}

			getRequest("transactions/service/tokens/"+id, token, "GET", load);

	}


});