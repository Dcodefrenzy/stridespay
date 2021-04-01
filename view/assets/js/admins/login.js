define(function(require, exports, module) {
	exports.loginSession=(event, id)=>{	

	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	const nav = document.getElementById("user-side-bar-open");
	const navIcon = document.getElementById("user-open-side-bar");
	nav.className = "display-none";
	navIcon.className = "display-none";
	spinner.className ="display-none";

		let html = `<main id="login"  class="body-content bg-background min-100vh d-flex justify-content-between flex-column clearfix fixed">

		<div class="dsh-locked-content">
			<div class="media p-4">
				<div class="media-body">
					<a class="text-center navbar-brand" href="#"><img width="50%" src="/assets/images/fav1.png" alt="logo"> </a>
				</div>
			</div>
		</div>

		<form  id="admins/login" class="loginAdminSession" name="submitForm" onsubmit="return register(event)" class="d-flex flex-column align-items-center justify-content-center dsh-unlocked-content mx-auto needs-validation" novalidate="" >
			<div class="dsh-avatar dsh-avatar-lg dsh-avatar-elevated mx-auto mb-4">
				<img width="50%" src="/assets/images/fav1.png" alt="logo" class="rounded-circle">
			</div>
			<div class="dsh-section-title text-center">
				<h3>Administrator</h3>
				<span>Login</span>
			</div>	
			<div class="form-group w-100">
				<label id="error-email"></label>
				<input type="email" name="email" oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="Enter your email here" required>
			</div>
			<div class="form-group w-100">
				<label id="error-password"></label>
				<input type="password" name="password" oninput="return returnValidation(this.value, this.name)" class="form-control" placeholder="Enter PIN" oninput="return returnValidation(this.value, this.name)" required="">
			</div>
			<button type="submit" class="btn btn-primary btn-sm btn-block">Unlock</button>
		</form>

		<div class="dsh-locked-content d-flex align-items-center justify-content-end">
			<p class="d-none d-md-block">The good man is the friend of all living things.</p>
		</div>

	</main>`;
	 body.insertAdjacentHTML('afterbegin', html);
	}

});