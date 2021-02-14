define(function(require, exports, module) {
	exports.showContracts= (token, id)=>{

	const {getRequest} = require("request");
	const {loading} = require("../../../loading");
	const body = document.getElementById("body");
	const {sideBar} = require("../../sidebar");
	const {loginForm} = require("../../../logins");
	const spinner = document.getElementById("spinner");
	const {deleteTransaction} = require("../../freelancers/deleteServiceToken")
	spinner.className ="display-none";

				const transaction=(transactions)=>{

				sideBar(token, id);
		

				const html = `<div class="" id="contract">
							<div class="container">
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-12  col-md-9 offset-md-3 col-lg-9 offset-lg-3">
										<div class="card bg-background shadow-lg p-3 mb-5 rounded">
											<div class="card-body row">
											<div class="col-12 col-sm-12 col-md-12">
												<a href="/users/dashboard">
													<i class="fa fa-arrow-left text-dark mt-2" aria-hidden="true"></i>
												</a>
											<div class="col-12 col-sm-12  col-md-12 col-lg-12 mt-3">
												<h3><i class="fa fa-handshake" aria-hidden="true"></i> Contracts</h3>
												<p>Share contract links to your clients and get started on your project</p>
											</div>
											</div>
												<div class="col-12 col-sm-12 col-md-12 mt-2">
													${transactions.map((transaction, index)=>{
														let service, description, serviceLink;
														if (transaction.description) {
															description = transaction.description.slice(0, 150)
														}else if (!transaction.description) {
															description = "No description";
														}
														if (transaction.isService === true) {
															service = "Service";
															serviceLink = "freelancer";
														}else if (transaction.isService === false) {
															service = "Product";
															serviceLink = "buyer"
														}
												return `<div class="col-12">
														<div class="card shadow-lg  bg-background rounded mt-0">
															<div class="card-body text-center">
																<h5>${transaction.productName.toUpperCase()}</h5>
																<span>&#8358; ${transaction.price.toString().slice(0, -2)}</span>
																<p>${description}<span>...</span></p>
																<p>Category: <b>${service}</b></p>
														<small>Copy your Contract link and Share with your clients/merchants</small>
														<input class="form-control" id=${transaction._id} type="text" value=${window.location.hostname+"/users/"+serviceLink+"/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id} readonly="readonly"/>
															<button onclick="return copyText(this.value)" value=${transaction._id} class="mt-2 col-md-12  col-sm-12 col-12 btn-sm btn-green ">Copy</button>
															<button  class="mt-2 col-md-12  col-sm-12 col-12 btn-sm btn-danger" id=${transaction._id} value="contract" name=${token.token} onclick='return deleteTransaction(event, this.id, this.value, this.name)'>Delete</button>										
														<div style="margin-top:5px;" class="mt-2">
										                  	<p style="margin-bottom:2px">Share this with your Client</p>										                    
										                    <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${window.location.hostname+"/users/"+serviceLink+"/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}&quote=Project Title: ${transaction.productName} Project description: ${transaction.description} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)}"  id="blake" class="facebookLink"><i class="fab fa-facebook-f"></i></a>
										                    <a target="_blank" href="https://www.linkedin.com/sharing/share-offsite/?url=${window.location.hostname+"/users/"+serviceLink+"/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}&title=${transaction.productName}&summary={text" class="linkdinLink"><i class="fab fa-linkedin-in"></i></a>
										                    <a target="_blank" href="mailto:?subject=Project Title: ${transaction.productName}&amp;body=Project description: ${transaction.description} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)} Link: ${window.location.hostname+"/users/"+serviceLink+"/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}" class="gmailLink"><i class="fa fa-envelope"></i></a>
										                    <a target="_blank" href="whatsapp://send?text=@Project Title: ${transaction.productName} Project description: ${transaction.description} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)} -  ${window.location.hostname+"/users/"+serviceLink+"/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}" data-action="share/whatsapp/share" class="whatsappLink"><i class="fab fa-whatsapp"></i></a>
										                </div>
															</div>
														</div>
													</div>`
													})}
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
					transaction(response.transactions);
				}else if (response.status === 403) {
						alert(response.message);
				}	
			}

			getRequest("transactions/contract", token, "GET", displayTransaction);


	}
})
