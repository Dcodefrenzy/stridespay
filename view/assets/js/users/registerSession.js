define(function(require, exports, module) {
	let {loading} = require("../loading")

	 return registerSessionForm = (event, id)=>{
	 	event.preventDefault();
	const body = document.getElementById("body");
	loading(id, "display-none")

	 const	html = `<div id="createNewUser" class="fixed-top bg-green full-height"><div class="container">
					<div class="row align-items-center mt-0 p-2">
		<div class="col-12 col-sm-12 col-md-12 col-lg-12">
				<a href="/"><i class="fa fa-arrow-left text-dark"></i></div></a>
				<div class="col-12 col-sm-12 col-md-6 col-lg-6 mt-lg-5">
					<img  src="/assets/images/bglogo1.png"></div>
				<div class="col-12 col-sm-12 col-md-6 col-lg-6">
					<h1>Register</h1>
					<form id="users/create/user" class="createNewUser" name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<p id="error-message"></p>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-name">Name</label>
									<input type="text" name="name" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your name here">
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
									<input type="submit" name="submit" class="form-control btn-lg btn-success" value="Login">
								</div>
							<div>
						</div>
					</form>
					<p>Please sign up if you have have an account <a href="/users/signup">Login</a></p>
				</div>
			</div>
		</div>
	 </div>`;
	body.insertAdjacentHTML('afterbegin', html);

	 }



	});