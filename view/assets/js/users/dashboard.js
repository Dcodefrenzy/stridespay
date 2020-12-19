define(function(require, exports, module) {

exports.dashBoardHandller = (token, id)=>{
	const {getRequest} = require("request");
	const {loading} = require("../loading");
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
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
										<div class="row justify-content-end">
											<i class="fas fa-bell  text-green" aria-hidden="true"></i>
										</div>
										<div class="row justify-content-between">
											<div class="col-12 col-sm-12 col-md-5 col-lg-5 mt-2">
												<div class="card bg-background shadow-lg p-3 mb-3  rounded">
													<div class="card-body">
													      <h5 class="card-title">Project Overview</h5>
												   </div>
													 <div class="card-footer">
													      <h2 class="text-muted">1000 projects completed</h2>
													</div>
												</div>
											</div>
											<div class="col-12 col-sm-12 col-md-7 col-lg-7  mt-2">
												<div class="card bg-background shadow-lg p-3 mb-3  rounded">
													<div class="card-body">
														<h5 class="float-left">Wallet</h5>
														<i class="float-right fas fa-wallet fa-2x bg-white bg-radius-lg text-green" aria-hidden="true"></i>
														<hr class="mt-5">
														<div class="row align-items-center">
															<div class="col-6 text-center">	
																<p class="text-dark">Total Balance</p>
																<p class="text-dark">&#8358 ${wallet.amount.toString().slice(0, -2)}</p>
															</div>
															<div class="col-6 text-center">	
																<p class="text-dark">Total Withdawal</p>
																<p class="text-dark">&#8358 ${withdraw}</p>
															</div>
														</div>
														<div class="row justify-content-center">
															<div class="col-4">
																<a href="/users/withdraw">
																	<button class="btn btn-green">Withdraw</button>
																</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="row mt-3 ">
											<div class="col-12 col-sm-12 col-md-12 col-lg-6">
												<div class="card bg-background shadow-lg p-3 mb-3  rounded">
													<div class="card-header"><i class="float-left fas fa-align-justify fa-2x"></i> <h3> Most Recent Projetcs</h3></div>
													<div class="card-body">
						                                <div class="row">
						                                    <div class="col-12 col-sm-12 col-md-12">
						                                        <div class="card bg-background">
						                                          	<div class="card-body">
						                                          		<p>Project Name</p>
																		<p>Project Progress</p>
																		<div class="progress">
																			<div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
																			</div>
																		</div>
																	</div>
																</div>
						                                    </div>
						                                </div>
						                            </div>
												</div>
											</div>
											<div class="col-12 col-sm-12 col-md-12 col-lg-6">
												<div class="card bg-background shadow-lg p-3 mb-3  rounded">
													<div class="card-header"><i class="float-left fas fa-network-wired fa-2x"></i> <h3> Top Clients</h3></div>
													<div class="card-body">
						                                <div class="row">
						                                    <div class="col-12 col-sm-12 col-md-12">
						                                        <div class="card bg-background">
						                                          	<div class="card-body">
						                                          		<p>Project Name</p>
																		<p>Project Progress</p>
																		<div class="progress">
																			<div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
																			</div>
																		</div>
																	</div>
																</div>
						                                    </div>
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

			const loadDashboard=(response)=>{
				
				if (response.status === 401) {
					console.log(response);
					loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					dashboard(response.user, response.wallet, response.withdraw);
					updateNotification(token);
				}
			}


			getRequest("users/profile", token, "GET", loadDashboard);

	}







});