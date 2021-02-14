define(function(require, exports, module) {
		 

	return createProduct =(event, id, close)=>{	
	const {displayTextEditor} = require('./texteditor');	
	const body = document.getElementById("body");
	const spinner = document.getElementById(close);
	spinner.className ="display-none";
	

		const html = `<div id="revert" class=" bg-background full-height">
				<div class="container">
				<div id="loading"></div>
					<div class="row mt-1 p-3">
					<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
				<a href="/users/projects"><i class="fa fa-arrow-left text-dark"></i></div></a>
					</div>
				<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
					<h1>Product Token</h1>
					<p class="text-dark">create a product prepaid token and speed up your transcations</p>
					<form id="products/create" class="createProduct" name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-product">Product</label>
									<input type="text" name="product" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Product?">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">							
								<div class="form-group">
									<label id="error-price">What is the price?</label>
									<input type="Number" name="price" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="How much is it?">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">							
								<div class="form-group" id='textarea-div'>
									<label id="error-description">Description of your product</label>
									
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<input type="submit"   name="${id}" class="form-control btn-lg btn-dark" value="Generate token">
								</div>
							<div>
						</div>
					</form>
				</div>
			</div>
		</div>
	 </div>`;
	 body.insertAdjacentHTML('beforeend', html);
	 displayTextEditor();
	}



});