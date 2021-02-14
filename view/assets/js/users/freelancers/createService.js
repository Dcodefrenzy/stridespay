define(function(require, exports, module) {
		 
	return createService =(event, id, close)=>{		
	const body = document.getElementById("body");
	const spinner = document.getElementById(close);
	const {displayTextEditor} = require('../texteditor');
	spinner.className ="display-none";
	

		const html = `<div id="revert" class="bg-background container">
							<div class="container">
							<div id="loading"></div>
								<div class="row mt-2 p-3">
									<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
										<a href="/users/projects"><i class="fa fa-arrow-left text-dark"></i></div></a>
									</div>
									<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
										<h1>Service Token</h1>
										<p>Create a Service, share your payment token to your client and we handle the rest.</p>
										<form id="products/services/create" class="createService" name="submitForm" onsubmit="return register(event)">
											<div class="row">
												<div class="col-12 col-sm-12 col-md-12">
													<div class="form-group">
														<label id="error-service">Service</label>
														<input type="text" name="service" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="eg Create a logo?">
													</div>
												</div>
												<div class="col-12 col-sm-12 col-md-12">
													<div class="form-group" id='textarea-div'>
														<label id="error-description">Description</label>
													</div>
												</div>
												<div class="col-12 col-sm-12 col-md-12">
													<div class="form-group">
														<input type="submit" name=${id} class="form-control btn-lg btn-dark" value="Next">
													</div>
												<div>
											</div>
										</form>
									</div>
								</div>
							</div>`;
	 body.insertAdjacentHTML('beforeend', html);
	 displayTextEditor()
	}



});