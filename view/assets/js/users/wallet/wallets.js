define(function(require, exports, module) {
		 let createBankAccount;

	exports.wallets =(token, id)=>{	
	const {getRequest} = require("request")
	const {loginForm} = require("../../logins");
  const {loading} = require("../../loading");	
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	const {sideBar} = require("../sidebar");
	spinner.className ="display-none";
	
		const displayWallets = (user, wallets,)=>{
				sideBar(token, id);
				
			const html = `<div class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

											<!-- Breadcrumbs -->
											<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
												<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
													<h1>Wallets</h1>
													<ol class="breadcrumb style-1">
														<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
														<li class="breadcrumb-item"><a href="#">Wallets</a></li>													</ol>
												</div>
											</div>

											<div class="row"> 	
								   
												<div class="col-xl-12">
													<div class="card">
														<div class="card-body bg-background">
															<div class="dsh-section-title">
																<h5 class="card-title">Wallets</h5>
															</div>
															<div class="row justify-content-center">
															${wallets.map((wallet)=>{
																let currency, currencyCharacter;
																currencyCharacter = wallet.currency === "USD"?"$":wallet.currency === "NGN"?"&#8358":"&#8358"
																currency = wallet.currency === "USD"?'<i class="lni-revenue icon-2x"></i>':' <i class=lni-money-location icon-2x></i>'
																return `<div class="col-xl-5 col-md-5 col-sm-6">
														          <div class="card card-body">
														            <div class="media mb-3 px-0 pt-0">
														              <div class="media-body">
														              	<b>${currencyCharacter}</b>
														                <h5 class="dsh-semi-bold"id="total-financies">${wallet.amount}</h5>
														                <p>Total Wallet (${wallet.currency})</p>
														              	<a href="/users/withdraw/${wallet._id}"><button class="btn-sm btn-dark mt-3">withdraw</button></a>
														              </div>

														              <div class="ml-3 align-self-center">
														                <span class="btn btn-icon btn-lg btn-success-light">
														                  ${currency}
														                </span>
														              </div>

														            </div>
														          </div>
														        </div>`

															})}

															</div>
												</div>

											</div>

										</div>`;
	 body.insertAdjacentHTML('beforeend', html);
		}			
		const loadDashboard=(response)=>{
				console.log(response.wallets)
				if (response.status === 401) {
                  loading("spinner", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					displayWallets(response.user, response.wallets);
				}
			}


			getRequest("wallets", token, "GET", loadDashboard);

	}


});