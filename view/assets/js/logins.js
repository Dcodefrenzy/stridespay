define(function(require, exports, module) {
	let loginForm;
	let {registerSessionForm} = require("users/registerSession");
	let {loading}  = require("loading");
	const loginEmail = require("users/logins/loginEmail");
	const loginPhone = require("users/logins/loginPhone");
	//loading("user-side-bar-open", "display-none")

	exports.loginForm = `<div id="login" class="fixed  bg-navy full-height"><div class="container">
					<div class="row align-items-center mt-2 p-5">
		<div class="col-12 col-sm-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3">
				<div class="col-12 col-sm-12 col-md-12 col-lg-12">
					<h1>Login</h1>
					<div class="row text-center">
						<button class="btn-sm btn-success m-2" onclick="return loginEmail(event)">Login with Email</button>
						<button class="btn-sm btn-dark m-2" onclick="return loginPhone(event)">Login with Phone</button>
					</div>
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
					<p>Please sign up if you dont have an account <button class="btn-sm btn-green" onclick="return registerSessionForm(event, this.name)" name="login">Signup</button></p>
				</div>
			</div>
		</div>
	 </div>`;
});