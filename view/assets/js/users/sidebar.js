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

		const html = `<div>
						 <div class="card">
						 	<div class="card-body">
								<i class="fa fa-user fa-2x" aria-hidden="true"></i>
						 		<p>${user.name}</p>
						 		<p><i class="fa fa-money"></i> ${wallet.amount.toString().slice(0, -2)}</p>
						 	</div>
						 </div>
						        <div class="mt-5 mx-3">
						          <p class="hover-strides"><a href="/users/dashboard"><i class="fa fa-home" aria-hidden="true"></i> Home</a></p>
						          <p class="hover-strides"><a href="/users/profile"><i class="fa fa-user" aria-hidden="true"></i> Profile</a></p>
						          <h6 class="mt-4">Your Business</h6>
						          <p class="hover-strides"><a href="/users/projects"><i class="fa fa-plus-circle" aria-hidden="true"></i> Start new Project</a></p>
						          <p class="hover-strides"><a href="/users/transactions"><i class="fa fa-tasks" aria-hidden="true"></i> Project Tracking</a></p>
						          <p class="hover-strides"><a href="/users/dashboard"><i class="fa fa-users" aria-hidden="true"></i> Client Database</a></p>
						          <p class="hover-strides"><a href="/users/withdraw"><i class="fa fa-landmark" aria-hidden="true"></i> Wallet</a></p>
						          <h6 class="mt-4">Analysis</h6>
						          <p class="hover-strides"><a href="/users/dashboard"><i class="fa fa-chart-bar" aria-hidden="true"></i> Financials</a></p>
						          <p class="hover-strides"><a href="/users/dashboard"><i class="fa fa-chart-pie fa-spin" aria-hidden="true"></i> progress</a></p>
						          <h6 class="mt-4">Others</h6>
						          <p class="hover-strides"><a href="/users/settings"><i class="fa fa-cog fa-spin" aria-hidden="true"></i> Settings</a></p>
						          <p class="hover-strides" onclick="return logout(event)"><a href="#"><i class="fa fa-arrow-left" aria-hidden="true"></i> Log out</a></p>
						          <p class="hover-strides"><a href="/users/dashboard"><i class="fas fa-gift" aria-hidden="true"></i> Premium</a></p>
						          <p class="hover-strides"><a href="/users/dashboard"><i class="fa fa-user-plus" aria-hidden="true"></i> Invite friends</a></p>
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