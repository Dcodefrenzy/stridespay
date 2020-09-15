define(function(require, exports, module) {

	 exports.registerForm=(sessionItem, id)=>{
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");

	const nav = document.getElementById("user-side-bar-open");
	const navIcon = document.getElementById("user-open-side-bar");
	nav.className = "display-none";
	navIcon.className = "display-none";
	spinner.className ="display-none";

	const html = `<div id="login" class=" bg-navy min-height">
			<div class="container">
					<div class="row align-items-center p-2">
		<div class="col-12 col-sm-12 col-md-12 col-lg-12">
				<a href="/"><i class="fa fa-arrow-left text-dark"></i></div></a>
				<div class="col-12 col-sm-12 col-md-6 col-lg-6 mt-lg-5">
					<img  src="/assets/images/strides.png"></div>
				<div class="col-12 col-sm-12 col-md-6 col-lg-6">
					<h1>Join our waiting list</h1>
					<p>Get one month free access</p>
					<form id=${`users/subscribe/${id}`} class="signUpUser" name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<p id="error-message"></p>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-message"></label>
									<label id="error-email">Email</label>
									<input type="email" name="email" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your email here" required>
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-firstname"></label>
									<label id="error-firstname">Firstname</label>
									<input type="text" name="firstname" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your firstname here" required>
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-lastname"></label>
									<label id="error-firstname">Lastname</label>
									<input type="text" name="lastname" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your lastname here" required>
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-message"></label>
									<label id="error-phonenumber">Phone Number</label>
									<input type="text" name="phonenumber" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your number here" required>
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-password">Password</label>
									<input type="password" name="password" oninput="return returnValidation(this.value, this.name)" class="form-control" placeholder="Enter your password here" required></div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<input type="submit" name="submit" class="form-control btn-lg btn-strides" value="Signup">
								</div>
							<div>
					<p>learn about us here <a href="/" class="btn-sm btn-strides">Here</a></p>
						</div>
					</form>
				</div>
			</div>
		</div>
	 </div>`;



	 body.insertAdjacentHTML('afterbegin', html);

	}
});


