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
				 				const html = `<div class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

											<!-- Breadcrumbs -->
											<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
												<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
													<h1>Financials</h1>
													<ol class="breadcrumb style-1">
														<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
														<li class="breadcrumb-item"><a href="#">Financial Analysis</a></li>													</ol>
												</div>
											</div>

											<div class="row"> 	
								   
												<div class="col-xl-12">
													<div class="card">
														<div class="card-body bg-background">
															<div class="dsh-section-title">
																<h5 class="card-title">Financial Analysis</h5>
															</div>
															<div class="row">
																<div class="col-xl-4 col-md-4 col-sm-6">
														          <div class="card card-body">
														            <div class="media mb-3 px-0 pt-0">
														              <div class="media-body">&#8358
														                <h5 class="dsh-semi-bold"id="total-financies"></h5>
														                <span>Total Transaction</span>
														              </div>

														              <div class="ml-3 align-self-center">
														                <span class="btn btn-icon btn-lg btn-success-light">
														                  <i class=lni-money-location icon-2x></i>
														                </span>
														              </div>
														            </div>
														          </div>
														        </div>
																<div class="col-xl-4 col-md-4 col-sm-6">
														          <div class="card card-body">
														            <div class="media mb-3 px-0 pt-0">
														              <div class="media-body">&#8358
														                <h5 class="dsh-semi-bold"id="total-withdrawal"></h5>
														                <span>Total Withdrawal</span>
														              </div>

														              <div class="ml-3 align-self-center">
														                <span class="btn btn-icon btn-lg btn-warning-light">
														                  <i class="lni-revenue icon-2x"></i>
														                </span>
														              </div>
														            </div>
														          </div>
														        </div>
																<div class="col-xl-4 col-md-4 col-sm-6">
														          <div class="card card-body">
														            <div class="media mb-3 px-0 pt-0">
														              <div class="media-body">&#8358
														                <h5 class="dsh-semi-bold" id="total-wallet"> </h5>
														                <span>Total Wallet</span>
														              </div>

														              <div class="ml-3 align-self-center">
														                <span class="btn btn-icon btn-lg btn-primary-light">
														                  <i class="lni-money-location icon-2x"></i>
														                </span>
														              </div>
														            </div>
														          </div>
														        </div>
															</div>
																<div class="form-group">
																<select class="form-control col-12" id="withdraws/financial-analysis" name="${token.token}" onchange="return changeFinanlcials(event, this.name,  this.id, this.value)">
																	${ 
																							
																		numbersOfYears.map((numb, index)=>{
																			const year =  nextYear - index;
																			return `<option onchange="return getBarChart(event, this.name,  this.id, this.value)" value="${year}" id="withdraws/financial-analysis" name="${token.token}">${year}</option>`

																		})
																	}
																	</select>
															<div id="columnchart_values" class="col-12 card mt-5"></div>
															<div id="pie-chart" class="col-12 card mt-5"></div>
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