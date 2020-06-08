define(function(require, exports, module) {
	exports.loginSession=(event, id)=>{	

	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";
	const loginEmail = require("../users/logins/loginEmail");
	const loginPhone = require("../users/logins/loginPhone");

		let html = `<div id="login" class="bg-green full-height container-fluid"><div class="">
					<div class="row align-items-center mt-2 p-2 pt-5">
		<div class="col-12  col-sm-12 col-md-7 offset-md-3 col-lg-7 offset-lg-3">
				<a href="/"><i class="fa fa-arrow-left text-dark"></i></div></a>
				<div class="col-12 col-sm-12 col-md-5 offset-md-3 col-lg-5 offset-lg-3">
					<h1>Login</h1>
					<div class="row text-center">
						<button class="btn-sm btn-success m-2" onclick="return loginEmail(event)">Login with Email</button>
						<button class="btn-sm btn-dark m-2" onclick="return loginPhone(event)">Login with Phone</button>
					</div>
					<div id="changeLogin">
						<form id="users/login" class="loginUser" name="submitForm" onsubmit="return register(event)">
							<div class="row">
								<p id="error-message"></p>
									<div class="col-12 col-sm-12 col-md-12">
										<div class="form-group">
											<label id="error-message"></label>
											<label id="error-email">Email</label>
											<input type="email" name="email" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your mail here" required>
										</div>
									</div>
								<div class="col-12 col-sm-12 col-md-12">
									<div class="form-group">
										<label id="error-password">Password</label>
										<input type="password" name="password" oninput="return returnValidation(this.value, this.name)" class="form-control" placeholder="Enter your password here" required></div>
								</div>
								<div class="col-12 col-sm-12 col-md-12">
									<div class="form-group">
										<input type="submit" name="submit" class="form-control btn-lg btn-success" value="Login">
									</div>
								<div>
							</div>
						</form>
					</div>
					<p class="text-white">sign up if you dont have an account <a href="/users/signup">Signup</a></p>
				</div>
			</div>
		</div>
	 </div>`;
	 body.insertAdjacentHTML('afterbegin', html);
	}

});