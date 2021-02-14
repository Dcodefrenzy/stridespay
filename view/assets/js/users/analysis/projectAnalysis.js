define(function(require, exports, module) {

exports.projectAnalysisHandller = (token, id)=>{
	const {getRequest} = require("request");
	const {loading} = require("../../loading");
	const body = document.getElementById("body");
	const {sideBar} = require("../sidebar");
	const {loginForm} = require("../../logins");
	const {getProjectBarChart} = require("./projectBarChart");
	const {changeProject} = require("./changeProjectBarChart");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";

			const projectAnalysis=(user, wallet,withdraw, transactions, clients)=>{
				
				nextYear = new Date().getFullYear();
				const numbersOfYears = [0,1,2]
				numbersOfYears.length = 3;
				sideBar(token, id);
				const transactionsLength = transactions.filter((transaction)=>{
					return transaction.transactionComplete === true;
				});
				const ongoingTransactionsLength = transactions.filter((transaction)=>{
					return transaction.transactionComplete === false;
				});
				const ongoingProjectPercentage = ongoingTransactionsLength.length*100/transactions.length;
				const projectPercentage =  transactionsLength.length*100/transactions.length;
				console.log(ongoingProjectPercentage)

				const html = `<div class="mt-2">
							<div class="container">
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
										<div class="row justify-content-between">
											<a href="/users/dashboard">
												<i class="fa fa-arrow-left float-left mt-2 text-dark col-12" aria-hidden="true"></i>
											</a>
											<h1 class="col-12 mt-2">Projects Analysis</h1>
											<div class="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
												<div class="card bg-background shadow-lg p-3 mb-3  rounded">
													<div class="class="card-header">
													      <small class="card-title">Project completed progress</small>
													</div>
													<div class="mt-3">
													      <h3>${transactionsLength.length} projects completed</h3>
													      <h3>${ongoingTransactionsLength.length} ongoing projects</h3>
												   </div>
													<div class="card-footer mt-3">	
													      <p><b>Project Progress</b> ${projectPercentage}%</p>
														<div class="progress">
															<div class="progress-bar" role="progressbar" style="width: ${projectPercentage}%" aria-valuenow="${projectPercentage}" aria-valuemin="0" aria-valuemax="100">
															</div>
														</div>
													</div>
													 <div class="card-footer mt-3">	
													      <p><b>Ongoing Project Progress</b> ${ongoingProjectPercentage}%</p>
														<div class="progress">
															<div class="progress-bar" role="progressbar" style="width: ${ongoingProjectPercentage}%" aria-valuenow="${ongoingProjectPercentage}" aria-valuemin="0" aria-valuemax="100">
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-12 col-sm-12 col-md-12 col-lg-12 mt-2">
												<div class="card bg-background shadow-lg p-3 mb-3  rounded">
													<div class="class="card-header">
													      <small class="card-title">Project Overview</small>
													</div>
													<div class="mt-3">
													      <h3>General Project analysis  projects</h3>
												   </div>
													<div class="form-group">
														<select class="form-control col-12" id="withdraws/financial-analysis" name="${token.token}" onchange="return changeProject(event, this.name,  this.id, this.value)">
															${ 
																numbersOfYears.map((numb, index)=>{
																	const year =  nextYear - index;
																	return `<option onchange="return changeProject(event, this.name,  this.id, this.value)" value="${year}" id="withdraws/financial-analysis" name="${token.token}">${year}</option>`
																})
															}
														</select>
													</div>
													 <div class="card-footer mt-3">	
													 		<div id="columnchart_values" class="col-12 card mt-5"></div>
															<div id="pie-chart" class="col-12 card mt-5"></div>
													</div>
												</div>
											</div>
											<div class="col-12 col-sm-12 col-md-12 col-lg-12 mt-3">
												<div class="card bg-background shadow-lg p-3 mb-3  rounded">
													<div class="card-header"> <h5><i class=" fas fa-align-justify fa-1x"></i> Most Recent Projetcs</h5></div>
													<div class="card-body">
						                                <div class="row">
						                                    <div class="col-12 col-sm-12 col-md-12">
						                                        <div class="card bg-background">
						                                          	<div class="card-body">
						                                          	${transactions.slice(0, 5).map((transaction, index)=>{
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
					projectAnalysis(response.user, response.wallet, response.withdraw, response.transactions, response.clients);

					getProjectBarChart(token, "withdraws/financial-analysis", new Date().getFullYear());
					
				}
			}


			getRequest("users/profile", token, "GET", loadDashboard);

	}







});