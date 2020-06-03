define(function(require, exports, module) {

	 exports.registerForm=(sessionItem, id)=>{
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";

	const html = `<div id="login" class=" bg-green"><div class="container">
					<div class="row align-items-center p-2">
		<div class="col-12 col-sm-12 col-md-12 col-lg-12">
				<a href="/"><i class="fa fa-arrow-left text-dark"></i></div></a>
				<div class="col-12 col-sm-12 col-md-6 col-lg-6 mt-lg-5">
					<img  src="/assets/images/bglogo1.png"></div>
				<div class="col-12 col-sm-12 col-md-6 col-lg-6">
					<h1>Login</h1>
					<form id="users/signup" class="signUpUser" name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<p id="error-message"></p>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-message"></label>
									<label id="error-email">Email</label>
									<input type="email" name="email" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your email here">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-firstname"></label>
									<label id="error-firstname">Firstname</label>
									<input type="text" name="firstname" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your firstname here">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-lastname"></label>
									<label id="error-firstname">Lastname</label>
									<input type="text" name="lastname" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your lastname here">
								</div>
							</div>
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
									<input type="submit" name="submit" class="form-control btn-lg btn-success" value="Signup">
								</div>
							<div>
						</div>
					</form>
					<p>Please sign up if you already an account <a href="/users/login">login</a></p>
				</div>
			</div>
		</div>
	 </div>`;



	 body.insertAdjacentHTML('afterbegin', html);

	}
});


