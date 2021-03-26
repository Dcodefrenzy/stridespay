define(function(require, exports, module) {
		 let createBankAccount;

	exports.withdraw =(token, id)=>{	
	const {getRequest} = require("../request")
	const {loginForm} = require("../logins");
  const {loading} = require("../loading");
	const {startTransfer} = require("./transfer");	
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	const {sideBar} = require("./sidebar");
	spinner.className ="display-none";
	
		const displayWithdraw = (user, wallet, withdraw, bank,)=>{
				sideBar(token, id);
				console.log(id)

				let walletAmount, currencyCharacter;
				walletAmount = wallet.amount === 0 ?0:wallet.amount.toString().slice(0, -2)
				currencyCharacter = wallet.currency === "USD"?"$":wallet.currency === "NGN"?"&#8358":"&#8358"
			const html = `<div id="transfer" class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

											<!-- Breadcrumbs -->
											<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
												<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
													<h1>Withdraw</h1>
													<ol class="breadcrumb style-1">
														<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
														<li class="breadcrumb-item"><a href="/users/wallets">Wallets</a></li>
														<li class="breadcrumb-item"><a href="#">Withdraw</a></li>													
													</ol>
												</div>
											</div>

											<div class="row"> 	
								   
												<div class="col-xl-12">
													<div class="card">
														<div class="card-body bg-background">
															<div class="dsh-section-title">
																<h5 class="card-title">withdrawal Page</h5>
																<span>Withdraw all your money, no questions.</span>
															</div>
															<div class="row justify-content-center">
																								
																<div class="col-12 col-sm-12 col-md-12">
																	<div class="card bg-background">
																	<div class="card-body">
																	<h1>Revenue</h1>
																		<p><b>Wallet Balance in ${wallet.currency}:  ${currencyCharacter} ${walletAmount}</b></p>
																		<p><b>Total Withdrawals Done in ${withdraw.currency}:  ${currencyCharacter} ${withdraw.totalwithdraws}</b></p>
																		<p><b>Bank: ${bank.bank}</b></p>
																		<p><b>Account Number: ${bank.account}</b></p>
																		<p><b>Account Name: ${bank.accountName}</b></p>

																	<form id="withdraws/initiate/${id}" class="createWithdraw" name="submitForm" onsubmit="return register(event)">
																		<div class="row">
																			<div class="col-12 col-sm-12 col-md-12">
																				<div class="form-group">
																					<label id="error-amount" class="card-title">Amount</label>
																					<input type="Number" name="amount" min="1" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="How much you want to withdraw?">
																				</div>
																			</div>
																			<div class="col-12 col-sm-12 col-md-12">
																				<div class="form-group">
																					<label id="error-password" class="card-title">Password</label>
																					<input type="password" name="password" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="your password?">
																				</div>
																			</div>
																			<div class="col-12 col-sm-12 col-md-12">
																				<div class="form-group">
																					<input type="submit" name=${id} class="form-control btn-lg btn-dark" value="Withdraw">
																				</div>
																			<div>
																		</div>
																	</form>
																	<h4>Full Withdral</h4>
																	<p>Click the button below to withdraw everything from your wallet.</p>
																	<a href="/users/withdraw/all/${id}" class="btn-lg- btn-success">Withdraw All</a>	
																	</div>
																		
																</div
															</div>
												</div>

											</div>

										</div>`;
	 			body.insertAdjacentHTML('beforeend', html);
		}			
		const loadDashboard=(response)=>{
				
				if (response.status === 401) {
                  loading("spinner", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					displayWithdraw(response.user, response.wallet, response.withdraw, response.bank);
				}else if (response.status === 403) {
						alert(response.message)
                  		loading("spinner", "display-none");
						window.location = "/users/bank/account";
				}
			}


			getRequest("withdraws/withdraw/"+id, token, "GET", loadDashboard);

	}


});