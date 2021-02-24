define(function(require, exports, module) {
	exports.forgetPassword=(event, id)=>{	

	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	const nav = document.getElementById("user-side-bar-open");
	const navIcon = document.getElementById("user-open-side-bar");
	nav.className = "display-none";
	navIcon.className = "display-none";
	spinner.className ="display-none";

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
					<h1>Forget Password</h1>
					</div>
					<div class="dsh-auth-form-inner">
						<form id="users/forget/password" class="forgetPassword" name="submitForm" onsubmit="return register(event)">
								<p id="error-message"></p>
								<div class="form-group">
									<label id="error-message"></label>
									<label id="error-email">Email</label>
									<input type="email" name="email" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your mail here" required>
								</div>									
								<div class="form-group">
									<input type="submit" name="submit" class="form-control btn btn-primary btn-block" value="Send Mail">
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