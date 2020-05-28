define(function(require, exports, module) {

exports.productsHandller = (token, id)=>{
	const {loginForm} = require("../logins");
	let {createProduct} = require("./createProduct");
	const {getRequest} = require("../request");
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";


			const products=(products)=>{

				const html = `<div id="products">
							<div class="container">
								<div class="row align-items-center mt-5 p-0">
									<div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2">
										<div class="card min-height">
											<div class="card-body">
												<div class="col-12 col-sm-12 col-md-12">
												<a href="/users/dashboard">
													<i class="fa fa-arrow-left text-dark mt-2" aria-hidden="true"></i>
												</a>
												</div>
												<div class="col-12 col-sm-12 col-md-12 mt-3">
													<button onclick="return createProduct(event, this.id, this.value)" value="products" id="isBuyer" class="btn-lg btn-green">Buying</button>
													<button class="btn-lg btn-dark" onclick="return createProduct(event, this.id, this.value)" value="products" id="isMerchant">Selling</button>
												</div>
												<div class="col-12 col-sm-12 col-md-12 mt-5">
													<h4>Product Prepaid Ticket</h4>
													<div class="row">
														${products}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						 </div>`;

		 				body.insertAdjacentHTML('afterbegin', html);
			}

			const load=(response)=>{
				console.log(response.status)
				if (response.status === 401) {
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {console.log(response)
					if (response.products.length >0) {
									const allProducts = response.products.map((product)=>{							
										let title  = product.isMerchant===true?"Selling":product.isMerchant===false?"Buying":"";
									return	`<div class="col-12 col-sm-12 col-md-12">
												<a href=/users/products/${product._id}>
													<div class="card shadow-lg p-3 mb-3 bg-white rounded">
														<div class="card-body text-center">
															<i class="fa fa-shopping-cart fa-3x text-green" aria-hidden="true"></i>
															<p class="text-dark">${product.product}</p>
															<p class="text-dark">${product.price}</p>
															<p class="text-dark">You are <b class="text-green">${title}</b> this product</p>
														</div>
													</div>
												</a>
											</div>`;
										})
									products(allProducts);
					}else{
							const allProducts =  `<div class="col-12 col-sm-12 col-md-12">
													<div class="card shadow-lg p-3 mb-3 bg-white rounded">
														<div class="card-body text-center">
														<i class="fa fa-shopping-bag fa-6x text-green" aria-hidden="true"></i>
														<p class="text-dark">No Product prepaid ticket yet</p>
														<p>Create a  Product prepaid ticket</p>
														<div class="col-12 col-sm-12 col-md-12 mt-3">
															<button onclick="return createProduct(event, this.id, this.value)" value="products" id="isBuyer" class="btn-lg btn-green">Buying</button>
															<button onclick="return createProduct(event, this.id, this.value)" value="products" id="isMerchant" class="btn-lg btn-dark">Selling</button>
														</div>
													</div>
												</div>
											</div>`

								products(allProducts)
					}
				}
			}

			getRequest("products", token, "GET", load);

	}







});