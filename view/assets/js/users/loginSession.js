define(function(require, exports, module) {
	exports.loginSession=(event, id)=>{	

	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	const nav = document.getElementById("user-side-bar-open");
	const navIcon = document.getElementById("user-open-side-bar");
	nav.className = "display-none";
	navIcon.className = "display-none";
	spinner.className ="display-none";
	const loginEmail = require("../users/logins/loginEmail");
	const loginPhone = require("../users/logins/loginPhone");

		let html = `<main class="body-content clearfix" id="login">

		<div class="row no-gutters min-100vh">

			<!-- /Login Background slider -->
			<div class="col-lg-8 d-none d-lg-block bg-navy">
				<div class="dsh-auth-bg-item  slick-active">
					<img  src="/assets/images/strides.png">
				</div>
			</div>
			<!-- /Login Background slider -->

			<!-- Login Form -->
			<div class="col-lg-4 bg-white">
				<div class="dsh-auth-form d-flex flex-column align-items-center justify-content-between py-5">
					<div class="text-center mb-3">
						<img src="/assets/images/fav1.png" class="mb-3" alt="Dashield">
					<h1>Login</h1>
					<div class="row text-center">
						<button class="btn-sm btn-success m-2" onclick="return loginEmail(event, 'userLogin')">Login with Email</button>
						<button class="btn-sm btn-dark m-2" onclick="return loginPhone(event, 'userLogin')">Login with Phone</button>
					</div>
					</div>
					<div class="dsh-auth-form-inner" id="changeLogin">
						<form id="users/login" class="userLogin" name="submitForm" onsubmit="return register(event)">
								<p id="error-message"></p>
								<div class="form-group">
									<label id="error-message"></label>
									<label id="error-email">Email</label>
									<input type="email" name="email" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your mail here" required>
								</div>									
								<div class="form-group">
									<label id="error-password">Password</label>
									<input type="password" name="password" oninput="return returnValidation(this.value, this.name)" class="form-control mb-3" placeholder="Enter your password here" required>
									<input type="submit" name="submit" class="form-control btn btn-primary btn-block" value="Login">
									<p class="text-dark">sign up if you dont have an account <a href="/users/signup">Signup</a></p>
									</div>
								</div>
								<div class="form-group">
								</div>
						</form>
					</div>

				</div>
			</div>
			<!-- /Login Form -->
		</div>

	</main>`;
	 body.insertAdjacentHTML('afterbegin', html);
	}

});