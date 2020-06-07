define(function(require, exports, module) {
		 let createBankAccount;

	exports.withdraw =(token, id)=>{	
	const {getRequest} = require("../request")
	const {loginForm} = require("../logins");
	const {startTransfer} = require("./transfer");	
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";
	
		const displayWithdraw = (user, wallet, withdraw, bank,)=>{
			const html = `<div id="revert" class="fixed-top bg-green full-height">
				<div class="">
				<div id="loading"></div>
					<div class="row mt-2 p-3">
					<div class="col-12 col-sm-12 col-md-12 col-lg-12">
				<a href="/users/products"><i class="fa fa-arrow-left text-dark"></i></div></a>
					</div>
				<div class="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3">
					<h1>Withdraw Page</h1>
					<span>Withdraw all your money, no questions.</span>
					<div  class="mt-5">
						<div class="row">
							<div class="col-12 col-sm-12 col-md-12">
								<div class="card">
								<div class="card-body">
								<h1>Revenue</h1>
								<p><b>Balance: ${wallet.amount.toString().slice(0, -2)}</b></p>
								<p><b>Total Withdrawals Done: ${withdraw}</b></p>
								<p><b>Bank: ${bank.bank}</b></p>
								<p><b>Account Number: ${bank.account}</b></p>
								<p><b>Account Name: ${bank.accountName}</b></p>
								<input type="submit" class="btn-lg- btn-success" onclick="startTransfer(event)"   name=${id} class="form-control btn-lg btn-dark" value="Withdraw">
								</div>
									
								</div>
							<div>
						</div>
					</div>
				</div>
			</div>
		</div>
	 </div>`;
	 body.insertAdjacentHTML('afterbegin', html);
		}			
		const loadDashboard=(response)=>{
				
				if (response.status === 401) {
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					displayWithdraw(response.user, response.wallet, response.withdraw, response.bank);
				}else if (response.status === 403) {
						alert(response.message)
						window.location = "/users/bank/account";
				}
			}


			getRequest("withdraws/withdraw", token, "GET", loadDashboard);

	}


});