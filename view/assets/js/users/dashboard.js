define(function(require, exports, module) {

exports.dashBoardHandller = (token, id)=>{
	const {getRequest} = require("request");
	const body = document.getElementById("body");
	const {showNotification} = require("./showNotification");
	const {updateNotification} = require("./updatePlayerId");
	const {loginForm} = require("../logins")
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";

			const dashboard=(user)=>{
				showNotification()

				const html = `<div class="">
							<div class="container">
								<div class="row align-items-center mt-3 p-0">
									<div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2">
										<div class="card shadow-lg p-3 mb-3 bg-white rounded">
										<div class="float-right">
												<i class="fa fa-bell text-green float-right mt-2" aria-hidden="true"></i>
												<i class="fa fa-arrow-left mt-2 float-left" aria-hidden="true"></i>
										</div>
											<div class="card-body row">
												<div class="col-12 col-sm-12 col-md-12 text-center">
													<i class="fa fa-user fa-6x" aria-hidden="true"></i>
												</div>
												<div class="col-12 col-sm-12 col-md-12 text-center mt-5">
													<p></i> ${user.name}</p>
													<i>Make deals, set milestones and checkout faster.</i>
												</div>
											</div>
										</div>
										<div class="row">
										<div class="col-6 col-sm-6 col-md-6">
											<a href="/users/transactions">
												<div class="card shadow-lg p-3 mb-3 bg-white rounded">
													<div class="card-body text-center">
													<i class="fas fa-tasks fa-3x text-green" aria-hidden="true"></i>
													<p class="text-dark">Deals</p>
												</div>
											</div>
											</a>
										</div>
										<div class="col-6 col-sm-6 col-md-6">
											<a href="/users/products">
												<div class="card shadow-lg p-3 mb-3 bg-white rounded">
													<div class="card-body text-center">
													<i class="fas fa-boxes fa-3x text-green" aria-hidden="true"></i>
													<p class="text-dark">Products</p>
													</div>
												</div>
											</a>
										</div>
										<div class="col-6 col-sm-6 col-md-6">
											<a href="/users/services">
												<div class="card shadow-lg p-3 mb-3 bg-white rounded">
													<div class="card-body text-center">
														<i class="fas fa-user-alt fa-3x text-green" aria-hidden="true"></i>
													<p class="text-dark">Freelancer</p>
													</div>
												</div>
											</a>
										</div>
										<div class="col-6 col-sm-6 col-md-6">
											<a href="/users/settings">
												<div class="card shadow-lg p-3 mb-3 bg-white rounded">
													<div class="card-body text-center">
														<i class="fas fa-user-cog fa-3x text-green" aria-hidden="true"></i>
													<p class="text-dark">Settings</p>
													</div>
												</div>
											</a>
										</div>		
										</div>
									</div>
								</div>
							</div>
						 </div>`;

		 				body.insertAdjacentHTML('afterbegin', html);
			}

			const loadDashboard=(response)=>{
				console.log(response.status)
				if (response.status === 401) {
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					dashboard(response.user);
					updateNotification(token);
				}
			}
			OneSignal.getIdsAvailable(function(ids) {
			    console.log("getIdsAvailable:"
			                    + "\nUserID: " + ids.userId
			                    + "\nRegistration ID: " + ids.registrationId);
			  });

			getRequest("users/profile", token, "GET", loadDashboard);

	}







});