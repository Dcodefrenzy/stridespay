define(function(require, exports, module) {
		 
	return createService =(event, id, close)=>{		
	const body = document.getElementById("body");
	const spinner = document.getElementById(close);
	const {displayTextEditor} = require('../texteditor');
	spinner.className ="display-none";
	

		const html = `<div id="revert" class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

			<!-- Breadcrumbs -->
			<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
				<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					<h1>Service</h1>
					<ol class="breadcrumb style-1">
						<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item"><a href="/users/projects">projects</a></li>
						<li class="breadcrumb-item" aria-current="page">Service</li>
					</ol>
				</div>
			</div>

			<div class="row">

				<div class="col-xl-12">
					<div class="card">
						<div class="card-body">
							<h1>Create A Service</h1>
							<p>Create a Service, share your payment token to your client and we handle the rest.</p>

							<form id="products/services/create" class="createService" name="submitForm" onsubmit="return register(event)">
								<div class="row">
									<div class="col-12 col-sm-12 col-md-12">
										<div class="form-group">
											<label id="error-service" class="card-title">Service</label>
											<input type="text" name="service" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="eg Create a logo?">
										</div>
									</div>
									<div class="col-12 col-sm-12 col-md-12">
										<div class="form-group">
											<label id="error-bankname" class="card-title">Currency</label>
													<select class="form-control" name="currency" oninput="return returnValidation(this.value, this.name)" required>
															<option value="">Select Currency</option>
															<option value="NGN">NGN</option>
															<option value="USD">USD</option>
													</select>
											</div>
									</div>
									<div class="col-12 col-sm-12 col-md-12">
										<div class="form-group" id='textarea-div'>
											<label id="error-description" class="card-title">Description</label>
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
				</div>

			</div>

		</div>`;
	 body.insertAdjacentHTML('beforeend', html);
	 displayTextEditor()
	}



});