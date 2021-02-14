define(function(require, exports, module) {

exports.settingsHandler = (token, id)=>{
	const {getRequest} = require("request");
	const body = document.getElementById("body");
	const {sideBar} = require("./sidebar");
	const {updateNotification} = require("./updatePlayerId");
	const {loginForm} = require("../logins")
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";

					sideBar(token, id);

				const html = `<div class="mt-2">
							<div class="container">
								<div class="row align-items-center mt-3 p-0">
									<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-2">
										<a href="/users/dashboard">
											<i class="card-body fa fa-arrow-left text-dark" aria-hidden="true"></i>
										</a>
										<h1 class="card-body">Settings <i class="fa fa-cog fa-spin float-right" aria-hidden="true"></i></h1>
									</div>
									<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-2">
										<div class="card bg-background shadow-lg p-3 mb-3 rounded">
											<div class="card-body row">
												<div class="col-12 col-sm-10 offset-sm-1 col-md-10 offset-md-1">
													<a href="/users/profile" class="text-dark">
													<div class="card bg-background mt-2">
														<div class="card-body">
															Update Profile <i class="fa fa-user float-right text-dark" aria-hidden="true"></i>
														</div>
													</div>
													</a>
												</div>
												<div class="col-12 col-sm-10 offset-sm-1 col-md-10 offset-md-1">
													<a href="/users/change/password" class="text-dark">
													<div class="card bg-background mt-2">
														<div class="card-body">
															Change Password <i class="fa fa-lock float-right text-dark" aria-hidden="true"></i>
														</div>
													</div>
													</a>
												</div>
												<div class="col-12 col-sm-10 offset-sm-1 col-md-10 offset-md-1">
													<a href="/users/withdraw" class="text-dark">
													<div class="card bg-background mt-2">
														<div class="card-body">Withdraw <i class="fa fa-landmark float-right text-dark" aria-hidden="true"></i>
														</div>
													</div>
													</a>
												</div>
												<div class="col-12 col-sm-10 offset-sm-1 col-md-10 offset-md-1">
													<a href="#" class="text-dark">
													<div class="card bg-background mt-2">
														<div class="card-body">
															 Plans <i class="fas fa-gift float-right text-dark" aria-hidden="true"></i>
															 <small class="text-primary">Coming Soon!!!</small>
														</div>
													</div>
													</a>
												</div>
												<div class="col-12 col-sm-10 offset-sm-1 col-md-10 offset-md-1">
													<a href="/users/profile" class="text-dark">
													<div class="card bg-background mt-2">
														<div class="card-body">
															Sign out <i class="fa fa-arrow-left float-right text-dark" aria-hidden="true"></i>
														</div>
													</div>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						 </div>`;

		 				body.insertAdjacentHTML('beforeend', html);

	}







});