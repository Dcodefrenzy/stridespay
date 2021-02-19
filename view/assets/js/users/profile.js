define(function(require, exports, module) {

	 exports.profile=(token, id)=>{
	const {loginForm} = require("../logins");
	const {loading} = require("../loading");
	const {getRequest} = require("../request");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	const {sideBar} = require("./sidebar");

	spinner.className ="display-none";
	const showProfile = (user, option, transactions)=>{
				sideBar(token, id);
	const html = `<div id="revert" class="bg-background full-height">
						<div class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

			<!-- Breadcrumbs -->
			<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
				<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					<h1>User Profile</h1>
					<ol class="breadcrumb style-1">
						<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item" aria-current="page">User Profile</li>
					</ol>
				</div>

				<div class="breadcrumb-controls mt-sm-0 mt-3">
						<div class="btn-group dropdown">
					  	<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					    	Track Projects
					  	</button>
					  	<div class="dropdown-menu">
					    	<a class="dropdown-item media align-items-center" href="/users/transactions/client">
					      	<i class="lni-bar-chart"></i>
					      	<div class="media-body">
					        	<h6>As a client</h6>
					        	<p class="text-muted fs-12">Track your paid project</p>
					      	</div>
					    	</a>
					    	<a class="dropdown-item media align-items-center" href="/users/transactions/freelancer">
					      	<i class="lni-pie-chart"></i>
					      	<div class="media-body">
					        	<h6>As a Freelancer</h6>
					        	<p class="text-muted fs-12">Projects you are working on</p>
					      	</div>
					    	</a>
					  	</div>
						</div>
					<a href="/users/projects"> <button type="button" class="btn btn-secondary">Create Project</button></a>
				</div>

			</div>

			<div class="dsh-profile-wrapper">

				<div class="row">
					<!-- User Profile Sidebar -->
					<div class="col-xl-3">
						<div class="card card-body text-center">
							<!-- Profile img -->
							<div class="dsh-btn-file-upload-wrapper d-block">
								<div class="dsh-avatar dsh-avatar-lg dsh-avatar-elevated mx-auto mb-3 dsh-user-img-upload">
									<div class="dsh-btn-file-upload-input">
										<input type='file' class="dsh-upload-input" />
										<a href="/users/upload/image"><button type="button" class="btn btn-round btn-sm btn-icon btn-success dsh-btn-file-upload"> <i class="lni-pencil m-0"></i> </button></a>
									</div>
									<img src="/assets/images/${user.image}" class="rounded-circle dsh-img-preview h-100" alt="user">
								</div>
							</div>
							<!-- /Profile img -->

							<h5 class="mb-0">${user.firstname} ${user.lastname}</h5>
							<span>@${user.name}</span>
							<ul class="list-inline mt-3 mb-0 text-center">
								<li class="list-inline-item"> <a class="text-dark social-icon dsh-tooltip" title="Instagram" data-placement="top" href="#"><i class="lni-instagram-filled"></i></a> </li>
								<li class="list-inline-item"> <a class="text-dark social-icon dsh-tooltip" title="Facebook" data-placement="top" href="#"><i class="lni-facebook-filled"></i></a> </li>
								<li class="list-inline-item"> <a class="text-dark social-icon dsh-tooltip" title="Twitter" data-placement="top" href="#"><i class="lni-twitter-filled"></i></a> </li>
								<li class="list-inline-item"> <a class="text-dark social-icon dsh-tooltip" title="Linkedin" data-placement="top" href="#"><i class="lni-linkedin-original m-0"></i></a> </li>
							</ul>
						</div>
						<div class="card card-body p-0">
							<ul class="list-group list-group-flush">
								<li class="list-group-item media">
									<h6>Full Name</h6>
									<span>${user.firstname} ${user.lastname}</span>
								</li>
								<li class="list-group-item media">
									<h6>Email</h6>
									<span>${user.email}</span>
								</li>
								<li class="list-group-item media">
									<h6>Gender</h6>
									<span>${user.gender}</span>
								</li>
								<li class="list-group-item media">
									<h6>Location</h6>
									<span>${user.location}</span>
								</li>
							</ul>
						</div>
					</div>
					<!-- /User Profile Sidebar -->

					<!-- User Profile Content -->
					<div class="col-xl-6">
						<div class="card">
							<div class="card-header p-0">
								<ul class="nav nav-bordered mb-0" id="profilePages-tab" role="tablist">
									<li class="nav-item">
										<a class="nav-link active" id="profile-overview-tab" data-toggle="pill" href="#profile-overview" role="tab" aria-controls="profile-overview" aria-selected="true"> Profile Overview</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" id="profile-manage-tab" data-toggle="pill" href="#profile-manage" role="tab" aria-controls="profile-manage" aria-selected="false">Manage Profile</a>
									</li>
									<!--
									<li class="nav-item">
										<a class="nav-link" id="profile-preferences-tab" data-toggle="pill" href="#profile-preferences" role="tab" aria-controls="profile-preferences" aria-selected="false">Manage Preferences</a>
									</li>
									-->
								</ul>
							</div>
							<div class="card-body">
								<div class="tab-content" id="profilePages-tabContent">

									<!-- Profile Overview -->
									<div class="tab-pane fade active show" id="profile-overview" role="tabpanel" aria-labelledby="profile-overview-tab">

										<div class="dsh-section-title">
											<h5 class="card-title">About Me</h5>
											<p>
												${user.about}
											</p>
										</div>

										<hr class="dsh-seperator">

										<!-- Timeline -->
										<ul class="dsh-timeline">
										5 Latest Projets
										${
											transactions.slice(0, 4).map((transaction)=>{
												let complete = transaction.transactionComplete === false?"text-warning":transaction.transactionComplete === true?"text-success":"text-dark"
											return `<li>
												<div class="dsh-timeline-dot bg-primary"></div>
												<h6>${transaction.productName}</h6>
												<span> <i class="lni-timer"></i>${moment(transaction.dateCreated).format("L")}</span>
												<p>${transaction.description}</p>
												<p class="${complete}"><b class="text-dark">Completed:</b> ${transaction.transactionComplete}</p>
											</li>`

											})

										}
										</ul>
										<!-- /Timeline -->

									</div>
									<!-- /Profile Overview -->

									<!-- Profile Management -->
									<div class="tab-pane fade dsh-profile-manage" id="profile-manage" role="tabpanel" aria-labelledby="profile-manage-tab">
										<form id="users/update/user" class="updateProfile" name="submitForm" onsubmit="return register(event)">
											<div class="form-row">
												<div class="form-group col-xl-6">
													<label id="error-product">Firstname</label>
													<input type="text" name="firstname" value="${user.firstname}" class="form-control" placeholder="firstname">
												</div>							
												<div class="form-group col-xl-6">
													<label id="error-price">Lastname</label>
													<input type="text" name="lastname" value="${user.lastname}"  class="form-control" placeholder="lastname">
												</div>
												<div class="form-group col-xl-6">
													<label id="error-price">Username</label>
													<input type="text" name="username"  value="${user.name}" class="form-control" placeholder="username">
												</div>
												<div class="form-group col-xl-6">
													<label id="error-price">Age</label>
													<input type="Number" name="age"  value="${user.age}" class="form-control" placeholder="Age">
												</div>
												<div class="form-group col-xl-6">
													<label>Country <span class="text-danger">*</span></label>
													<select class="form-control dsh-select2" data-placeholder="Select a Country" name="gender"  required>
														${option}
														<option value="female">Female</option>
														<option value="male">Male</option>
													</select>
												</div>						
												<div class="form-group col-xl-6">
													<label id="error-price">Location</label>
													<input type="text" name="location" value="${user.location}" class="form-control" placeholder="What's your location">
												</div>
												<div class="form-group col-xl-6">
													<label id="error-instagram">Instagram</label>
													<input type="text" name="instagram"  value="${user.instagram}" class="form-control" placeholder="instagram handle">
												</div>
												<div class="form-group col-xl-6">
													<label id="error-twitter">Twitter</label>
													<input type="text" name="twitter"  value="${user.twitter}" class="form-control" placeholder="twitter handle">
												</div>
												<div class="form-group col-xl-6">
													<label id="error-price">Facebook</label>
													<input type="text" name="facebook"  value="${user.facebook}" class="form-control" placeholder="facebook">
												</div>
												<div class="form-group col-xl-6">
													<label id="error-linkedin">Linkedin</label>
													<input type="text" name="linkedin"  value="${user.linkedin}" class="form-control" placeholder="linkedin handle">
												</div>				
												<div class="form-group col-xl-6">
													<label id="error-price">About you</label>
										            <textarea class="form-control" name="about"  id="editor1" placrholder="Describe yourself.">${user.about}</textarea>
													<script src="/ckeditor4/ckeditor.js"></script>
										            <script>
										                CKEDITOR.replace( 'editor1' );
										            </script>
												</div>
												<div class="form-group col-xl-6">
													<label id="error-skils">Skils</label>
													<textarea class="form-control" name="skills"  id="editor1" placeholder="Use , to seperate each skill">${user.skills}</textarea>
												</div>
												<div class="col-xl-12 text-right">
													<input type="submit" class="form-control btn-lg btn-dark" value="Update">
												</div>
											
											</div>

											<hr class="dsh-seperator">
										</form>
									</div>
									<!-- /Profile Management -->

									<!-- Profile Preferences -->
									<div class="tab-pane fade" id="profile-preferences" role="tabpanel" aria-labelledby="profile-preferences-tab">


										<form method="post">

											<div class="dsh-section-title">
												<h5 class="card-title">Email Notifications</h5>
												<h6 class="card-subtitle">Control how frequently you recieve emails</h6>
											</div>

											<div class="form-group">
												<div class="custom-control custom-checkbox">
													<input type="checkbox" class="custom-control-input" id="emailNots-1">
													<label class="custom-control-label" for="emailNots-1">Send me email notifications</label>
												</div>
												<p>Enabling this feature will allow us to send you email notifications regarding changes happening in your account</p>
											</div>
											<div class="form-group">
												<div class="custom-control custom-checkbox">
													<input type="checkbox" class="custom-control-input" id="emailNots-2">
													<label class="custom-control-label" for="emailNots-2">Subscribe to our newsletter</label>
												</div>
												<p>Enabling this feature will allow us to send you email notifications about latest updates (Twice per month)</p>
											</div>

											<hr class="dsh-seperator">
											<div class="dsh-section-title">
												<h5 class="card-title">Push Notifications</h5>
												<h6 class="card-subtitle">Control how frequently you recieve push notifications</h6>
											</div>

											<div class="form-group">
												<div class="custom-control custom-checkbox">
													<input type="checkbox" class="custom-control-input" id="emailNots-3">
													<label class="custom-control-label" for="emailNots-3">Send me push notifications</label>
												</div>
												<p>Enabling this feature will allow us to send you push notifications directly to your phone</p>
											</div>
											<div class="form-group">
												<div class="custom-control custom-checkbox">
													<input type="checkbox" class="custom-control-input" id="emailNots-4">
													<label class="custom-control-label" for="emailNots-4">Push Notifications: Account Info</label>
												</div>
												<p>Enabling this feature will allow us to send you push notifications whenever an account change occurs</p>
											</div>
											<div class="form-group">
												<div class="custom-control custom-checkbox">
													<input type="checkbox" class="custom-control-input" id="emailNots-5">
													<label class="custom-control-label" for="emailNots-5">Push Notifications: App News</label>
												</div>
												<p>Enabling this feature will allow us to send you push notifications whenever a new update is released</p>
											</div>

										</form>

										<hr class="dsh-seperator">

										<div class="dsh-section-title">
											<h5 class="card-title">Logged in Devices</h5>
											<h6 class="card-subtitle">Manage access control across all your devices</h6>
										</div>

										<div class="table-responsive">
											<table class="table">
												<thead>
													<tr>
														<th>Device Name</th>
														<th>IP</th>
														<th>Location</th>
														<th>Actions</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th>
															<div class="media px-0">
																<img src="../../assets/img/icons/smartphone.png" alt="mobile">
																<div class="media-body">
																	<p class="h6">Trending mobile</p>
																	<p class="small mb-0 text-muted">January 24, 2020</p>
																</div>
															</div>
														</th>
														<td>10.0.0.1</td>
														<td>Germany, Frankfurt</td>
														<td> <a href="#" class="text-danger"> <i class="lni-power-switch"></i> Logout</a> </td>
													</tr>
													<tr>
														<th>
															<div class="media px-0">
																<img src="../../assets/img/icons/monitor.png" alt="mobile">
																<div class="media-body">
																	<p class="h6">Windows 10 Ultimate</p>
																	<p class="small mb-0 text-muted">January 24, 2020</p>
																</div>
															</div>
														</th>
														<td>10.0.0.1</td>
														<td>Germany, Frankfurt</td>
														<td> <a href="#" class="text-danger"> <i class="lni-power-switch"></i> Logout</a> </td>
													</tr>
													<tr>
														<th>
															<div class="media px-0">
																<img src="../../assets/img/icons/tablet.png" alt="mobile">
																<div class="media-body">
																	<p class="h6">iPad Pro</p>
																	<p class="small mb-0 text-muted">January 24, 2020</p>
																</div>
															</div>
														</th>
														<td>10.0.0.1</td>
														<td>Germany, Frankfurt</td>
														<td> <a href="#" class="text-danger"> <i class="lni-power-switch"></i> Logout</a> </td>
													</tr>
												</tbody>
											</table>
										</div>

										<form class="text-right">
											<button type="submit" class="btn btn-danger-light">Log me out from all devices</button>
										</form>

									</div>
									<!-- /Profile Preferences -->

								</div>

							</div>
						</div>
					</div>
					<!-- /User Profile Content -->

					<!-- Skills -->
					<div class="col-xl-3">
						<div class="card card-body">
							<div class="dsh-section-title">
								<h5 class="card-title">Skills</h5>
								<h6 class="card-subtitle">Explore my many talents</h6>
							</div>
							<div>
								${ user.skills.split(",").map((skill)=>{
								return `<span class="btn btn-outline-light mb-1">${skill}</span>`;
								})}
							</div>
							<!--
							<hr class="dsh-seperator">
							<div class="w-100">
								<span class="fs-12 mb-1">PHP</span>
								<div class="progress w-100">
									<div class="progress-bar progress-bar-striped progress-bar-animated active" role="progressbar" style="width: 87%" aria-valuenow="87" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<span class="fs-12 mb-1">JavaScript</span>
								<div class="progress">
									<div class="progress-bar progress-bar-striped progress-bar-animated active bg-success" role="progressbar" style="width: 76%" aria-valuenow="76" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<span class="fs-12 mb-1">Css</span>
								<div class="progress">
									<div class="progress-bar progress-bar-striped progress-bar-animated active bg-info" role="progressbar" style="width: 89%" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
							</div>
							-->
						</div>
					</div>
					<!-- /Skills -->

				</div>

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
							
					showProfile(response.user, option, response.transactions);
				}
			}


			getRequest("users/profile", token, "GET", loadProfile);

	}
});


