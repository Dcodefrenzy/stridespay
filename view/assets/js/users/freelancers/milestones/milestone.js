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
					const html = `<div id="milestone" class="">
								<div class="container">
									<div class="row align-items-center mt-4 p-0">
										<div class="col-12 col-sm-12  col-md-9 offset-md-3 col-lg-9 offset-lg-3">
											<a href=${"/users/services/"+milestone.product}><i class="fa fa-arrow-left text-dark"></i></a>
											<div class="row">
												<div class="col-12 col-sm-12 col-md-12 col-lg-12  mt-2">
													<div class="card bg-background shadow-lg  mb-5  rounded p-3">
														<div class="col-12 col-sm-8 offset-sm-2 col-md-8  text-center">
															<p><i class="fa fa-thumbtack" aria-hidden="false"></i> Milestone</p>			
														</div>
														${
													 `<div class="col-12">
															<div class="card shadow-lg  bg-background rounded mt-0">
																<div class="card-body text-center">
																<div class="row justify-content-center">
																	 <button id=${id} class="btn-sm btn-green col-md-5 col-sm-6 col-12 m-1" value=${token.token} name=${token._id} onclick="return editMilestone(event, this.id, this.value, this.name)">Update  <i class="fas fa-edit" aria-hidden="true"></i></button>
																	 <button id=${id} class="btn-sm btn-danger col-md-5 col-sm-6 col-12 m-1" value=${token.token} name=${token._id} onclick="return deleteMilestone(event, this.id, this.value, this.name)">Delete  <i class="fas fa-trash" aria-hidden="true"></i></button>
																</div>
																	<h5 class="mt-3">${milestone.milestone.toUpperCase()}</h5>
																	<span>&#8358; ${milestone.price.toString().slice(0, -2)}</span>
																	<p>${milestone.description}</p>
																</div>
															</div>
														</div>`
														}
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