define(function(require, exports, module) {
	let subscribersForm;

	exports.subscribersForm = `<div id="revert" class=" bg-green min-height">
				<div class="container">
					<div class="row mt-2 p-3">
					<div class="col-12 col-sm-12 col-md-12 col-lg-12">
				<a href="/"><i class="fa fa-arrow-left text-dark"></i></div></a>
					</div>
				<div class="col-12 col-sm-12 col-md-12 col-lg-12">
					<h1>Start Selling</h1>
					<form id="users/subscibe" class="registerSubscriber" name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-name">Name</label>
									<input type="text" name="name" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Eg John Doe">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-email">Email</label>
									<input type="email" name="email" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="How can we reach you?">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<input type="submit" name="isMerchant" class="form-control btn-lg btn-dark" value="Generate token">
								</div>
							<div>
						</div>
					</form>
				</div>
			</div>
		</div>
	 </div>`;
});