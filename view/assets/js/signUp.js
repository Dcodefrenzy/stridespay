define(function(require, exports, module) {

	 exports.registerForm=(sessionItem, id)=>{
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");

	const nav = document.getElementById("user-side-bar-open");
	const navIcon = document.getElementById("user-open-side-bar");
	nav.className = "display-none";
	navIcon.className = "display-none";
	spinner.className ="display-none";

	const html = `<main class="body-content clearfix">

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
					<h1>Join our waiting list</h1>
					<p>Get one month free access</p>
					</div>
					<div class="dsh-auth-form-inner">
						<form id=${`users/subscribe/${id}`} class="signUpUser" name="submitForm" onsubmit="return register(event)">
								<div class="form-group">
									<label id="error-message"></label>
									<label id="error-email">Email</label>
									<input type="email" name="email" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your email here" required>
								</div>
								<div class="form-group">
									<label id="error-firstname"></label>
									<label id="error-firstname">Firstname</label>
									<input type="text" name="firstname" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your firstname here" required>
								</div>
								<div class="form-group">
									<label id="error-lastname"></label>
									<label id="error-lastname">Lastname</label>
									<input type="text" name="lastname" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your lastname here" required>
								</div>
								<div class="form-group">
									<label id="error-phonenumber"></label>
									<label id="error-phonenumber">Phone Number</label>
									<input type="text" name="phonenumber" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your number here" required>
								</div>
								<div class="form-group">
									<label id="error-password">Password</label>
									<input type="password" name="password" oninput="return returnValidation(this.value, this.name)" class="form-control" placeholder="Enter your password here" required>
								</div>
								<div class="form-group">
									<input type="submit" name="submit" class="form-control btn btn-primary btn-block" value="Signup">
								</div>
								<p class="text-center"> Have an account? <a href="/users/login">Login</a> </p>
						</form>
					</div>
					<!--
					<div class="dsh-auth-footer">
						<p> © All Rights Reserved 2020 - AndromedaThemes </p>
						<ul class="list-inline text-center">
							<li class="list-inline-item"> <a href="#">Legal</a> </li>
							<li class="list-inline-item"> <a href="#">Privacy Policy</a> </li>
							<li class="list-inline-item"> <a href="#">Return Policy</a> </li>
						</ul>
					</div>
					-->
				</div>
			</div>
			<!-- /Login Form -->
		</div>

	</main>`;



	 body.insertAdjacentHTML('afterbegin', html);

	}
});


