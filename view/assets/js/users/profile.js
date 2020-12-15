define(function(require, exports, module) {

	 exports.profile=(token, id)=>{
	const {loginForm} = require("../logins");
	const {loading} = require("../loading");
	const {getRequest} = require("../request");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	const {sideBar} = require("./sidebar");

	spinner.className ="display-none";
	const showProfile = (user, option)=>{
				sideBar(token, id);
	const html = `<div id="revert" class="bg-background full-height">
				<div class="">
				<div id="loading"></div>
					<div class="mt-2 p-3">
					<div class="col-12 col-sm-12 col-md-12 col-lg-12">
				<a href="/users/dashboard"><i class="fa fa-arrow-left text-dark offset-lg-3 offset-md-4"></i></a>
					</div>
				<div class="col-12 col-sm-12 col-md-8 offset-md-4 col-lg-9 offset-lg-3">
					<h1>Profile</h1>
					<p class="text-dark">Update your profile</p>
					<form id="users/update/user" class="updateProfile" name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<div class="col-12 col-sm-6 col-md-6">
								<div class="form-group">
									<label id="error-product">Firstname</label>
									<input type="text" name="firstname" value="${user.firstname}" class="form-control" placeholder="firstname">
								</div>
							</div>
							<div class="col-12 col-sm-6 col-md-6">							
								<div class="form-group">
									<label id="error-price">Lastname</label>
									<input type="text" name="lastname" value="${user.lastname}"  class="form-control" placeholder="lastname">
								</div>
							</div>
							<div class="col-12 col-sm-6 col-md-6">							
								<div class="form-group">
									<label id="error-price">Username</label>
									<input type="text" name="username"  value="${user.name}" class="form-control" placeholder="username">
								</div>
							</div>
							<div class="col-12 col-sm-6 col-md-6">							
								<div class="form-group">
									<label id="error-price">Age</label>
									<input type="Number" name="age"  value="${user.age}" class="form-control" placeholder="Age">
								</div>
							</div>
							<div class="col-12 col-sm-6 col-md-6">
								<div class="form-group">
									<label id="error-bankname">Gender</label>
										<select class="form-control" name="gender" >
											${option}
											<option value="female">Female</option>
											<option value="male">Male</option>
										</select>
								</div>
							</div>
							<div class="col-12 col-sm-6 col-md-6">							
								<div class="form-group">
									<label id="error-price">Location</label>
									<input type="text" name="location" value="${user.location}" class="form-control" placeholder="What's your location">
								</div>
							</div>
							<div class="col-12 col-sm-6 col-md-6">							
								<div class="form-group">
									<label id="error-price">Phone number</label>
									<input type="Number" name="phonenumber" value="${"0"+user.phonenumber}" class="form-control" placeholder="What's your phonenumber">
								</div>
							</div>
							<div class="col-12 col-sm-6 col-md-6">							
								<div class="form-group">
									<label id="error-price">About you</label>
						            <textarea class="form-control" name="about"  id="editor1" placrholder="Describe yourself.">${user.about}</textarea>
									<script src="/ckeditor4/ckeditor.js"></script>
						            <script>
						                CKEDITOR.replace( 'editor1' );
						            </script>
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<input type="submit" class="form-control btn-lg btn-dark" value="Update">
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



		const loadProfile=(response)=>{
			console.log(response);
				if (response.status === 401) {
					loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
								let option = response.user.gender === undefined?`<option value="">Select Gender</option>`:`<option value=${response.user.gender}>${response.user.gender}</option>`;
							
					showProfile(response.user, option);
				}
			}


			getRequest("users/profile", token, "GET", loadProfile);

	}
});


