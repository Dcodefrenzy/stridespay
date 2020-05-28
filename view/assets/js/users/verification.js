define(function (require, exports, module) {

	exports.loadVerification=(token, id)=>{
	const {request} = require("request");
	const {form} = require("./sendMail");
	const {loadPaymentHandller} = require("./getPayment");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";
	let payMent = {};

			const verify=(user,product, milestones)=>{

				const html = `<div class="fixed-top bg-green full-height">
							<div class="container mt-5">
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2">
										<div class="card shadow-lg p-3 mb-5 bg-white rounded">
											<div class="card-body row">
												<div class="col-12 col-sm-12 col-md-12 text-center">
													<i class="fa fa-user fa-5x" aria-hidden="true"></i>
												</div>
												<div class="col-12 col-sm-12 col-md-12 text-center mt-5">
												<p>Dear, ${user.name} your email has been verified Thank you.</p>
													<a href="/users/dashboard"><button class="btn-lg btn-green">Go to Dashbord</button></a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						 </div>`;

		 				body.insertAdjacentHTML('afterbegin', html);
			}

			const load=(response)=>{
				console.log(response.status)
				if (response.status === 401) {
					form("users/verify/user", "sendMailVerification", "Resend Mail");
				}else if (response.status === 200) {
					sessionStorage.setItem("user", JSON.stringify({token:response.token, _id:response._id}))
					verify(response);
				}
			}

			request("users/verification", {"token":id}, "POST", {"body":"no body"}, load);
	}
})