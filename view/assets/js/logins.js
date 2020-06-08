define(function(require, exports, module) {
	let loginForm;
	let {registerSessionForm} = require("users/registerSession")

	exports.loginForm = `<div id="login" class="fixed-top bg-green full-height"><div class="container">
					<div class="row align-items-center mt-2 p-5">
		<div class="col-12 col-sm-12 col-md-12 col-lg-12">
				<a href="/"><i class="fa fa-arrow-left text-dark"></i></div></a>
				<div class="col-12 col-sm-12 col-md-12 col-lg-12">
					<h1>Login</h1>
					<form id="users/login" class="loginUser" name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<p id="error-message"></p>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-message"></label>
									<label id="error-phonenumber">Phone Number</label>
									<input type="text" name="phonenumber" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your number here">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-password">Password</label>
									<input type="password" name="password" oninput="return returnValidation(this.value, this.name)" class="form-control" placeholder="Enter your password here"></div>
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