define(function(require, exports, module) {
	let subscribersForm;

	exports.subscribersForm = `<div id="revert" class=" bg-green min-height">
				<div class="container">
					<div class="row mt-2 p-3">
					<div class="col-12 col-sm-12 col-md-12 col-lg-12">
				<a href="/"><i class="fa fa-arrow-left text-dark"></i></div></a>
					</div>
				<div class="col-12 col-sm-12 col-md-12 col-lg-12">
					<h3>Register and get free cupons when we launch</h3>
					<form id="users/signup" class="signUpUser" name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<p id="error-message"></p>
							<div class="col-12 col-sm-12 col-md-6">
								<div class="form-group text-white">
									<label id="error-message"></label>
									<label id="error-email">Email</label>
									<input type="email" name="email" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your email here" required>
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-6">
								<div class="form-group text-white">
									<label id="error-firstname"></label>
									<label id="error-firstname">Firstname</label>
									<input type="text" name="firstname" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your firstname here" required>
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-6">
								<div class="form-group text-white">
									<label id="error-lastname"></label>
									<label id="error-firstname">Lastname</label>
									<input type="text" name="lastname" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your lastname here" required>
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-6">
								<div class="form-group text-white">
									<label id="error-message"></label>
									<label id="error-phonenumber">Phone Number</label>
									<input type="text" name="phonenumber" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your number here" required>
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-6">
								<div class="form-group text-white">
									<label id="error-password">Password</label>
									<input type="password" name="password" oninput="return returnValidation(this.value, this.name)" class="form-control" placeholder="Enter your password here" required></div>
							</div>
							<div class="col-12 col-sm-12 col-md-6">
								<div class="form-group">
									<input type="submit" name="submit" class="form-control btn-lg btn-success" value="Signup">
								</div>
							<div>
						</div>
					</form>
				</div>
			</div>
		</div>
	 </div>`;
});