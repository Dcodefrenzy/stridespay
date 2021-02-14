define(function(require, exports, module) {
	exports.finanlcialAnalysis = (token, id)=>{
			const {getRequest} = require("request");
			const {loading} = require("../../loading");
			const {loginForm} = require("../../logins");
			const {copyText} = require("../../copyText");
			const {sideBar} = require("../sidebar");
			const {getBarChart} = require("./barChart");
			const {changeFinanlcials} = require("./changeBarChart");
			const body = document.getElementById("body");
			const spinner = document.getElementById("spinner");
			spinner.className ="display-none";

			const finanlcialAnalysisMap = ()=>{
				nextYear = new Date().getFullYear();
				const numbersOfYears = [0,1,2]
				numbersOfYears.length = 3;
				sideBar(token, id);
				 				const html = `<div id="service" class="">
							<div class="container">
								<div class="row align-items-center mt-4 p-0">
									<div class="col-12 col-sm-12  col-md-8 offset-md-3 col-lg-8 offset-lg-3">
										<div class="card bg-background shadow-lg p-3 mb-5 mt-3 rounded">
											<div class="card-body row">
											<a href="/users/dashboard">
												<i class="fa fa-arrow-left float-left mt-2 text-dark" aria-hidden="true"></i>
											</a>
											<h1 class="col-12 mt-5">Financial Analysis</h1>
											<div class="bg-background row  col-12 justify-content-center">
												<div class="card col-12 col-sm-12 col-md-12 col-lg-5 bg-background m-2 p-5">	
													<p class="text-dark">Total Amount Transacted</p>
													<h3 class="text-dark" id="total-financies">&#8358 </h3>
												</div>
												<div class="card ol-12 col-sm-12 col-md-12 col-lg-5 bg-background m-2 p-5">
													<p class="text-dark">Total Amount withdrawn</p>
													<h3 class="text-dark" id="total-withdrawal">&#8358 </h3>
												</div>
												<div class="card ol-12 col-sm-12 col-md-12 col-lg-5 bg-background m-2 p-5" >
													<p class="text-dark">Total Wallet Amount</p>
													<h3 class="text-dark" id="total-wallet">&#8358 </h3>
												</div>
											</div>
											<div class="card bg-background row p-4 mt-5 col-12">
												<div class="form-group">
													<select class="form-control col-12" id="withdraws/financial-analysis" name="${token.token}" onchange="return changeFinanlcials(event, this.name,  this.id, this.value)">
														${ 
															
															numbersOfYears.map((numb, index)=>{
																const year =  nextYear - index;
																return `<option onchange="return getBarChart(event, this.name,  this.id, this.value)" value="${year}" id="withdraws/financial-analysis" name="${token.token}">${year}</option>`

															})
														}
													</select>
												</div>
												<div id="columnchart_values" class="col-12 card mt-5"></div>
												<div id="pie-chart" class="col-12 card mt-5"></div>
											</div>
												
											</div>
										</div>
									</div>
								</div>
							</div>
						 </div>`;

		 				body.insertAdjacentHTML('beforeend', html);
			}

			finanlcialAnalysisMap();
			getBarChart(token, "withdraws/financial-analysis", new Date().getFullYear());

	}
});