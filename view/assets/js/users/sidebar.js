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
						<nav class="navbar dsh-navbar">

							<div class="d-flex align-items-center">
							    <!-- Mobile Logo -->
							    <div class="dsh-logo">
							      <a class="text-center navbar-brand" href="#"><img src="/assets/images/fav1.png" alt="logo"> </a>
							</div>

							    <!-- Toggle Main sidenav -->

							    <!-- Mega Menu -->
							    <!--
							    <div class="dropdown d-none d-lg-inline-block mega-menu">
							      <a href="#" id="navMegaMenu" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							        Solutions
							      </a>
							      <div class="dropdown-menu dropdown-menu-left" aria-labelledby="navMegaMenu">
							        <div class="row m-0">
							          <div class="col-lg-5 p-4 bg-primary">
							            <p class="text-uppercase text-white opacity-75">Products</p>
							            <ul>
							              <li class="media px-0">
							                <i class="text-white lni-wallet icon-3x"></i>
							                <div class="media-body">
							                  <h4 class="text-white">Expenses</h4>
							                  <p class="text-white opacity-75 mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
							                  <a class="text-white text-uppercase dsh-semi-bold mr-2 small" href="#">Pay Online</a>
							                  <a class="text-white text-uppercase dsh-semi-bold small" href="#">View Wallet</a>
							                </div>
							              </li>
							              <li class="media px-0">
							                <i class="text-white lni-empty-file icon-3x"></i>
							                <div class="media-body">
							                  <h4 class="text-white">Invoice</h4>
							                  <p class="text-white opacity-75 mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
							                  <a class="text-white text-uppercase dsh-semi-bold mr-2 small" href="#">Payments</a>
							                  <a class="text-white text-uppercase dsh-semi-bold small" href="#">eInvoice</a>
							                </div>
							              </li>
							              <li class="media px-0 pb-0">
							                <i class="text-white lni-pie-chart icon-3x"></i>
							                <div class="media-body">
							                  <h4 class="text-white">Analytics</h4>
							                  <p class="text-white opacity-75 mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
							                </div>
							              </li>
							            </ul>
							          </div>
							          <div class="col-lg-7 p-4">
							            <div class="row">
							              <div class="col-md-12">
							                <p class="text-uppercase text-success opacity-75">Solutions</p>
							              </div>
							              <div class="col-md-6">
							                <p class="text-muted text-uppercase">By Company Size</p>
							                <ul class="dsh-list-unstyled">
							                  <li> <a class="dsh-light-bold d-block" href="#">Global</a> </li>
							                  <li> <a class="dsh-light-bold d-block" href="#">Enterprise</a> </li>
							                  <li> <a class="dsh-light-bold d-block" href="#">Fast Growing</a> </li>
							                  <li> <a class="dsh-light-bold d-block" href="#">Start-up</a> </li>
							                </ul>
							              </div>
							              <div class="col-md-6">
							                <p class="text-muted text-uppercase">By Role</p>
							                <ul class="dsh-list-unstyled">
							                  <li> <a class="dsh-light-bold d-block" href="#">CEO</a> </li>
							                  <li> <a class="dsh-light-bold d-block" href="#">CTO</a> </li>
							                  <li> <a class="dsh-light-bold d-block" href="#">CFO</a> </li>
							                  <li> <a class="dsh-light-bold d-block" href="#">HR</a> </li>
							                  <li> <a class="dsh-light-bold d-block" href="#">Sales</a> </li>
							                  <li> <a class="dsh-light-bold d-block" href="#">Developers</a> </li>
							                  <li> <a class="dsh-light-bold d-block" href="#">Finance</a> </li>
							                </ul>
							              </div>
							            </div>
							          </div>
							        </div>
							      </div>
							    </div>
							    -->

							  </div>

							<ul class="dsh-nav-list dsh-inline mb-0" id="dsh-nav-options">
							 
							    <li class="dsh-nav-item dropdown">
							      <a href="#" id="searchDropdown" class="dsh-svg-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 310.42 310.42" xml:space="preserve">
							          <path d="M273.587,214.965c49.11-49.111,49.109-129.021,0-178.132c-49.111-49.111-129.02-49.111-178.13,0
							        C53.793,78.497,47.483,140.462,76.51,188.85c0,0,2.085,3.498-0.731,6.312c-16.065,16.064-64.263,64.263-64.263,64.263
							        c-12.791,12.79-15.836,30.675-4.493,42.02l1.953,1.951c11.343,11.345,29.229,8.301,42.019-4.49c0,0,48.096-48.097,64.128-64.128
							        c2.951-2.951,6.448-0.866,6.448-0.866C169.958,262.938,231.923,256.629,273.587,214.965z M118.711,191.71
							        c-36.288-36.288-36.287-95.332,0.001-131.62c36.288-36.287,95.332-36.288,131.619,0c36.288,36.287,36.288,95.332,0,131.62
							        C214.043,227.996,155,227.996,118.711,191.71z" />
							          <path opacity="0.4" d="M126.75,118.424c-1.689,0-3.406-0.332-5.061-1.031c-6.611-2.798-9.704-10.426-6.906-17.038
							        c17.586-41.559,65.703-61.062,107.261-43.476c6.611,2.798,9.704,10.426,6.906,17.038c-2.799,6.612-10.425,9.703-17.039,6.906
							        c-28.354-11.998-61.186,1.309-73.183,29.663C136.629,115.445,131.815,118.424,126.75,118.424z" />
							        </svg>
							      </a>
							      <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="searchDropdown">
							        <li class="dsh-search-dropdown">
							          <form class="dsh-form" method="post">
							            <div class="has-icon">
							              <input type="search" class="form-control" name="search" placeholder="Search here..." value="">
							              <i class="lni-search"></i>
							            </div>
							          </form>
							        </li>
							      </ul>
							    </li>
							    <!-- Notifications -->
							    <li class="dsh-nav-item dropdown">
							      <a href="/users/notifications"" class="dsh-has-notification dsh-svg-icon">
							        <svg viewBox="-21 0 512 512" xmlns="http://www.w3.org/2000/svg">
							          <path opacity="0.4" d="m213.34375 512c38.636719 0 70.957031-27.542969 78.378906-64h-156.757812c7.425781 36.457031 39.746094 64 78.378906 64zm0 0" />
							          <path d="m362.933594 255.980469c-.085938 0-.171875.019531-.257813.019531-82.324219 0-149.332031-66.988281-149.332031-149.332031 0-22.636719 5.207031-44.035157 14.273438-63.277344-4.695313-.445313-9.453126-.722656-14.273438-.722656-82.472656 0-149.332031 66.855469-149.332031
							    149.332031v59.476562c0 42.21875-18.496094 82.070313-50.945313 109.503907-10.816406 9.238281-15.617187 23.957031-11.734375 38.316406 4.523438 16.703125 21.035157 27.371094 38.359375 27.371094h347.199219c18.175781 0 35.308594-11.777344
							    38.996094-29.589844 2.859375-13.78125-2.046875-27.542969-12.734375-36.523437-31.019532-26.003907-48.960938-64.214844-50.21875-104.574219zm0 0" />
							          <path opacity="0.4"
							            d="m469.34375 106.667969c0 58.910156-47.753906 106.664062-106.667969 106.664062-58.910156 0-106.664062-47.753906-106.664062-106.664062 0-58.910157 47.753906-106.667969 106.664062-106.667969 58.914063 0 106.667969 47.757812 106.667969 106.667969zm0 0" />
							        </svg>
							      </a>
							      <!-- <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="notificationDropdown">
							        <li class="dropdown-header bg-light">
							          <h6>Notifications</h6>
							        </li>
							        <li class="dropdown-divider"></li>
							        <li class="dsh-custom-scroll dsh-dropdown-list">
							          <a class="media notification" href="#">
							            <img src="/assets/stridespay/img/people/people-1-sm.jpg" class="rounded-circle" alt="user">
							            <div class="media-body">
							              <h6>Incoming Message</h6>
							              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
							            </div>
							          </a>
							          <a class="media notification" href="#">
							            <img src="/assets/stridespay/img/people/people-2-sm.jpg" class="rounded-circle" alt="user">
							            <div class="media-body">
							              <h6>You got a new email</h6>
							              <p>Lorem Ipsum is simply dummy text of the printing</p>
							            </div>
							          </a>
							          <a class="media notification" href="#">
							            <img src="/assets/stridespay/img/people/people-3-sm.jpg" class="rounded-circle" alt="user">
							            <div class="media-body">
							              <h6>Hello world!</h6>
							              <p>Lorem Ipsum is simply dummy text of the printing</p>
							            </div>
							          </a>
							          <a class="media notification" href="#">
							            <img src="/assets/stridespay/img/people/people-4-sm.jpg" class="rounded-circle" alt="user">
							            <div class="media-body">
							              <h6>Beep Boop. Beee...</h6>
							              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
							            </div>
							          </a>
							        </li>
							      </ul> -->
							    </li>
							    <!-- User Dropdown -->
							    <li class="dsh-nav-item dsh-nav-user dropdown">
							      <a href="#" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							        <img class="dsh-user-img rounded-circle float-right" src="/assets/images/${user.image}" alt="people">
							      </a>
							      <ul class="dropdown-menu dropdown-md dropdown-menu-right user-dropdown" aria-labelledby="userDropdown">
							        <li class="dropdown-header media bg-light">
							          <img src="/assets/images/${user.image}" class="rounded-circle" alt="">
							          <div class="media-body">
							            <h6 class="dsh-semi-bold">@${user.name}</h6>
							            <p>+234${user.phonenumber}</p>
							          </div>
							        </li>
							        <li class="dropdown-divider "></li>
							        <li class="dsh-dropdown-list">
							          <a class="media" href="/users/profile">
							            <div class="media-body">
							              <h6>Profile</h6>
							            </div>
							            <span class="dsh-svg-icon">
							              <svg viewBox="-42 0 512 512.002" xmlns="http://www.w3.org/2000/svg">
							                <path opacity="0.4" d="m210.351562 246.632812c33.882813 0 63.222657-12.152343 87.195313-36.128906 23.972656-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906
							                  53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.132812 87.195312 23.976563 23.96875 53.3125 36.125 87.1875 36.125zm0 0" />
							                <path d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.308594-10.339844-7.808594-20.550781-13.371094-30.335938-5.773438-10.15625-12.554688-19-20.164063-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563
							                    0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.039063 5.339844-10.972656 0-22.085937-1.796876-33.046874-5.339844-11.210938-3.621094-20.296876-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.75-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75
							                    2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.605469 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.058594 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.796875-1.023438 19.964844-1.023438 30.234375
							                    0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.441406 23.734375 65.066406 23.734375h246.53125c26.625 0 48.511719-7.984375 65.0625-23.734375 16.757813-15.945312 25.253906-37.585937 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm0 0" />
							              </svg>
							            </span>
							          </a>
							          <a class="media" href="/users/settings">
							            <div class="media-body">
							              <h6>Change your settings</h6>
							            </div>
							            <span class="dsh-svg-icon">
							              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 369.793 369.792" xml:space="preserve">
							                <path d="M320.83,140.434l-1.759-0.627l-6.87-16.399l0.745-1.685c20.812-47.201,19.377-48.609,15.925-52.031L301.11,42.61
							                          c-1.135-1.126-3.128-1.918-4.846-1.918c-1.562,0-6.293,0-47.294,18.57L247.326,60l-16.916-6.812l-0.679-1.684
							                          C210.45,3.762,208.475,3.762,203.677,3.762h-39.205c-4.78,0-6.957,0-24.836,47.825l-0.673,1.741l-16.828,6.86l-1.609-0.669
							                          C92.774,47.819,76.57,41.886,72.346,41.886c-1.714,0-3.714,0.769-4.854,1.892l-27.787,27.16
							                          c-3.525,3.477-4.987,4.933,16.915,51.149l0.805,1.714l-6.881,16.381l-1.684,0.651C0,159.715,0,161.556,0,166.474v38.418
							                          c0,4.931,0,6.979,48.957,24.524l1.75,0.618l6.882,16.333l-0.739,1.669c-20.812,47.223-19.492,48.501-15.949,52.025L68.62,327.18
							                          c1.162,1.117,3.173,1.915,4.888,1.915c1.552,0,6.272,0,47.3-18.561l1.643-0.769l16.927,6.846l0.658,1.693
							                          c19.293,47.726,21.275,47.726,26.076,47.726h39.217c4.924,0,6.966,0,24.859-47.857l0.667-1.742l16.855-6.814l1.604,0.654
							                          c27.729,11.733,43.925,17.654,48.122,17.654c1.699,0,3.717-0.745,4.876-1.893l27.832-27.219
							                          c3.501-3.495,4.96-4.924-16.981-51.096l-0.816-1.734l6.869-16.31l1.64-0.643c48.938-18.981,48.938-20.831,48.938-25.755v-38.395
							                          C369.793,159.95,369.793,157.914,320.83,140.434z M184.896,247.203c-35.038,0-63.542-27.959-63.542-62.3
							                          c0-34.342,28.505-62.264,63.542-62.264c35.023,0,63.522,27.928,63.522,62.264C248.419,219.238,219.92,247.203,184.896,247.203z">
							                </path>
							              </svg>
							            </span>
							          </a>
							          <a class="media"  onclick="return logout(event)">
							            <div class="media-body">
							              <h6>Logout</h6>
							            </div>
							            <span class="dsh-svg-icon svg-danger" onclick="return logout(event)">
							              <svg viewBox="0 0 512.00533 512" xmlns="http://www.w3.org/2000/svg">
							                <path d="m320 277.335938c-11.796875 0-21.332031 9.558593-21.332031 21.332031v85.335937c0 11.753906-9.558594 21.332032-21.335938 21.332032h-64v-320c0-18.21875-11.605469-34.496094-29.054687-40.554688l-6.316406-2.113281h99.371093c11.777344 0 21.335938 9.578125 21.335938 21.335937v64c0 11.773438
							                  9.535156 21.332032 21.332031 21.332032s21.332031-9.558594 21.332031-21.332032v-64c0-35.285156-28.714843-63.99999975-64-63.99999975h-229.332031c-.8125 0-1.492188.36328175-2.28125.46874975-1.027344-.085937-2.007812-.46874975-3.050781-.46874975-23.53125 0-42.667969 19.13281275-42.667969
							                  42.66406275v384c0 18.21875 11.605469 34.496093 29.054688 40.554687l128.386718 42.796875c4.351563 1.34375 8.679688 1.984375 13.226563 1.984375 23.53125 0 42.664062-19.136718 42.664062-42.667968v-21.332032h64c35.285157 0 64-28.714844 64-64v-85.335937c0-11.773438-9.535156-21.332031-21.332031-21.332031zm0 0"/>
							                <path opacity="0.4" d="m505.75 198.253906-85.335938-85.332031c-6.097656-6.101563-15.273437-7.9375-23.25-4.632813-7.957031 3.308594-13.164062 11.09375-13.164062 19.714844v64h-85.332031c-11.777344 0-21.335938 9.554688-21.335938 21.332032 0 11.777343 9.558594 21.332031 21.335938 21.332031h85.332031v64c0 8.621093
							                  5.207031 16.40625 13.164062 19.714843 7.976563 3.304688 17.152344 1.46875 23.25-4.628906l85.335938-85.335937c8.339844-8.339844 8.339844-21.824219 0-30.164063zm0 0"/>
							              </svg>
							            </span>
							          </a>
							        </li>
							      </ul>
							    </li>
							</ul>
						</nav>
						<div class="clearfix pt-3">
						 <div class="card bg-background mt-5">
						 	<div class="card-body bg-background">
						 		<div class="row justify-content-center align-content-center">
						 		${image}
								<a href="/users/upload/image" class="col-7 text-center"><small >edit</small></a>
						 		<small class="col-12 text-green text-center"><b>@${user.name}</b></small>
						 		</div>
						 	</div>
						 </div>
						 </div>
						        <div class="mt-5 mx-3">
						          <p class="hover-strides"><a href="/users/dashboard" class="text-green"><i class="fa fa-home" aria-hidden="true"></i> Home</a></p>
						          <p class="hover-strides"><a href="/users/profile" class="text-green"><i class="fa fa-user" aria-hidden="true"></i> Profile</a></p>
						          <h6 class="mt-4"><b>Your Business</b></h6>
						          <p class="hover-strides"><a href="/users/projects" class="text-green"><i class="fa fa-plus-circle" aria-hidden="true"></i> New Project</a></p>
						          <p class="hover-strides"><a href="/users/contracts" class="text-green"><i class="fa fa-handshake" aria-hidden="true"></i> Contracts</a></p>
						          <p class="hover-strides"><a href="/users/client-database" class="text-green"><i class="fa fa-users" aria-hidden="true"></i> Database</a></p>
						          <p class="hover-strides"><a href="/users/wallets" class="text-green"><i class="fa fa-landmark" aria-hidden="true"></i> Wallet</a></p>
						          <h6 class="mt-4"><b>Project Tracking</b></h6>
						          <p class="hover-strides"><a href="/users/transactions/client" class="text-green"><i class="fa fa-tasks" aria-hidden="true"></i> As Client </a></p>
						          <p class="hover-strides"><a href="/users/transactions/freelancer" class="text-green"><i class="fa fa-tasks" aria-hidden="true"></i> As Freelancer</a></p>
						          <h6 class="mt-4">Analysis</b></h6>
						          <p class="hover-strides"><a href="/users/financial-analysis" class="text-green"><i class="fa fa-chart-bar" aria-hidden="true"></i> Financials</a></p>
						          <p class="hover-strides"><a href="/users/project-analysis" class="text-green"><i class="fa fa-chart-pie fa-spin" aria-hidden="true"></i> Projects</a></p>
						          <h6 class="mt-4"><b>Others</b></h6>
						          <p class="hover-strides"><a href="/users/settings" class="text-green"><i class="fa fa-cog fa-spin" aria-hidden="true"></i> Settings</a></p>
						          <p class="hover-strides" onclick="return logout(event)"><a href="#" class="text-green"><i class="fa fa-arrow-left" aria-hidden="true"></i> Log out</a></p>
						          <h6 class="mt-4"><b>Coming soon!!!</b></h6>
						          <p class="hover-strides"><a href="#" class="text-green"><i class="fas fa-gift" aria-hidden="true"></i> Premium</a></p>
						          <p class="hover-strides"><a href="#" class="text-green"><i class="fa fa-user-plus" aria-hidden="true"></i> Invite friends</a></p>
						          <p class="hover-strides"><a href="#" class="text-green"><i class="fa fa-file" aria-hidden="true"></i> Contract Templates</a></p>
						          <p class="hover-strides"><a href="#" class="text-green"><i class="fa fa-bullhorn" aria-hidden="true"></i> whispers (task)</a></p>
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