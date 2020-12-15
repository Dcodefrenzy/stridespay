define(function(require, exports, module) {

	return loginPhone = (event, login)=>{
		const changeLogin  = document.getElementById("changeLogin");

		const html = `<form id="users/login" class=${login} name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<p id="error-message"></p>
								<div class="col-12 col-sm-12 col-md-12">
									<div class="form-group">
										<label id="error-message"></label>
										<label id="error-phonenumber">Phone Number</label>
										<input type="number" name="phonenumber" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your number here" required>
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
					<p class="text-dark"><b>Please sign up if you dont have an account <a href="/users/signup">Signup</a></b></p>`;


	 changeLogin.innerHTML = html;

	}
});