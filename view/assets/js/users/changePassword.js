define(function(require, exports, module) {
		 
	exports.changePassword =(token, id)=>{		
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";	
	const {sideBar} = require("./sidebar");

				sideBar(token, id);
		const html = `<div id="revert" class="bg-background full-height">
				<div class="">
				<div id="loading"></div>
					<div class="row mt-2 p-3">
					<div class="col-12 col-sm-12 col-md-12 col-lg-12">
				<a href="/users/settings"><i class="fa fa-arrow-left text-dark offset-lg-3 offset-md-3 offset-sm-3"></i></div></a>
					</div>
				<div class="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3">
					<h1>Update Password</h1>
					<p class="text-dark">Change your password securely</p>
					<form id="users/change/password" class="changePassword" name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-message"></label>
									<label id="error-oldPassword">Old password</label>
									<input type="password" name="oldPassword" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Old password">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">							
								<div class="form-group">
									<label id="error-password">New password</label>
									<input type="password" name="password" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="New password">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<input type="submit"   class="form-control btn-lg btn-dark" value="Change Password">
								</div>
							<div>
						</div>
					</form>
				</div>
			</div>
		</div>
	 </div>`;
	 body.insertAdjacentHTML('beforeend', html);
	}



});