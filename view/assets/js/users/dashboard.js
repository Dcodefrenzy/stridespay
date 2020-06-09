define(function(require, exports, module) {

exports.dashBoardHandller = (token, id)=>{
	const {getRequest} = require("request");
	const body = document.getElementById("body");
	const {showNotification} = require("./showNotification");
	const {sideBar} = require("./sidebar");
	const {updateNotification} = require("./updatePlayerId");
	const {loginForm} = require("../logins")
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";

			const dashboard=(user, wallet,withdraw)=>{
				showNotification()
				sideBar(token, id);

				const html = `<div class="mt-2">
							<div class="container">
								<div class="row align-items-center mt-3 p-0">
									<div class="col-12 col-sm-10 offset-sm-1 col-md-10 offset-md-1">
										<div class="card shadow-lg p-3 mb-3  rounded">
										<div class="float-right">
												<i class="fa fa-bell text-green float-right mt-2" aria-hidden="true"></i>
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
										<div class="row mt-3 ">
											<div class="col-12 col-sm-12 col-md-12">
													<div class="card   bg-radius-lg shadow-lg mb-3">
														<div class="card-body">
														<div>
														<h5 class="float-left">Wallet</h5>
														<i class="float-right fas fa-wallet fa-2x bg-white bg-radius-lg text-green" aria-hidden="true"></i>	
																
														</div>
														<hr class="mt-5">
														<div class="row align-items-center">
															<div class="col-4 text-center">	
																<p class="text-dark">Total Balance</p>
																<p class="text-dark">&#8358 ${wallet.amount.toString().slice(0, -2)}</p>
															</div>
															<div class="col-4 text-center">	
																<p class="text-dark">Total Withdawal</p>
																<p class="text-dark">&#8358 ${withdraw}</p>
															</div>
															<div class="col-4">
															<a href="/users/withdraw">
															<i class="fas fa-landmark fa-4x bg-white bg-radius-lg text-green" aria-hidden="true"></i>	
																<p class="text-dark">Withdraw</p>
																</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="row mt-3 ">
											<div class="col-12 col-sm-12 col-md-12">
													<div class="card  shadow-lg mb-3">
														<div class="card-header"><h3>Most Recent Projetcs</h3></div>
														<div class="card-body">
						                                <div class="row">
						                                    <div class="col-12 col-sm-12 col-md-12">
						                                        <div class="card">
						                                          <div class="card-body">
						                                          	<p>Project Name</p>
																	<p>Project Progress</p>
																	<div class="progress">
																		  <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
																	</div>
																	</div>
						                                        </div>
						                                    </div>
						                                </div>
														<div>
													</div>
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col-6 col-sm-6 col-md-6">
												<a href="/users/transactions">
													<div class="card shadow-lg p-3 mb-3 bg-white rounded">
														<div class="card-body text-center">
														<i class="fas fa-handshake fa-3x text-green" aria-hidden="true"></i>
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
															<i class="fas fa-tasks fa-3x text-green" aria-hidden="true"></i>
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

		 				body.insertAdjacentHTML('beforeend', html);
			}

			const loadDashboard=(response)=>{
				if (response.status === 401) {
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					dashboard(response.user, response.wallet, response.withdraw);
					updateNotification(token);
				}
			}


			getRequest("users/profile", token, "GET", loadDashboard);

	}







});