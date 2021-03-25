
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
	const {createWalletCurrency} = require("./createWalletCurrency");
/*	const sideBar = document.getElementById("user-side-bar-open");
	sideBar.className="display-none"*/
	spinner.className ="display-none";

	const dashboard=(user, wallet,withdraw, transactions, clients, wallets)=>{
				require(['jquery', 'popper.min', 'script', 'libs'], function ($, popper, script, libs) {
					console.log(popper)
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

				const html = `<div class="">
					 <div class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

					      <!-- Breadcrumbs -->
					      <div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
					        <div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					          <h1>Dashboard</h1>
					        </div>

					        <div class="breadcrumb-controls mt-sm-0 mt-3">

					          ${wallets}
					          <div class="btn-group dropdown">
					            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					              Track Projects
					            </button>
					            <div class="dropdown-menu">
					              <a class="dropdown-item media align-items-center" href="/users/transactions/client">
					                <i class="lni-bar-chart"></i>
					                <div class="media-body">
					                  <h6>As a client</h6>
					                  <p class="text-muted fs-12">Track your paid project</p>
					                </div>
					              </a>
					              <a class="dropdown-item media align-items-center" href="/users/transactions/freelancer">
					                <i class="lni-pie-chart"></i>
					                <div class="media-body">
					                  <h6>As a Freelancer</h6>
					                  <p class="text-muted fs-12">Projects you are working on</p>
					                </div>
					              </a>
					            </div>
					          </div>
					         <a href="/users/projects"> <button type="button" class="btn btn-secondary">Create Project</button></a>
					        </div>

					      </div>

					      <div class="row">
					        <!-- Card 1 -->
					        <div class="col-xl-3 col-sm-6">
					          <div class="card card-body">
					            <div class="media mb-3 px-0 pt-0">
					              <div class="media-body">
					                <h5 class="dsh-semi-bold">${transactionsLength.length}</h5>
					                <span>Projects Completed</span>
					              </div>

					              <div class="ml-3 align-self-center">
					                <span class="btn btn-icon btn-lg btn-primary-light">
					                  <i class="lni-radio-button icon-2x"></i>
					                </span>
					              </div>
					            </div>

					            <div class="progress progress-sm">
					              <div class="progress-bar bg-primary" style="width: ${projectPercentage}%">
					                <span class="sr-only">${projectPercentage}% Complete</span>
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
					                <h5 class="dsh-semi-bold">${clients.length}</h5>
					                <span>Total No of Clients</span>
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
					                <h5 class="dsh-semi-bold">&#8358 ${wallet.amount.toString().slice(0, -2)}</h5>
					                <span>Total Amount of Revenue</span>
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
					                <h5 class="dsh-semi-bold">&#8358 ${withdraw}</h5>
					                <span>Total Withdrawal</span>
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
						                ${showNoTransactions}
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

						                 ${showNoClients}
						                 ${
						                  clients.map((client)=>{
						                  	let image;
						                  	if (!client.buyers.image) {
						                  		 image = "fav1.png";
						                  	}else{
						                  		 image = client.buyers.image
						                  	}
						               return `<tr>
					                      <td>
					                        <div class="media p-0 align-items-center">
					                          <img src="/assets/images/${image}" class="rounded-circle" alt="product">
					                          <div class="media-body">
					                            <p class="btn-link">${client.buyers.name}</p>
					                          </div>
					                        </div>
					                      </td>
					                      <td>${client.buyers.gender}</td>
					                      <td>
					                        <div class="dropleft d-inline-block"><a href="#" class="btn btn-icon btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="lni-more-alt"></i></a>
					                          <div class="dropdown-menu">
					                            <a class="dropdown-item media align-items-center" href="/users/client-projects/${client.buyers._id}"><i class="lni-enter"></i>
					                              <div class="media-body">
					                                <h6>View</h6>
					                                <p class="text-muted fs-12">View user profile</p>
					                              </div>
					                            </a>
					                            <a class="dropdown-item media align-items-center" href="mailto: ${client.buyers.email}"><i class="lni-pencil"></i>
					                              <div class="media-body">
					                                <h6>Message</h6>
					                                <p class="text-muted fs-12">Send your client a mail</p>
					                              </div>
					                            </a>
					                            <div class="dropdown-divider"></div>
					                            <a class="dropdown-item media align-items-center text-danger" href="mailto: ${client.buyers.phonenumber}"><i class="lni-phone"></i>
					                              <div class="media-body">
					                                <h6>Call</h6>
					                                <p class="text-muted fs-12">Call your client</p>
					                              </div>
					                            </a>
					                          </div>
					                        </div>
					                      </td>
					                    </tr>`;
						                 })}
					                  </tbody>
					                </table>
					              </div>
					            </div>

					          </div>

					        </div>

					      </div>

					      <!-- 
					      <div class="card">
					        <div class="card-body">
					          <div class="dsh-section-title">
					            <h5 class="card-title">Top Selling Products</h5>
					          </div>
					          <div class="table-responsive">
					            <table class="table">
					              <thead class="thead-light">
					                <tr>
					                  <th>Name</th>
					                  <th>Stock</th>
					                  <th>Price</th>
					                  <th>Sales</th>
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
					                  <td> <span class="badge badge-success-light fs-11 p-2">In Stock</span> </td>
					                  <td>50$ - 130$</td>
					                  <td> 91 </td>
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
					                  <td> <span class="badge badge-success-light fs-11 p-2">In Stock</span> </td>
					                  <td>50$ - 130$</td>
					                  <td> 55 </td>
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
					                  <td> <span class="badge badge-danger-light fs-11 p-2">Out of Stock</span> </td>
					                  <td>50$ - 130$</td>
					                  <td> 52 </td>
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
					                  <td> <span class="badge badge-success-light fs-11 p-2">In Stock</span> </td>
					                  <td>50$ - 130$</td>
					                  <td> 48 </td>
					                </tr>
					              </tbody>
					            </table>
					          </div>
					        </div>
					      </div>
					       -->
					    </div>
					</div>`;

		 	body.insertAdjacentHTML('beforeend', html);


				})
				
			}

			const loadDashboard=(response)=>{
			console.log(response)
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
					let updateWalletButton;
				const wallets = response.userWallets.find(wallet=> wallet.currency === "USD")
				if (wallets  === undefined) {
					updateWalletButton = `<a id="wallets/update/currency" onclick="return createWalletCurrency(event, this.id)"> <button type="button" class="btn btn-success-light">Create dollar wallet</button></a>`
				}else{
					updateWalletButton = ""
				}
					dashboard(response.user, response.wallet, response.withdraw, response.transactions, newArray, updateWalletButton);
					updateNotification(token);
				}
			}


			getRequest("users/profile", token, "GET", loadDashboard);

	}







});