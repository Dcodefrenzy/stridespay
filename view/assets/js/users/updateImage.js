define(function(require, exports, module) {
	

	exports.uploadImage=(token)=>{
	const {loading} = require("../loading");
	const {getRequest} = require("../request");
	const {loginForm} = require("../logins");		
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");	
	spinner.className ="display-none";
	const {sideBar} = require("./sidebar");

 	sideBar(token, token._id);

	const html = `<div id="revert" class=" bg-background full-height">
				<div class="container">
				<div id="loading"></div>
					<div class="row mt-1 p-3">
					<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
				<a href="/users/dashboard"><i class="fa fa-arrow-left text-dark"></i></div></a>
					</div>
				<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
					<h1>Upload Profile Image</h1>
					<p class="text-dark">upload a profile image.</p>
					<form id="users/profile/image" enctype="multipart/form-data" class="uploadImage"  name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-image">Image</label>
									<input type="file" name="image" required" id="profile-image" class="form-control" placeholder="Product?">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<input type="submit"    class="form-control btn-lg btn-dark" value="Upload image">
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
})