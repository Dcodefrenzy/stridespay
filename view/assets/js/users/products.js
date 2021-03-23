define(function(require, exports, module) {

exports.productsHandller = (token, id)=>{
	const {loginForm} = require("../logins");
	let {createProduct} = require("./createProduct");
	const {loading} = require("../loading");
	let {createService} = require("./freelancers/createService");
	const {getRequest} = require("../request");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	const {sideBar} = require("./sidebar");
	spinner.className ="display-none";


			const products=(products, services)=>{

				sideBar(token, id);
				const html = `<div id="products">
						<div class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">
								<!-- Breadcrumbs -->
								<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
									<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
										<h1>Create Project</h1>
										<ol class="breadcrumb style-1">
											<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
											<li class="breadcrumb-item" aria-current="page">Projects</li>
										</ol>
									</div>
								</div>


								<div class="row">
									<div class="col-xl-6 col-lg-6 col-md-6">

										<!-- Info Box -->
										<div class="card">
											<div class="card-body text-center">
												<span class="btn btn-icon btn-lg btn-success-light btn-round mb-3">
													<i class="lni-radio-button icon-2x"></i>
												</span>
												<h5 class="card-title">Service?</h5>
												<p class="mb-3">Do you want to add a services.</p>
												<button class="btn-lg btn-dark mt-2" onclick="return createService(event, this.id, this.value)" value="products" id="isMerchant">Add a Service</button>
											</div>
										</div>
										<!-- /Info Box -->
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6">

										<!-- Info Box -->
										<div class="card">
											<div class="card-body text-center">
												<span class="btn btn-icon btn-lg btn-success-light btn-round mb-3">
													<i class="lni-shopping-basket icon-2x"></i>
												</span>
												<h5 class="card-title">Product?</h5>
												<p class="mb-3">Do you want to sell a product </p>
												<button onclick="return createProduct(event, this.id, this.value)" value="products" id="isMerchant" class="mt-2 btn-lg btn-green">Create a Product</button>
											</div>
										</div>
										<!-- /Info Box -->
									</div>
									<div class="col-xl-12">

										<!-- Basic Tabs -->
										<div class="card">
											<div class="card-body bg-background">
												<div class="dsh-section-title">
													<h5 class="card-title">PROJETCS</h5>
												</div>
												<ul class="nav nav-tabs" id="myTab" role="tablist">
													<li class="nav-item">
														<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Services</a>
													</li>
													<li class="nav-item">
														<a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Products</a>
													</li>
												</ul>
												<div class="tab-content" id="myTabContent">

													<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
														${services}
													</div>
													<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
													${products}
													</div>
												</div>
											</div>
										</div>
										<!-- /Basic Tabs -->
									</div>
								</div>

							</div>

					</div>`;

		 				body.insertAdjacentHTML('beforeend', html);
			}

			const load=(response)=>{
				
		if (response.status === 401) {
			loading("user-side-bar-open", "display-none");
			 body.insertAdjacentHTML('afterbegin', loginForm);
		}
		else if (response.status === 200) {
			console.log(response)

			if (response.products.length >0) {
				const product = response.products.map((product)=>{							
					let title  = product.isMerchant===true?"Selling":product.isMerchant===false?"Buying":"";
					let currencyCharacter = product.currency === "USD"?"$":product.currency === "NGN"?"&#8358":"&#8358"

					if (product.isService === false && product.delete ===false) {
							return `<div class="col-12 col-sm-12 col-md-12">
											<div class="card">
												<div class="card-body">
													<h5 class="card-title">${product.product}</h5>
													<h6 class="card-subtitle">${currencyCharacter} ${product.price.slice(0, -2)}</h6>
													<hr>
													<small>Description:</small>
													<p class="card-text">${product.description}</p>
													<a href="/users/products/${product._id}" class="btn btn-primary">Details</a>
												</div>
											</div>
										</div>`
					};
				});
				const services = response.products.map((product)=>{
					let currencyCharacter = product.currency === "USD"?"$":product.currency === "NGN"?"&#8358":"&#8358"

					if (product.isService  === true && product.delete ===false) {
						return	`<div class="col-12 col-sm-12 col-md-12">
											<div class="card">
												<div class="card-body">
													<h5 class="card-title">${product.product}</h5>
													<h6 class="card-subtitle">${currencyCharacter} ${product.price.slice(0, -2)}</h6>
													<hr>
													<small>Description:</small>
													<p class="card-text">${product.description}</p>
													<a href="/users/services/${product._id}" class="btn btn-primary">Details</a>
												</div>
											</div>
										</div>`
					}
				})
				products(product, services);
					}else{
							const allProducts =  `<div class="col-12 col-sm-12 col-md-12">
													<div class="card shadow-lg p-3 mb-3 bg-white rounded">
														<div class="card-body text-center">
														<img src="/assets/svg/empty.svg" width="50%" alt="online payment transfer">
														<h4>No Project created yet.</h4>
														<p class="text-dark">Project can be a product you want to sell or a service you want to render</p>
														<p>Product or Service?</p>
														<div class="col-12 col-sm-12 col-md-12 mt-3">
															<button class="btn-lg btn-dark mt-2" onclick="return createService(event, this.id, this.value)" value="products" id="isMerchant">Service</button>
															<button onclick="return createProduct(event, this.id, this.value)" value="products" id="isMerchant" class="mt-2 btn-lg btn-green">Product</button>
														</div>
													</div>
												</div>
											</div>`

								products(allProducts, allProducts)
					}
				}
			}

			getRequest("products", token, "GET", load);

	}







});