define(function(require, exports, module) {

exports.displayNotification = (token, id)=>{
	console.log(token)
	const {getRequest} = require("request");
	const {loginForm} = require("../logins");
	const {loading} = require("../loading");
	const {sideBar} = require("./sidebar");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";


			const displayNotificationHandller=(notifications)=>{
				
				sideBar(token, id);
				const html = `<div class="">
							<div class="container">
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-12  col-md-9 offset-md-3 col-lg-9 offset-lg-3">
										<div class="card shadow-lg p-3 mb-5 bg-background rounded">
											<div class="card-body row">
												<div class="col-12 col-sm-12 col-md-12">
												<a href="/users/dashboard">
													<i class="fa fa-arrow-left text-dark mt-2" aria-hidden="true"></i>
												</a>
												</div>
												<div class="col-12 col-sm-12 col-md-12 float-right mt-3">														
													<h3>
														<i class="fas fa-bell pr-3 text-green" aria-hidden="true"></i>
														Notifications
													</h3>
													${notifications.map((notification, index)=>{
														let color;
														if (notification.title === "Transactions") {color = "bg-green"}
														if (notification.title === "Payment") {color = "bg-success"}
														if (notification.title === "Logout") {color = "bg-info"}
														if (notification.title === "Service") {color = "bg-dark"}
														if (notification.title === "Account") {color = "bg-primary"}
														if (notification.title === "Product") {color = "bg-warning"}
														if (notification.title === "Milestones") {color = "bg-secondary"}
												return `<div class="card shadow-lg  bg-background rounded mt-0">
															<div class="card-body">
															<div class="${color} card-header">

																<h5 class="text-white p-3">${notification.title.toUpperCase()}</h5>
															</div>
																<p>${notification.description}</p>
																<p class="float-right"><i class="fa fa-clock text-green" aria-hidden="true"></i> ${moment(notification.date).fromNow()}</p>
															</div>
														</div>`
													})}
													
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						 </div>`;

		 				body.insertAdjacentHTML('beforeend', html);
			}

			const displayNotification = (response)=>{
				console.log(response)
				if (response.status === 401) {
					loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					displayNotificationHandller(response.message);
				}else if (response.status === 403) {
					alert(response.message);
					window.location = "/"
				}
			}

			getRequest("notifications/user", token, "GET", displayNotification);

	}







});