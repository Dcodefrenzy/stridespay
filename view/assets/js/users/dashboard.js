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

			const dashboard=(user, wallet,withdraw, transactions, clients)=>{
				showNotification()
				sideBar(token, id);
				const transactionsLength = transactions.filter((transaction)=>{
					return transaction.transactionComplete === true;
				});

				const ongoingTransactionsLength = transactions.filter((transaction)=>{
					return transaction.transactionComplete === false;
				});
				const projectPercentage =  transactionsLength.length*100/transactions.length;
				console.log(clients)
				let showNoClients = clients.length === 0?`<h3>No Clients Yet</h3>`:"";
				let showNoTransactions = transactions.length === 0?`<h3>No projets Yet</h3>`:"";

				const html = `<div class="mt-2">
							<div class="container">
										<div class="row justify-content-end col-12 col-sm-12 col-md-12 col-lg-12">
											<a href="/users/notifications">
												<i class="fas fa-bell fa-2x text-green" aria-hidden="true"></i>
											</a>
										</div>
								<div class="row align-items-center mt-3 p-0">
									<div class="col-12 col-sm-12 col-md-12 col-lg-12 row justify-content-end">
										<a href="/users/projects"><button class="btn-sm btn-green m-2">Create Project <i class="fa fa-plus" aria-hidden="true"></i></button></a>
									<div class="btn-group m-2">
										  <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										    Track Projects
										  </button>
										  <div class="dropdown-menu">
										    <a class="dropdown-item" href="/users/transactions/client">View As Client</a>
										    <div class="dropdown-divider"></div>
										    <a href="/users/transactions/freelancer" class="dropdown-item" > View As Freelancer </a>
										  </div>
										</div>
									</div>
									<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
										<div class="row justify-content-between">
											<div class="col-12 col-sm-12 col-md-5 col-lg-5 mt-2">
												<div class="card bg-background shadow-lg p-3 mb-3  rounded">
													<div class="class="card-header">
													      <small class="card-title">Project Overview</small>
													</div>
													<div class="mt-3">
													      <h3>${transactionsLength.length} projects completed</h3>
													      <h3>${ongoingTransactionsLength.length} Ongoing projects</h3>
												   </div>
													 <div class="card-footer mt-3">	
													      <p><b>Project Progress</b> ${projectPercentage}%</p>
														<div class="progress">
															<div class="progress-bar" role="progressbar" style="width: ${projectPercentage}%" aria-valuenow="${projectPercentage}" aria-valuemin="0" aria-valuemax="100">
															</div>
														</div>
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
													<div class="card-header"> <h5><i class=" fas fa-align-justify fa-1x"></i> Most Recent Projetcs</h5></div>
													<div class="card-body">
						                                <div class="row">
						                                    <div class="col-12 col-sm-12 col-md-12">
						                                        <div class="card bg-background">
						                                          	<div class="card-body">
						                                          	${showNoTransactions}
						                                          	${transactions.slice(0, 3).map((transaction, index)=>{
						                                          		let progress = transaction.milestoneComplete * 100/transaction.milestones.length;
						                                          		console.log(progress)

						                                          	return	`<p><b>${index + 1}. </b>${transaction.productName.toUpperCase()}</p>
																		<p><b>Milestones Progress</b> ${progress}%</p>
																		<div class="progress">
																			<div class="progress-bar" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
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
											<div class="col-12 col-sm-12 col-md-12 col-lg-6">
												<div class="card bg-background shadow-lg p-3 mb-3  rounded">
													<div class="card-header"> <h5><i class="fas fa-network-wired fa-1x"></i> Top Clients</h5></div>
													<div class="card-body">
						                                <div class="row">
						                                    <div class="col-12 col-sm-12 col-md-12">
						                                        <div class="card bg-background">
						                                          	<div class="card-body">
						                                          		<ol>
						                                          		${showNoClients}
						                                          		${
						                                          			clients.map((client)=>{
						                                          			
						                                          			return `<a href="/users/client-projects/${client.buyers._id}"><li>${client.buyers.firstname+" "+client.buyers.lastname}</li></a>`;	
						                                          			

						                                          		})}
						                                          		</ol>
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
				console.log(response);
				if (response.status === 401) {
					console.log(response);
					loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {				
					let newArray= [];

					response.clients.map((client)=>{
						 if (newArray.find((arr, index)=>{
							if (arr.buyers._id === client.buyers._id) {
								return arr
							}
						})) {
							//newArray.push(client)
						}else{
							newArray.push(client)
						}
					})
					dashboard(response.user, response.wallet, response.withdraw, response.transactions, newArray);
					updateNotification(token);
				}
			}


			getRequest("users/profile", token, "GET", loadDashboard);

	}







});