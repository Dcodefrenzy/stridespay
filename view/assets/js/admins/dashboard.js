
define(function(require, exports, module) {

exports.adminDashboard = (token, id)=>{
	const {adminGetRequest} = require("request");
	const {loginForm} = require("./sessionLogin");
	const {loading} = require("../loading");
	const body = document.getElementById("body");
	const {sideBar} = require("./sidebar");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";

	const dashboard=(admin, adminWallets, admins, payments, transactions, userWallets, users, withdraws)=>{

		function checkUSDCurrency(array){
			return array.currency === "USD";
		}
		function checkNGNCurrency(array){
			return array.currency === "NGN";
		}
	const adminUsdWallet = adminWallets.filter(checkUSDCurrency).map((adminWallet)=>{
		console.log(adminWallet.paymerchantAmount)
				return adminWallet.paymerchantAmount
		}).reduce((total, amount) => total + amount);

		const adminNGNWallet = adminWallets.filter(checkNGNCurrency).map((adminWallet)=>{
				return adminWallet.paymerchantAmount
		}).reduce((total, amount) => total + amount);

		const adminUSDTotalPayment = adminWallets.filter(checkUSDCurrency).map((adminWallet)=>{

				return adminWallet.totalPayment
		}).reduce((total, amount) => total + amount);

		const adminNGNTotalPayment = adminWallets.filter(checkNGNCurrency).map((adminWallet)=>{
				return adminWallet.totalPayment
		}).reduce((total, amount) => total + amount);

		const userUsdWallet = userWallets.filter(checkUSDCurrency).map((wallet)=>{
			return wallet.amount;
		}).reduce((total, amount) => total + amount);

		const userNGNWallet = userWallets.filter(checkNGNCurrency).map((wallet)=>{
			return wallet.amount;
		}).reduce((total, amount) => total + amount);

		const userUsdWithdraw = withdraws.filter(checkUSDCurrency).map((withdraw)=>{
			return withdraw.amount;
		}).reduce((total, amount) => total + amount);

		const userNGNWithdraw = withdraws.filter(checkNGNCurrency).map((withdraw)=>{
			return withdraw.amount;
		}).reduce((total, amount) => total + amount);

		const transactionUSDWallet = transactions.filter(checkUSDCurrency).map((transaction)=>{
			return transaction.price;
		}).reduce((total, amount) => total + amount);

		const transactionNGNWallet = transactions.filter(checkNGNCurrency).map((transaction)=>{
			return transaction.price;
		}).reduce((total, amount) => total + amount);


		const totalUSDPayment = payments.filter(checkUSDCurrency).map((payment)=>{
			return payment.price;
		}).reduce((total, amount) => total + amount);

		const totalNGNPayment = payments.filter(checkNGNCurrency).map((payment)=>{
			return payment.price;
		}).reduce((total, amount) => total + amount);


			sideBar(token, id)
							const html = `<div class="">
					 <div class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

					      <!-- Breadcrumbs -->
					      <div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
					        <div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					          <h1>Dashboard</h1>
					        </div>

					        <div class="breadcrumb-controls mt-sm-0 mt-3">
					        <a> <button type="button" class="btn btn-success">${users.length} Registered Users</button></a>
					        <a> <button type="button" class="btn btn-primary">${admins.length} Admins</button></a>
					        </div>

					      </div>

					      <div class="row">
					        <!-- Card 1 -->
						        <div class="col-12">
						        	<h1>Stridespay Details</h1>
						        </div>
					        <div class="col-xl-3 col-sm-6">
					          <div class="card card-body">
					            <div class="media mb-3 px-0 pt-0">
					              <div class="media-body">
					                <h5 class="dsh-semi-bold">$ ${adminUsdWallet.toString().slice(0, -2)}</h5>
					                <span>Stridespay wallet USD</span>
					              </div>

					              <div class="ml-3 align-self-center">
					                <span class="btn btn-icon btn-lg btn-primary-light">
					                  <i class="lni-radio-button icon-2x"></i>
					                </span>
					              </div>
					            </div>

					            <div class="progress progress-sm">
					              <div class="progress-bar bg-primary" style="width: 11%">
					                <span class="sr-only">111% Complete</span>
					              </div>
					            </div>

					            <div>

					            </div>
					          </div>
					        </div>
					        <!-- /Card 1 -->

					        <!-- Card 3 -->
					        <div class="col-xl-3 col-sm-6">
					          <div class="card card-body">
					            <div class="media mb-3 px-0 pt-0">
					              <div class="media-body">
					                <h5 class="dsh-semi-bold">&#8358 ${adminNGNWallet.toString().slice(0, -2)}</h5>
					                <span>Stridespay wallet NGN</span>
					              </div>

					              <div class="ml-3 align-self-center">
					                <span class="btn btn-icon btn-lg btn-danger-light">
					                  <i class="lni-pulse icon-2x"></i>
					                </span>
					              </div>
					            </div>

					            <div class="progress progress-sm">
					              <div class="progress-bar bg-danger" style="width: 12%">
					                <span class="sr-only">12% Usage</span>
					              </div>
					            </div>

					            <div>

					            </div>
					          </div>
					        </div>
					        <!-- /Card 3 -->

					        <!-- Card 2 -->
					        <div class="col-xl-3 col-sm-6">
					          <div class="card card-body">
					            <div class="media mb-3 px-0 pt-0">
					              <div class="media-body">
					                <h5 class="dsh-semi-bold">$ ${adminUSDTotalPayment.toString().slice(0, -2)}</h5>
					                <span>Total Payments In USD</span>
					              </div>

					              <div class="ml-3 align-self-center">
					                <span class="btn btn-icon btn-lg btn-warning-light">
					                  <i class="lni-money-location icon-2x"></i>
					                </span>
					              </div>
					            </div>

					            <div class="progress progress-sm">
					              <div class="progress-bar bg-warning" style="width: 100%">
					                <span class="sr-only">100% Used</span>
					              </div>
					            </div>

					            <div>

					            </div>
					          </div>
					        </div>
					        <!-- /Card 2 -->


					        	<!-- Card 4 -->
					        <div class="col-xl-3 col-sm-6">
					          <div class="card card-body">
					            <div class="media mb-3 px-0 pt-0">
					              <div class="media-body">
					                <h5 class="dsh-semi-bold">&#8358 ${adminNGNTotalPayment.toString().slice(0, -2)}</h5>
					                <span>Total Payment in NGN</span>
					              </div>

					              <div class="ml-3 align-self-center">
					                <span class="btn btn-icon btn-lg btn-success-light">
					                  <i class="lni-revenue icon-2x"></i>
					                </span>
					              </div>
					            </div>

					            <div class="progress progress-sm">
					              <div class="progress-bar bg-success" style="width: 100%">
					                <span class="sr-only">100% ready</span>
					              </div>
					            </div>

					            <div>
					            </div>
					          </div>
					        </div>
					        <!-- /Card 4 -->

					        <!-- Card 1 -->
						        <div class="col-12">
						        	<h1>User wallet/withdraw </h1>
						        </div>
					        <div class="col-xl-3 col-sm-6">
					          <div class="card card-body">
					            <div class="media mb-3 px-0 pt-0">
					              <div class="media-body">
					                <h5 class="dsh-semi-bold">$ ${userUsdWallet.toString().slice(0, -2)}</h5>
					                <span>User wallet USD</span>
					              </div>

					              <div class="ml-3 align-self-center">
					                <span class="btn btn-icon btn-lg btn-primary-light">
					                  <i class="lni-radio-button icon-2x"></i>
					                </span>
					              </div>
					            </div>

					            <div class="progress progress-sm">
					              <div class="progress-bar bg-primary" style="width: 11%">
					                <span class="sr-only">111% Complete</span>
					              </div>
					            </div>

					            <div>

					            </div>
					          </div>
					        </div>
					        <!-- /Card 1 -->

					        <!-- Card 3 -->
					        <div class="col-xl-3 col-sm-6">
					          <div class="card card-body">
					            <div class="media mb-3 px-0 pt-0">
					              <div class="media-body">
					                <h5 class="dsh-semi-bold">&#8358 ${userNGNWallet.toString().slice(0, -2)}</h5>
					                <span>User wallet NGN</span>
					              </div>

					              <div class="ml-3 align-self-center">
					                <span class="btn btn-icon btn-lg btn-danger-light">
					                  <i class="lni-pulse icon-2x"></i>
					                </span>
					              </div>
					            </div>

					            <div class="progress progress-sm">
					              <div class="progress-bar bg-danger" style="width: 12%">
					                <span class="sr-only">12% Usage</span>
					              </div>
					            </div>

					            <div>

					            </div>
					          </div>
					        </div>
					        <!-- /Card 3 -->

					        <!-- Card 2 -->
					        <div class="col-xl-3 col-sm-6">
					          <div class="card card-body">
					            <div class="media mb-3 px-0 pt-0">
					              <div class="media-body">
					                <h5 class="dsh-semi-bold">$ ${userUsdWithdraw}</h5>
					                <span>User withdraws USD</span>
					              </div>

					              <div class="ml-3 align-self-center">
					                <span class="btn btn-icon btn-lg btn-warning-light">
					                  <i class="lni-money-location icon-2x"></i>
					                </span>
					              </div>
					            </div>

					            <div class="progress progress-sm">
					              <div class="progress-bar bg-warning" style="width: 100%">
					                <span class="sr-only">100% Used</span>
					              </div>
					            </div>

					            <div>

					            </div>
					          </div>
					        </div>
					        <!-- /Card 2 -->


					        	<!-- Card 4 -->
					        <div class="col-xl-3 col-sm-6">
					          <div class="card card-body">
					            <div class="media mb-3 px-0 pt-0">
					              <div class="media-body">
					                <h5 class="dsh-semi-bold">&#8358 ${userNGNWithdraw}</h5>
					                <span>User withdraws NGN</span>
					              </div>

					              <div class="ml-3 align-self-center">
					                <span class="btn btn-icon btn-lg btn-success-light">
					                  <i class="lni-revenue icon-2x"></i>
					                </span>
					              </div>
					            </div>

					            <div class="progress progress-sm">
					              <div class="progress-bar bg-success" style="width: 100%">
					                <span class="sr-only">100% ready</span>
					              </div>
					            </div>

					            <div>
					            </div>
					          </div>
					        </div>
					        <!-- /Card 4 -->

					        <!-- Card 1 -->
						        <div class="col-12">
						        	<h1>Total Payment/Transactions </h1>
						        </div>
					        <div class="col-xl-3 col-sm-6">
					          <div class="card card-body">
					            <div class="media mb-3 px-0 pt-0">
					              <div class="media-body">
					                <h5 class="dsh-semi-bold">$ ${transactionUSDWallet.toString().slice(0, -2)}</h5>
					                <span>Transactions in USD</span>
					              </div>

					              <div class="ml-3 align-self-center">
					                <span class="btn btn-icon btn-lg btn-primary-light">
					                  <i class="lni-radio-button icon-2x"></i>
					                </span>
					              </div>
					            </div>

					            <div class="progress progress-sm">
					              <div class="progress-bar bg-primary" style="width: 11%">
					                <span class="sr-only">111% Complete</span>
					              </div>
					            </div>

					            <div>

					            </div>
					          </div>
					        </div>
					        <!-- /Card 1 -->

					        <!-- Card 3 -->
					        <div class="col-xl-3 col-sm-6">
					          <div class="card card-body">
					            <div class="media mb-3 px-0 pt-0">
					              <div class="media-body">
					                <h5 class="dsh-semi-bold">&#8358 ${transactionNGNWallet.toString().slice(0, -2)}</h5>
					                <span>Transactions in  NGN</span>
					              </div>

					              <div class="ml-3 align-self-center">
					                <span class="btn btn-icon btn-lg btn-danger-light">
					                  <i class="lni-pulse icon-2x"></i>
					                </span>
					              </div>
					            </div>

					            <div class="progress progress-sm">
					              <div class="progress-bar bg-danger" style="width: 12%">
					                <span class="sr-only">12% Usage</span>
					              </div>
					            </div>

					            <div>

					            </div>
					          </div>
					        </div>
					        <!-- /Card 3 -->

					        <!-- Card 2 -->
					        <div class="col-xl-3 col-sm-6">
					          <div class="card card-body">
					            <div class="media mb-3 px-0 pt-0">
					              <div class="media-body">
					                <h5 class="dsh-semi-bold">$ ${totalUSDPayment.toString().slice(0, -2)}</h5>
					                <span>Payments In USD</span>
					              </div>

					              <div class="ml-3 align-self-center">
					                <span class="btn btn-icon btn-lg btn-warning-light">
					                  <i class="lni-money-location icon-2x"></i>
					                </span>
					              </div>
					            </div>

					            <div class="progress progress-sm">
					              <div class="progress-bar bg-warning" style="width: 100%">
					                <span class="sr-only">100% Used</span>
					              </div>
					            </div>

					            <div>

					            </div>
					          </div>
					        </div>
					        <!-- /Card 2 -->


					        	<!-- Card 4 -->
					        <div class="col-xl-3 col-sm-6">
					          <div class="card card-body">
					            <div class="media mb-3 px-0 pt-0">
					              <div class="media-body">
					                <h5 class="dsh-semi-bold">&#8358 ${totalNGNPayment.toString().slice(0, -2)}</h5>
					                <span>Payment in NGN</span>
					              </div>

					              <div class="ml-3 align-self-center">
					                <span class="btn btn-icon btn-lg btn-success-light">
					                  <i class="lni-revenue icon-2x"></i>
					                </span>
					              </div>
					            </div>

					            <div class="progress progress-sm">
					              <div class="progress-bar bg-success" style="width: 100%">
					                <span class="sr-only">100% ready</span>
					              </div>
					            </div>

					            <div>
					            </div>
					          </div>
					        </div>
					        <!-- /Card 4 -->
					        <div class="col-xl-5">
					          <!-- 
					          <div class="card">
					            <div class="card-body">
					              <div class="dsh-section-title">
					                <h5 class="card-title">Recent Projects</h5>
					              </div>
					              <div class="d-flex flex-sm-row flex-column">
					                <div class="mb-4 mb-sm-0">
					                  <p class="wmax-150 mr-2 mb-0"> <span class="h1 text-dark"></span></p>
					                  <span class="badge badge-success-light fs-13 p-2 badge-pill"><i class="lni-arrow-up dsh-semi-bold"></i> %</span>
					                </div>
					                <div class="w-100">
						         	
					                </div>
					              </div>
					              <div id="dsh_statistics_ex_3"></div>
					            </div>
					          </div>
					           -->

					          <!-- 
					          <div class="card">
					            <div class="card-body">
					              <div class="dsh-section-title">
					                <h5 class="card-title">Region reports</h5>
					                <h6 class="card-subtitle">Top purchases by country</h6>
					              </div>
					              <div id="dsh_worldmap_ex_1" class="jvq-map"></div>
					              <hr class="dsh-seperator">
					              <div class="media pt-0 pl-0">
					                <img src="../assets/img/flags/india.png" alt="india">
					                <div class="media-body">
					                  <div class="d-flex align-items-center justify-content-between mb-2">
					                    <h6>India</h6>
					                    <span class="fs-12">30%</span>
					                  </div>
					                  <div class="progress progress-sm w-100">
					                    <div class="progress-bar bg-warning" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
					                  </div>
					                </div>
					              </div>
					              <div class="media pt-0 pl-0">
					                <img src="../assets/img/flags/russia.png" alt="russia">
					                <div class="media-body">
					                  <div class="d-flex align-items-center justify-content-between mb-2">
					                    <h6>Russia</h6>
					                    <span class="fs-12">35%</span>
					                  </div>
					                  <div class="progress progress-sm w-100">
					                    <div class="progress-bar bg-info" role="progressbar" style="width: 35%" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
					                  </div>
					                </div>
					              </div>
					              <div class="media pt-0 pl-0">
					                <img src="../assets/img/flags/brazil.png" alt="brazil">
					                <div class="media-body">
					                  <div class="d-flex align-items-center justify-content-between mb-2">
					                    <h6>Brazil</h6>
					                    <span class="fs-12">45%</span>
					                  </div>
					                  <div class="progress progress-sm w-100">
					                    <div class="progress-bar bg-success" role="progressbar" style="width: 45%" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
					                  </div>
					                </div>
					              </div>
					              <div class="media pt-0 pl-0 pb-0">
					                <img src="../assets/img/flags/china.png" alt="china">
					                <div class="media-body">
					                  <div class="d-flex align-items-center justify-content-between mb-2">
					                    <h6>China</h6>
					                    <span class="fs-12">43%</span>
					                  </div>
					                  <div class="progress progress-sm w-100 mb-0">
					                    <div class="progress-bar bg-danger" role="progressbar" style="width: 43%" aria-valuenow="43" aria-valuemin="0" aria-valuemax="100"></div>
					                  </div>
					                </div>
					              </div>

					            </div>
					          </div>
					          World Map -->

					        </div>

					        <div class="col-xl-7">
					          <!--
					          <div class="card">
					            <div class="card-body">
					              <div class="dsh-section-title">
					                <h5 class="card-title">Revenue Statistics</h5>
					              </div>
					              <div class="d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">
					                <div class="w-md-100 d-flex align-items-center mb-3">
					                  <div>
					                    <p class="dsh-semi-bold h3 text-dark mr-4" id="currentRevenue">$0</p>
					                    <span>Total Sales</span>
					                  </div>
					                  <div>
					                    <p class="dsh-semi-bold h3 text-dark" id="averageRevenue">$0</p>
					                    <span>Average Sales</span>
					                  </div>
					                </div>
					                <div class="btn-group mb-3 dsh-active-parent" role="group" aria-label="Basic example">
					                  <button type="button" class="btn btn-outline-light dsh-can-active active">Last 6 Months</button>
					                  <button type="button" class="btn btn-outline-light dsh-can-active">Last Year</button>
					                </div>
					              </div>
					              <div id="dsh_statistics_ex_1"></div>
					              <div id="dsh_statistics_ex_2"></div>
					            </div>
					          </div>
					          -->

					          <div class="row">

					            <!-- 
					            <div class="col-lg-6">
					              <div class="card card-body card-fh">
					                <div class="dsh-section-title">
					                  <h5 class="card-title">Trending Products</h5>
					                </div>
					                <div class="dsh-slider text-center">
					                  <div class="dsh-slider-item">
					                    <div class="dsh-slider-item--inner bg-transparent">
					                      <div class="dsh-avatar dsh-avatar-lg dsh-avatar-elevated mb-3 mx-auto">
					                        <img src="../assets/img/prods/prod1-md.jpg" class="rounded-circle" alt="product">
					                      </div>
					                      <h6 class="mb-0"> <a href="#">Blue and orange lace</a> </h6>
					                      <p class="my-3">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
					                      <a href="#" class="btn btn-outline-light">View Details</a>
					                    </div>
					                  </div>
					                  <div class="dsh-slider-item">
					                    <div class="dsh-slider-item--inner bg-transparent">
					                      <div class="dsh-avatar dsh-avatar-lg dsh-avatar-elevated mb-3 mx-auto">
					                        <img src="../assets/img/prods/prod2-md.jpg" class="rounded-circle" alt="product">
					                      </div>
					                      <h6 class="mb-0"> <a href="#">Futuristic watch</a> </h6>
					                      <p class="my-3">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
					                      <a href="#" class="btn btn-outline-light">View Details</a>
					                    </div>
					                  </div>
					                  <div class="dsh-slider-item">
					                    <div class="dsh-slider-item--inner bg-transparent">
					                      <div class="dsh-avatar dsh-avatar-lg dsh-avatar-elevated mb-3 mx-auto">
					                        <img src="../assets/img/prods/prod3-md.jpg" class="rounded-circle" alt="product">
					                      </div>
					                      <h6 class="mb-0"> <a href="#">Next generation phone</a> </h6>
					                      <p class="my-3">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
					                      <a href="#" class="btn btn-outline-light">View Details</a>
					                    </div>
					                  </div>
					                </div>
					                <div class="dsh-slider-arrows">
					                  <i class="lni-chevron-left dsh-slider-arrow dsh-slider-prev"></i>
					                  <i class="lni-chevron-right dsh-slider-arrow dsh-slider-next"></i>
					                </div>
					              </div>
					            </div>
					             -->

					            <!-- 
					            <div class="col-lg-6">
					              <div class="card card-fh">
					                <div class="card-header p-0">
					                  <ul class="nav nav-bordered mb-0" id="bordered-tab" role="tablist">
					                    <li class="nav-item">
					                      <a class="nav-link active" id="changes-week-tab" data-toggle="pill" href="#changes-week" role="tab" aria-controls="changes-week" aria-selected="true">Weekly</a>
					                    </li>
					                    <li class="nav-item">
					                      <a class="nav-link" id="changes-month-tab" data-toggle="pill" href="#changes-month" role="tab" aria-controls="changes-month" aria-selected="false">Monthly</a>
					                    </li>
					                  </ul>
					                </div>
					                <div class="card-body">
					                  <div class="tab-content" id="bordered-tabContent">
					                    <div class="tab-pane fade show active" id="changes-week" role="tabpanel" aria-labelledby="changes-week-tab">
					                      <table class="table mb-0">
					                        <thead class="thead-light">
					                          <tr>
					                            <th>Name</th>
					                            <th>Change</th>
					                          </tr>
					                        </thead>
					                        <tbody>
					                          <tr>
					                            <td>
					                              <div class="media p-0 align-items-center">
					                                <img src="../assets/img/prods/prod1-sm.jpg" class="rounded-circle" alt="product">
					                                <div class="media-body">
					                                  <a href="#" class="btn-link">Tiger Nixon</a>
					                                </div>
					                              </div>
					                            </td>
					                            <td class="text-success dsh-light-bold"> 10% </td>
					                          </tr>
					                          <tr>
					                            <td>
					                              <div class="media p-0 align-items-center">
					                                <img src="../assets/img/prods/prod2-sm.jpg" class="rounded-circle" alt="product">
					                                <div class="media-body">
					                                  <a href="#" class="btn-link">Garrett Winter</a>
					                                </div>
					                              </div>
					                            </td>
					                            <td class="text-success dsh-light-bold"> 32% </td>
					                          </tr>
					                          <tr>
					                            <td>
					                              <div class="media p-0 align-items-center">
					                                <img src="../assets/img/prods/prod3-sm.jpg" class="rounded-circle" alt="product">
					                                <div class="media-body">
					                                  <a href="#" class="btn-link">Ashton Hue</a>
					                                </div>
					                              </div>
					                            </td>
					                            <td class="text-danger dsh-light-bold"> 12% </td>
					                          </tr>
					                          <tr>
					                            <td>
					                              <div class="media p-0 align-items-center">
					                                <img src="../assets/img/prods/prod4-sm.jpg" class="rounded-circle" alt="product">
					                                <div class="media-body">
					                                  <a href="#" class="btn-link">Cedric Kelly</a>
					                                </div>
					                              </div>
					                            </td>
					                            <td class="text-success dsh-light-bold"> 45% </td>
					                          </tr>
					                          <tr>
					                            <td>
					                              <div class="media p-0 align-items-center">
					                                <img src="../assets/img/prods/prod5-sm.jpg" class="rounded-circle" alt="product">
					                                <div class="media-body">
					                                  <a href="#" class="btn-link">Tiger Nixon</a>
					                                </div>
					                              </div>
					                            </td>
					                            <td class="text-danger dsh-light-bold"> 22% </td>
					                          </tr>
					                          <tr>
					                            <td>
					                              <div class="media p-0 align-items-center">
					                                <img src="../assets/img/prods/prod6-sm.jpg" class="rounded-circle" alt="product">
					                                <div class="media-body">
					                                  <a href="#" class="btn-link"> Ashton Hue</a>
					                                </div>
					                              </div>
					                            </td>
					                            <td class="text-success dsh-light-bold"> 8% </td>
					                          </tr>
					                        </tbody>
					                      </table>
					                    </div>
					                    <div class="tab-pane fade" id="changes-month" role="tabpanel" aria-labelledby="changes-month-tab">
					                      <table class="table mb-0">
					                        <thead class="thead-light">
					                          <tr>
					                            <th>Name</th>
					                            <th>Change</th>
					                          </tr>
					                        </thead>
					                        <tbody>
					                          <tr>
					                            <td>
					                              <div class="media p-0 align-items-center">
					                                <img src="../assets/img/prods/prod4-sm.jpg" class="rounded-circle" alt="product">
					                                <div class="media-body">
					                                  <a href="#" class="btn-link">Cedric Kelly</a>
					                                </div>
					                              </div>
					                            </td>
					                            <td class="text-success dsh-light-bold"> 45% </td>
					                          </tr>

					                          <tr>
					                            <td>
					                              <div class="media p-0 align-items-center">
					                                <img src="../assets/img/prods/prod2-sm.jpg" class="rounded-circle" alt="product">
					                                <div class="media-body">
					                                  <a href="#" class="btn-link">Garrett Winter</a>
					                                </div>
					                              </div>
					                            </td>
					                            <td class="text-success dsh-light-bold"> 32% </td>
					                          </tr>

					                          <tr>
					                            <td>
					                              <div class="media p-0 align-items-center">
					                                <img src="../assets/img/prods/prod1-sm.jpg" class="rounded-circle" alt="product">
					                                <div class="media-body">
					                                  <a href="#" class="btn-link">Tiger Nixon</a>
					                                </div>
					                              </div>
					                            </td>
					                            <td class="text-success dsh-light-bold"> 10% </td>
					                          </tr>
					                          <tr>
					                            <td>
					                              <div class="media p-0 align-items-center">
					                                <img src="../assets/img/prods/prod5-sm.jpg" class="rounded-circle" alt="product">
					                                <div class="media-body">
					                                  <a href="#" class="btn-link">Tiger Nixon</a>
					                                </div>
					                              </div>
					                            </td>
					                            <td class="text-danger dsh-light-bold"> 22% </td>
					                          </tr>
					                          <tr>
					                            <td>
					                              <div class="media p-0 align-items-center">
					                                <img src="../assets/img/prods/prod3-sm.jpg" class="rounded-circle" alt="product">
					                                <div class="media-body">
					                                  <a href="#" class="btn-link">Ashton Hue</a>
					                                </div>
					                              </div>
					                            </td>
					                            <td class="text-danger dsh-light-bold"> 12% </td>
					                          </tr>
					                          <tr>
					                            <td>
					                              <div class="media p-0 align-items-center">
					                                <img src="../assets/img/prods/prod6-sm.jpg" class="rounded-circle" alt="product">
					                                <div class="media-body">
					                                  <a href="#" class="btn-link"> Ashton Hue</a>
					                                </div>
					                              </div>
					                            </td>
					                            <td class="text-success dsh-light-bold"> 8% </td>
					                          </tr>
					                        </tbody>
					                      </table>
					                    </div>
					                  </div>
					                </div>
					              </div>
					            </div>
					             -->
					             <!--
					            <div class="col-lg-12">
					              <div class="card card-body">
					                <div class="dsh-section-title">
					                  <h5 class="card-title">Loyal Customers</h5>
					                </div>
					                <table class="table mb-0">
					                  <thead class="thead-light">
					                    <tr>
					                      <th>Name</th>
					                      <th>Gender</th>
					                      <th>Actions</th>
					                    </tr>
					                  </thead>
					                  <tbody>

					                  </tbody>
					                </table>
					              </div>
					            </div>
					            -->
					          </div>

					        </div>

					      </div>
					    </div>
					</div>`;

		 	body.insertAdjacentHTML('beforeend', html);
				
			}

			const loadDashboard=(response)=>{
			console.log(response)
				if (response.status === 401) {
					console.log(response);
					loading("user-side-bar-open", "display-none");
					body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {				
					
					dashboard(response.admin, response.adminWallets, response.admins, response.payments, response.transactions, response.userWallets, response.users, response.withdraws);
					
				}
			}


			adminGetRequest("admins/dashboard", token, "GET", loadDashboard);

	}







});