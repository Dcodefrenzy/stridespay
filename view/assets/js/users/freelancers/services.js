define(function(require, exports, module) {

exports.servicesHandller = (token, id)=>{
	const {loginForm} = require("../../logins");
	let {createService} = require("./createService");
	const {getRequest}= require("../../request");
	const body = document.getElementById("body");
	const {sideBar} = require("../sidebar");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";


			const services=(services)=>{
				
				sideBar(token, id);
				const html = `<div id="products">
							<div class="container">
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-8 offset-sm-2 col-md-9 offset-md-3 col-lg-9 offset-lg-2">
										<div class="card min-height">
											<div class="card-body">
												<div class="col-12 col-sm-12 col-md-12">
												<a href="/users/dashboard">
													<i class="fa fa-arrow-left text-dark mt-2" aria-hidden="true"></i>
												</a>
												</div>
												<div class="col-12 col-sm-12 col-md-12 mt-3">
													<button class="btn-lg btn-dark" onclick="return createService(event, this.id, this.value)" value="products" id="isMerchant">Create Service</button>
												</div>
												<div class="col-12 col-sm-12 col-md-12 mt-5">
													<h4>Services</h4>
													<div class="row">
														${services}
													</div>
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
				let service;
				if (response.status === 401) {
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					

					if (response.products.length > 1) {

					 	service = response.products.map((service)=>{							
							return	`<div class="col-12 col-sm-12 col-md-12">
										<a href=/users/services/${service._id}>
											<div class="card shadow-lg p-3 mb-3 bg-white rounded">
												<div class="card-body text-center">
													<i class="fa  fa-tasks fa-3x text-green" aria-hidden="true"></i>
													<p class="text-dark">${service.product}</p>
													<p class="text-dark">${service.price}</p>
												</div>
											</div>
										</a>
									</div>`;
						})
					}else{
				 service  = `<div class="col-12 col-sm-12 col-md-12">
								<div class="card shadow-lg p-3 mb-3 bg-white rounded">
									<div class="card-body text-center">
										<i class="fa fa-tasks fa-3x text-green" aria-hidden="true"></i>
										<p class="text-dark">No Service yet</p>
										<p>Create a  Service and get going.</p>
									<div class="col-12 col-sm-12 col-md-12 mt-3">
										<button class="btn-sm btn-dark" onclick="return createService(event, this.id, this.value)" value="products" id="isMerchant">Create Service</button>
									</div>
								</div>
							</div>`
					}
				}
				services(service)
			}

			getRequest("products/services", token, "GET", load);

	}

});
