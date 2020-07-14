define(function(require, exports, module) {
	return loginEmail = (event)=>{
		event.preventDefault();
		const changeLogin  = document.getElementById("changeLogin");

		const html = `<form id="users/login" class="loginUser" name="submitForm" onsubmit="return register(event)">
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
					<p class="text-white">Please sign up if you dont have an account <a href="/users/signup">Signup</a></p>`;


	 changeLogin.innerHTML = html;

	}
});