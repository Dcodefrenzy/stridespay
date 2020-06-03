define(function(require, exports, module) {

	let buyersForm;	 

	exports.buyersForm = `<div id="revert" class=" bg-green full-height">
				<div class="">
				<div id="loading"></div>
					<div class="row mt-2 p-3">
					<div class="col-12 col-sm-12 col-md-12 col-lg-12">
				<a href="/"><i class="fa fa-arrow-left text-dark"></i></div></a>
					</div>
				<div class="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3">
					<h1>Start Buying</h1>
					<form id="users/register" class="registerBuyer" name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-name">Name</label>
									<input type="text" name="name" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder=" eg John Doe">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-phonenumber">Phone Number</label>
									<input type="number" name="phonenumber" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="eg 08011111111">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-product">What do you want to buy</label>
									<input type="text" name="product" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="What do you want to buy?">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">							
								<div class="form-group">
									<label id="error-price">What is the price?</label>
									<input type="Number" name="price" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="How much?">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-password">Password</label>
									<input type="password" name="password" required oninput="return returnValidation(this.value, this.name)" class="form-control" placeholder="Enter your password here">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<input type="submit"   name="isBuyer" class="form-control btn-lg btn-dark" value="Generate token">
								</div>
							<div>
						</div>
					</form>
				</div>
			</div>
		</div>
	 </div>`;


});