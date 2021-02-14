define(function(require, exports, module) {

exports.registrationSuccess = (token, id)=>{
	const {copyText} = require("../copyText");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";
	const nav = document.getElementById("user-side-bar-open");
	const navIcon = document.getElementById("user-open-side-bar");
	nav.className = "display-none";
	navIcon.className = "display-none";

				const html = `<div class="">
							<div class="container">
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2">
										<div class="card shadow-lg p-3 mb-5 bg-white rounded">
											<div class="card-body row">
											<div class="col-12 col-sm-12 col-md-12">
												<h3>Yay! your registration was successful. <i class="fa fa-star text-strides" aria-hidden="true"></i></h3>
												<p class="mt-5">Tell your friends about us and enjoy more discount?</p>
												<p class="mt-3">For every friend you bring, you get, one month free discount. I.e 12 friends = One full year subcription.</p>

												<input class="form-control" id=${id} type="text" value=${window.location.hostname+"/users/register/"+id} readonly="readonly"/>
												<button onclick="return copyText(this.value)" value=${id} class="mt-2 col-12 col-sm-5 offset-sm-3 col-md-5 offset-md-3 btn-sm btn-green ">Copy</button>
												<p>We will get back to you when we launch. But before then, learn more about us <a href="/" class="btn-sm btn-strides">Here</a> </p>
												
											</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						 </div>`;

		 				body.insertAdjacentHTML('afterbegin', html);
			
	}







});