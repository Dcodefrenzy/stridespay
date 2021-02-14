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
							<div class="container">
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
										<div class="card bg-background min-height">
											<div class="card-body">
												<div class="col-12 col-sm-12 col-md-12">
												<a href="/users/dashboard">
													<i class="fa fa-arrow-left text-dark mt-2" aria-hidden="true"></i>
												</a>
												</div>
												<div class="col-12 col-sm-12 col-md-12 mt-3">
													<h3>Create a project</h3>
													<p>Are you selling a Product or offering a Service?</p>
															<button class="btn-lg btn-dark mt-2" onclick="return createService(event, this.id, this.value)" value="products" id="isMerchant">Service</button>
															<button onclick="return createProduct(event, this.id, this.value)" value="products" id="isMerchant" class="mt-2 btn-lg btn-green">Product</button>
												</div>
												<div class="col-12 col-sm-12 col-md-12 mt-5">
													<h4>Prjects Created</h4>
													<nav>
														  <div class="nav nav-tabs" id="nav-tab" role="tablist">
														    <a class="col-6 nav-item nav-link active" id="nav-service-tab" data-toggle="tab" href="#nav-service" role="tab" aria-controls="nav-service" aria-selected="true"><i class="fa fa-tasks text-green" aria-hidden="true"></i> Services </a>
														    <a class="col-6 nav-item nav-link" id="nav-product-tab" data-toggle="tab" href="#nav-product" role="tab" aria-controls="nav-product" aria-selected="false"><i class="fa fa-gift text-green" aria-hidden="true"></i> Product</a>
														  </div>
													</nav>
													<div class="tab-content" id="nav-tabContent">
														
														<div class="tab-pane fade show active" id="nav-service" role="tabpanel" aria-labelledby="nav-service-tab">
														<div class="row">${services}</div>
														</div>
													  	<div class="tab-pane fade" id="nav-product" role="tabpanel" aria-labelledby="nav-product-tab">
													  		<div class="row">${products}</div>	
													  	</div>
													</div>
												</div>
											</div>
										</div>
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
			if (response.products.length >0) {
				const product = response.products.map((product)=>{							
					let title  = product.isMerchant===true?"Selling":product.isMerchant===false?"Buying":"";
					if (product.isService === false && product.delete ===false) {
							return `<div class="col-12 col-sm-5 col-md-5">
											<a href=/users/products/${product._id}>
												<div class="card shadow-lg p-3 mb-3 bg-background rounded">
													<div class="card-body text-center">
														<i class="fa fa-shopping-cart fa-3x text-green" aria-hidden="true"></i>
														<p class="text-dark">${product.product}</p>
														<p class="text-dark">&#8358; ${product.price.slice(0, -2)}</p>
														<p class="text-dark">You are <b class="text-green">${title}</b> this product</p>
													</div>
												</div>
											</a>
										</div>`
					};
				});
				const services = response.products.map((product)=>{
					if (product.isService  === true && product.delete ===false) {
						return	`<div class="col-12 col-sm-5 col-md-5">
									<a href=/users/services/${product._id}>
										<div class="card shadow-lg p-3 mb-3 bg-background rounded">
											<div class="card-body text-center">
												<i class="fa fa-tasks fa-3x text-green" aria-hidden="true"></i>
												<p class="text-dark">${product.product}</p>
												<p class="text-dark">&#8358; ${product.price.slice(0, -2)}</p>
											</div>
										</div>
										</a>
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