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
		

				const html = `<div id="contract" class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

			<!-- Breadcrumbs -->
			<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
				<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					<h1>Contracts</h1>
					<ol class="breadcrumb style-1">
						<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item"><a href="/users/projects">Contract</a></li>
					</ol>
				</div>
			</div>


			<div class="row">

				<div class="col-md-12">
					<div class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-header bg-light">
									<h6>Contracts</h6>
								</div>
								<div class="card-body bg-background">
									<div class="row justify-content-center">		
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
											return `<div class="col-12 col-sm-12 col-md-5 col-lg-5">
													<div class="card">
														<div class="card-body">
															<h5 class="card-title">${transaction.productName.toUpperCase()}</h5>
															<h6 class="card-subtitle">&#8358; ${transaction.price.toString().slice(0, -2)}</h6>
															<hr/>
															<p class="card-text">${description.slice(0, 100)}</p>
																<small>Copy your Contract link and Share with your clients/merchants</small>
																<input class="form-control mb-3" id=${transaction._id} type="text" value=${window.location.hostname+"/users/"+serviceLink+"/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id} readonly="readonly"/>
																	<a onclick="return copyText(this.target)" target=${transaction._id} class="mt-2 col-md-12  col-sm-12 col-12 btn-sm btn-green text-white">Copy</a>
																	<a href="/users/services/token/${transaction._id}" class="mt-2 col-md-12  col-sm-12 col-12 btn-sm btn-green text-white">View Contract</a>
																	<a  class="mt-2 col-md-12 col-sm-12 col-12 btn-sm btn-danger text-white" id=${transaction._id} target="contract" name=${token.token} onclick='return deleteTransaction(event, this.id, this.target, this.name)'>Delete</a>										
																<div style="margin-top:5px;" class="mt-2">
												                  	<p style="margin-bottom:2px">Share this with your Client</p>										                    
												                    <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${window.location.hostname+"/users/"+serviceLink+"/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}&quote=Project Title: ${transaction.productName} Project description: ${description} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)}"  id="blake" class="facebookLink"><i class="fab fa-facebook-f"></i></a>
												                    <a target="_blank" href="https://www.linkedin.com/sharing/share-offsite/?url=${window.location.hostname+"/users/"+serviceLink+"/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}&title=${transaction.productName}&summary={text" class="linkdinLink"><i class="fab fa-linkedin-in"></i></a>
												                    <a target="_blank" href="mailto:?subject=Project Title: ${transaction.productName}&amp;body=Project description: ${description} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)} Link: ${window.location.hostname+"/users/"+serviceLink+"/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}" class="gmailLink"><i class="fa fa-envelope"></i></a>
												                    <a target="_blank" href="whatsapp://send?text=@Project Title: ${transaction.productName} Project description: ${description} Created by-${transaction.creator.replace(/(<([^>]+)>)/gi, "")} Total price - &#8358;  ${transaction.price.toString().slice(0, -2)} -  ${window.location.hostname+"/users/"+serviceLink+"/"+transaction.creator.replace(" ", "-")+"/token/"+transaction._id}" data-action="share/whatsapp/share" class="whatsappLink"><i class="fab fa-whatsapp"></i></a>
												                </div>
														</div>
														<div class="card-footer bg-light">
															${moment(transaction.dateCreated).fromNow()}
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
