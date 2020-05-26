define(function(require, exports, module) {
		 

	return createProduct =(event, id, close)=>{		
	const body = document.getElementById("body");
	const spinner = document.getElementById(close);
	spinner.className ="display-none";
	

		const html = `<div id="revert" class="fixed-top bg-green full-height">
				<div class="">
				<div id="loading"></div>
					<div class="row mt-2 p-3">
					<div class="col-12 col-sm-12 col-md-12 col-lg-12">
				<a href="/"><i class="fa fa-arrow-left text-dark"></i></div></a>
					</div>
				<div class="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3">
					<h1>Product Token</h1>
					<p class="text-white">create a product prepaid token</p>
					<p class="text-white">and speed up your transcations</p>
					<form id="products/create" class="createProduct" name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-product">What do you want to buy or sell</label>
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
									<input type="submit"   name=${id} class="form-control btn-lg btn-dark" value="Generate token">
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