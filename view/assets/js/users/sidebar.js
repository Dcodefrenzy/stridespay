define(function (require, exports, module) {
	let sideBar;
	 exports.sideBar=(token, id)=>{
	const {updateNotification} = require("./updatePlayerId");
	const {loading} = require("../loading");
	const {getRequest} = require("request");
	const {loginForm} = require("../logins");
	const {logout} = require("./logout");
	const nav = document.getElementById("user-side-bar-open");
		const showNavBar=(user, wallet,withdraw)=>{
			let image;
			if (user.image) {
				image = `<img width="100%" src="/assets/images/${user.image}" class="col-7 profile-image"/>`;								
			}else{
				image = `<i class="fa fa-user fa-4x col-7 text-align-center" aria-hidden="true"></i>`
			}
		const html = `<div>
						 <div class="card bg-background">
						 	<div class="card-body">
						 		<div class="row justify-content-center align-content-center">
						 		${image}
								<a href="/users/upload/image" class="col-7"><small >edit image</small></a>
						 		<small class="col-12 offset-3"><b>@${user.name}</b></small>
						 		</div>
						 	</div>
						 </div>
						        <div class="mt-5 mx-3">
						          <p class="hover-strides"><a href="/users/dashboard"><i class="fa fa-home" aria-hidden="true"></i> Home</a></p>
						          <p class="hover-strides"><a href="/users/profile"><i class="fa fa-user" aria-hidden="true"></i> Profile</a></p>
						          <h6 class="mt-4">Your Business</h6>
						          <p class="hover-strides"><a href="/users/projects"><i class="fa fa-plus-circle" aria-hidden="true"></i> Start new Project</a></p>
						          <p class="hover-strides"><a href="/users/contracts"><i class="fa fa-handshake" aria-hidden="true"></i> Contracts</a></p>
						          <p class="hover-strides"><a href="/users/client-database"><i class="fa fa-users" aria-hidden="true"></i> Client Database</a></p>
						          <p class="hover-strides"><a href="/users/withdraw"><i class="fa fa-landmark" aria-hidden="true"></i> Wallet</a></p>
						          <h6 class="mt-4">Project Tracking</h6>
						          <p class="hover-strides"><a href="/users/transactions/client"><i class="fa fa-tasks" aria-hidden="true"></i> As Client </a></p>
						          <p class="hover-strides"><a href="/users/transactions/freelancer"><i class="fa fa-tasks" aria-hidden="true"></i> As Freelancer</a></p>
						          <h6 class="mt-4">Analysis</h6>
						          <p class="hover-strides"><a href="/users/financial-analysis"><i class="fa fa-chart-bar" aria-hidden="true"></i> Financials</a></p>
						          <p class="hover-strides"><a href="/users/project-analysis"><i class="fa fa-chart-pie fa-spin" aria-hidden="true"></i> Projects</a></p>
						          <h6 class="mt-4">Others</h6>
						          <p class="hover-strides"><a href="/users/settings"><i class="fa fa-cog fa-spin" aria-hidden="true"></i> Settings</a></p>
						          <p class="hover-strides" onclick="return logout(event)"><a href="#"><i class="fa fa-arrow-left" aria-hidden="true"></i> Log out</a></p>
						          <h6 class="mt-4">Coming soon!!!</h6>
						          <p class="hover-strides"><a href="#"><i class="fas fa-gift" aria-hidden="true"></i> Premium</a></p>
						          <p class="hover-strides"><a href="#"><i class="fa fa-user-plus" aria-hidden="true"></i> Invite friends</a></p>
						          <p class="hover-strides"><a href="#"><i class="fa fa-file" aria-hidden="true"></i> Contract Templates</a></p>
						          <p class="hover-strides"><a href="#"><i class="fa fa-bullhorn" aria-hidden="true"></i> whispers (task)</a></p>
						        </div>
					</div>`;
		 				nav.insertAdjacentHTML('afterbegin', html);
		}


		const loadDashboard=(response)=>{
				if (response.status === 401) {
					loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					showNavBar(response.user, response.wallet, response.withdraw);
					updateNotification(token);
				}
			}


			getRequest("users/profile", token, "GET", loadDashboard);
	}
})