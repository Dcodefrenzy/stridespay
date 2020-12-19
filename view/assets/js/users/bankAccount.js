define(function(require, exports, module) {
		 let createBankAccount;

	exports.createBankAccount =(token, id)=>{
	const {loading} = require("../loading");
	const {getRequest} = require("../request");
	const {loginForm} = require("../logins");		
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";

     loading("spinner", "display-none");
	const showbankForm =(banks)=>{
		const html = `<div id="revert" class="fixed-top bg-green full-height">
				<div class="">
				<div id="loading"></div>
					<div class="row mt-2 p-3">
					<div class="col-12 col-sm-12 col-md-12 col-lg-12">
				<a href="/users/products"><i class="fa fa-arrow-left text-dark"></i></div></a>
					</div>
				<div class="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3">
					<h1>Bank Account</h1>
					<p class="text-white">create your bank account</p>
					<form id="accounts/create" class="createAccount" name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-bankname">Bank</label>
											<select class="form-control" name="bankname" oninput="return returnValidation(this.value, this.name)" required>
													<option value="">Select Bank</option>

												${banks.map((bank)=>{
													return `<option value=${bank.Code}>${bank.Name}</option>`
												})}
											</select>
									</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">							
								<div class="form-group">
									<label id="error-accountnumber">Account Number</label>
									<input type="Number" name="accountnumber" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="account number">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">							
								<div class="form-group">
									<label id="error-accountname">Account Name</label>
									<input type="text" name="accountname" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="account name">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<input type="submit"   name="${id}" class="form-control btn-lg btn-success" value="Create Account">
								</div>
							<div>
						</div>
					</form>
				</div>
			</div>
		</div>
	 </div>`;
	 body.insertAdjacentHTML('afterbegin', html);
	}
	
	const loadDashboard=(response)=>{
		console.log(response);
		
			showbankForm(response.data.Banks)
		if (response.status === "success") {
			showbankForm(response.data.Banks)

		}
	}


			getRequest("payments/banks", token, "GET", loadDashboard);

	}


});