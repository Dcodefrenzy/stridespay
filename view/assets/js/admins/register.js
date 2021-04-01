define(function(require, exports, module) {
		 

	exports.createAdmin =(token, id)=>{		
	const body = document.getElementById("body");
	const {sideBar} = require("./sidebar");
	const spinner = document.getElementById("spinner");

	spinner.className ="display-none";
	
		//sideBar(token, id);
		const html = `<div id="revert" class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

			<!-- Breadcrumbs -->
			<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
				<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					<h1>Registration</h1>
					<ol class="breadcrumb style-1">
						<li class="breadcrumb-item"><a href="/admins/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item" aria-current="page">Admin Register</li>
					</ol>
				</div>
			</div>

			<div class="row">

				<div class="col-xl-12">
					<div class="card">
						<div class="card-body">
							<h1>Admin Register</h1>
							<p class="text-dark">Add an admin</p>

							<form id="admins/register" class="registerAdmin" name="submitForm" onsubmit="return register(event)">
	
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
									<label id="error-currency">Role</label>
										<select class="form-control" name="level" oninput="return returnValidation(this.value, this.name)" required>
											<option value="1">Admin</option>
											<option value="2">Staff</option>
										</select>
								</div>
								<div class="form-group">
									<input type="submit" name="submit" class="form-control btn btn-primary btn-block" value="Signup">
								</div>
							</form>
						</div>
					</div>
				</div>

			</div>

		</div>`;
	 body.insertAdjacentHTML('beforeend', html);
	}



});