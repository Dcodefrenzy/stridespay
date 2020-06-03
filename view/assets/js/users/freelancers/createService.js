define(function(require, exports, module) {
		 
	return createService =(event, id, close)=>{		
	const body = document.getElementById("body");
	const spinner = document.getElementById(close);
	spinner.className ="display-none";
	

		const html = `<div id="revert" class="fixed-top bg-green full-height">
				<div class="">
				<div id="loading"></div>
					<div class="row mt-2 p-3">
					<div class="col-12 col-sm-12 col-md-12 col-lg-12">
				<a href="/users/services"><i class="fa fa-arrow-left text-dark"></i></div></a>
					</div>
				<div class="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3">
					<h1>Service Token</h1>
					<p class="text-white">Create a Service</p>
					<p class="text-white">and speed up your transcations</p>
					<form id="products/services/create" class="createService" name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-service">Service</label>
									<input type="text" name="service" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="eg Create a logo?">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">							
								<div class="form-group">
									<label id="error-price">What is the price?</label>
									<input type="Number" name="price" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="The total amount for this service?">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<input type="submit" name=${id} class="form-control btn-lg btn-dark" value="Generate token">
								</div>
							<div>
						</div>
					</form>
				</div>
			</div>
		</div>
	 </div>`;
	 body.insertAdjacentHTML('afterbegin', html);
	}



});