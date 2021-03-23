define(function(require, exports, module) {
		 

	return createProduct =(event, id, close)=>{	
	const {displayTextEditor} = require('./texteditor');	
	const body = document.getElementById("body");
	const spinner = document.getElementById(close);
	spinner.className ="display-none";
	

		const html = `<div id="revert" class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

			<!-- Breadcrumbs -->
			<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
				<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					<h1>Product</h1>
					<ol class="breadcrumb style-1">
						<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item"><a href="/users/projects">projects</a></li>
						<li class="breadcrumb-item" aria-current="page">Product</li>
					</ol>
				</div>
			</div>

			<div class="row">

				<div class="col-xl-12">
					<div class="card">
						<div class="card-body">
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
											<label id="error-currency">Currency</label>
													<select class="form-control" name="currency" oninput="return returnValidation(this.value, this.name)" required>
														<option value="">Select Currency</option>
														<option value="NGN">NGN</option>
														<option value="USD">USD</option>
													</select>
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

			</div>

		</div>`;
	 body.insertAdjacentHTML('beforeend', html);
	 displayTextEditor();
	}



});