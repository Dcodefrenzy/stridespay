define(function(require, exports, module){
	exports.showMilestoneHandller = (token, id)=>{

	const {getRequest} = require("request");
	const {sideBar} = require("../../sidebar");
	const {loading} = require("../../../loading");
	const {loginForm} = require("../../../logins");
	const {editMilestone} = require("./editMilestone");
	const {deleteMilestone} =require("./deleteMilestone");


	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");
	spinner.className ="display-none";

		const showMilestone = (milestone)=>{
			sideBar(token, id);
					const html = `<div  id="milestone" class="">
										<!-- Body Content Wrapper -->
								<div class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

									<!-- Breadcrumbs -->
									<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
										<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
											<h1>Service</h1>
											<ol class="breadcrumb style-1">
												<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
												<li class="breadcrumb-item"><a href=${"/users/services/"+milestone.product}>Service</a></li>
												<li class="breadcrumb-item" aria-current="page">Milestone</li>
											</ol>
										</div>
									</div>


									<div class="row">

										<div class="col-md-12">
											<div class="row">
												<div class="col-md-12">
													<div class="card">
														<div class="card-header bg-light media-body">
															<h5 class="card-title">${milestone.milestone.toUpperCase()}</h5>
															<h6 class="card-subtitle">&#8358; ${milestone.price.toString().slice(0, -2)}</h6>
														</div>
														<div class="card-body">
															<h5 class="card-title">Service Description</h5>
															<p class="card-text">${milestone.description}</p>
															<div class="text-center">
																<a class="btn btn-success text-white" id=${id} target=${token.token} name=${token._id} onclick="return editMilestone(event, this.id, this.target, this.name)"><i class="lni-enter"></i>Update Milestone</a>
																<a  class="btn btn-danger text-white" id=${id}  target=${token.token} name=${token._id} onclick="return deleteMilestone(event, this.id, this.target, this.name)"><i class="lni-trash"></i>Delete Milestone</a>
															</div>
														</div>
														<div class="card-footer bg-light">
															Created: ${moment(milestone.dateCreated).format("L")}
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
				console.log(response)
				if (response.status === 401) {

				loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 403) {
					alert(response.message.message)
					window.location ="/users/projects";
				}else if (response.status === 200) {
					showMilestone(response.milestone);
				}
			}

			getRequest("milestones/read/"+id, token, "GET", load);

	}
})