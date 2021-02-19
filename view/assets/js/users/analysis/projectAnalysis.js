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

				const html = `<div class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">
								<!-- Breadcrumbs -->
								<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
									<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
										<h1>Projects Analysis</h1>
										<ol class="breadcrumb style-1">
											<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
											<li class="breadcrumb-item"><a href="#">Project Analysis</a></li>
										</ol>
									</div>
								</div>
								<div class="row">
									<div class="col-xl-12">
							          <!-- Order Statistics -->
								          <div class="card">
								            <div class="card-body">
								              <div class="dsh-section-title">
								                <h5 class="card-title">Project Statistics</h5>
								              </div>
								              <div class="d-flex flex-sm-row flex-column">
								                <div class="mb-4 mb-sm-0">
								                  <p class="wmax-150 mr-2 mb-0"> <span class="h5 text-dark">${transactionsLength.length} projects completed</span></p>
								                  <p class="wmax-150 mr-2 mb-0"> <span class="h5 text-dark">${ongoingTransactionsLength.length} ongoing projects</span></p>
								                </div>
								                <div class="w-100">
								                  <span class="fs-12 mb-1">Ongoing Project</span>
								                  <div class="progress w-100">
								                    <div class="progress-bar progress-bar-striped progress-bar-animated active" role="progressbar" style="width: ${ongoingProjectPercentage}%" aria-valuenow="${ongoingProjectPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
								                  </div>
								                  <span class="fs-12 mb-1">Ended Project</span>
								                  <div class="progress">
								                    <div class="progress-bar progress-bar-striped progress-bar-animated active bg-success" role="progressbar" style="width: ${projectPercentage}%" aria-valuenow="${projectPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
								                  </div>
								                </div>
								              </div>
								          </div>
								          <!-- /Order Statistics -->
							        	</div>
						        	</div>
						            <div class="col-xl-12">
										<!-- Order Statistics -->
										<div class="card">
												<div class="card-body">
													<select class="form-control col-12" id="withdraws/financial-analysis" name="${token.token}" onchange="return changeProject(event, this.name,  this.id, this.value)">
														${ 
															numbersOfYears.map((numb, index)=>{
																const year =  nextYear - index;
																return `<option onchange="return changeProject(event, this.name,  this.id, this.value)" value="${year}" id="withdraws/financial-analysis" name="${token.token}">${year}</option>`
															})
														}
													</select>
													<div id="columnchart_values" class="col-12 card mt-5"></div>
													<div id="pie-chart" class="col-12 card mt-5"></div>      
												</div>
										</div>
										<!-- /Order Statistics -->
									</div>
						            <div class="col-xl-12">
										<!-- Order Statistics -->
										<div class="card">
												<div class="card-body">
											              <div class="dsh-section-title">
											                <h5 class="card-title">Recent Projects</h5>
											              </div>
											              <div class="d-flex flex-sm-row flex-column">
											                <div class="mb-4 mb-sm-0">
											                  <p class="wmax-150 mr-2 mb-0"> <span class="h1 text-dark">${ongoingTransactionsLength.length}</span></p>
											                  <span class="badge badge-success-light fs-13 p-2 badge-pill"><i class="lni-arrow-up dsh-semi-bold"></i> ${Math.round(projectPercentage)}%</span>
											                </div>
											                <div class="w-100">
												                ${transactions.slice(0, 3).map((transaction, index)=>{
												                    let progress = transaction.milestoneComplete * 100/transaction.milestones.length;
												                    let color = progress >= 80?"bg-success":progress<50?"bg-warning":"bg-primary";
												                   
														        return	`<span class="fs-12 mb-1">${transaction.productName.toUpperCase()}</span>
													                  <div class="progress w-100">
													                    <div class="progress-bar progress-bar-striped progress-bar-animated active ${color}" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
													                  </div>`
												                 })}
											                </div>
											              </div>
											              <div id="dsh_statistics_ex_3"></div>
												</div>
										</div>
										<!-- /Order Statistics -->
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