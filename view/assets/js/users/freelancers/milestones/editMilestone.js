define(function(require, exports, module) {
		 
	return editMilestone =(event, id, token, tokenId)=>{
	const {getRequest} = require("request");
	const {sideBar} = require("../../sidebar");
	const {loading} = require("../../../loading");
	const {loginForm} = require("../../../logins");
	const {displayTextEditor} = require('../../texteditor');
	const spinner = document.getElementById("milestone");

	spinner.className ="display-none";
		const editMilestoneHandler = (milestone)=>{
					const html = `<div id="revert" class="bg-background container">
				<div class="container">
				<div id="loading"></div>
					<div class="row mt-2 p-3">
					<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
				<a href=${"/users/milestone/"+milestone._id}><i class="fa fa-arrow-left text-dark"></i></div></a>
					</div>
				<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
					<h1>Create Milestone</h1>
					<p class="text-dark">Update  Milestone</p>
					<form id=${"milestones/update/"+milestone.product+"/"+id} class="editMilestone" name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-title">Title</label>
									<input type="text" name="title" value="${milestone.milestone}" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="eg design a prototype?">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">							
								<div class="form-group">
									<label id="error-price">What is the price for this milestone?</label>
									<input type="Number" value=${milestone.price.toString().slice(0, -2)} name="price" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="The  amount for this milestone?">
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">							
								<div class="form-group" id='textarea-div'>
									<label id="error-description">Description</label>	
									
								</div>
							</div>
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<input type="submit" name=${id} class="form-control btn-lg btn-dark" value="Save">
								</div>
							<div>
						</div>
					</form>
				</div>
			</div>
		</div>
	 </div>`;
	 body.insertAdjacentHTML('beforeend', html);
	 displayTextEditor(milestone.description);
		}


	 	const load=(response)=>{
				console.log(response)
				if (response.status === 401) {

				loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					editMilestoneHandler(response.milestone);
				}
			}

			getRequest("milestones/read/"+id, {token:token, _id:tokenId}, "GET", load);
	}



});