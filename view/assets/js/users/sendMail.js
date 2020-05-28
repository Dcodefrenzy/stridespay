define(function(require, exports, modules){

	exports.form=(link, loader, title)=>{
		let html = `<div id="login" class="fixed-top bg-green full-height"><div class="container">
					<div class="row align-items-center mt-5 p-5">
		<div class="col-12 col-sm-12 col-md-12 col-lg-12">
				<a href="/users/login"><i class="fa fa-arrow-left text-dark"></i></div></a>
				<div class="col-12 col-sm-12 col-md-6 col-lg-6 mt-lg-5">
					<img  src="/assets/images/bglogo1.png"></div>
				<div class="col-12 col-sm-12 col-md-6 col-lg-6">
					<h1>${title}</h1>
					<form id=${link} class=${loader} name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<p id="error-message"></p>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-message"></label>
									<label id="error-email">Email</label>
									<input type="text" name="email" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your email here">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<input type="submit" name="submit" class="form-control btn-lg btn-success" value="Login">
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
})