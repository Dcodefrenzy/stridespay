define(function(require, exports, module) {
		 

	return initiateTransfer =(event, token, id)=>{
	const {getRequest} = require("../request")
	const {loginForm} = require("../logins");
  const {loading} = require("../loading");		
	const body = document.getElementById("body");
	const spinner = document.getElementById("transfer");
	spinner.className ="display-none";
	
		const displayWithdraw = (wallet)=>{

				walletAmount = wallet.amount === 0 ?0:wallet.amount.toString().slice(0, -2)
		const html = `<div id="revert" class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

			<!-- Breadcrumbs -->
			<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
				<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					<h1>Product</h1>
					<ol class="breadcrumb style-1">
						<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item"><a href="/users/projects">projects</a></li>
						<li class="breadcrumb-item" aria-current="page">Product</li>
					</ol>
				</div>
			</div>

			<div class="row">

				<div class="col-xl-12">
					<div class="card">
						<div class="card-body">
							<h1>Product Token</h1>
							<p class="text-dark">create a product prepaid token and speed up your transcations</p>

							<form id="withdraws/initiate/${id}" class="createWithdraw" name="submitForm" onsubmit="return register(event)">
								<div class="row">
									<div class="col-12 col-sm-12 col-md-12">							
										<div class="form-group">
											<label id="error-amount">Amount</label>
											<input type="Number" value="${walletAmount}" min="1" name="amount" required oninput="return returnValidation(this.value, this.name)"  class="form-control" readonly>
										</div>
									</div>
									<div class="col-12 col-sm-12 col-md-12">							
										<div class="form-group">
											<label id="error-password">Password</label>
											<input type="password" name="password" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Your password?">
										</div>
									</div>
									<div class="col-12 col-sm-12 col-md-12">
										<div class="form-group">
											<input type="submit"   name="${id}" class="form-control btn-lg btn-dark" value="Withdraw">
										</div>
									<div>
								</div>
							</form>
						</div>
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
					displayWithdraw(response.wallet);
				}else if (response.status === 403) {
						alert(response.message)
                  		loading("spinner", "display-none");
						window.location = "/users/bank/account";
				}
			}


			getRequest("withdraws/withdraw/"+id, {"token":token,"":""}, "GET", loadDashboard);
	}



});