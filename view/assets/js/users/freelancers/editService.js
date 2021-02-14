define(function(require, exports, module) {
		 
	return editService =(event, id, token, tokenId)=>{
	const {getRequest} = require("request");
	const {sideBar} = require("../sidebar");
	const {loading} = require("../../loading");
	const {loginForm} = require("../../logins");
	const {displayTextEditor} = require('../texteditor');
	const spinner = document.getElementById("service");

	spinner.className ="display-none";
		const editServiceHandller = (service)=>{
					const html = `<div id="revert" class="bg-background container">
				<div class="container">
				<div id="loading"></div>
					<div class="row mt-2 p-3">
					<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
				<a href=${"/users/services/"+service._id}><i class="fa fa-arrow-left text-dark"></i></div></a>
					</div>
				<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
					<h1>Edit Service</h1>
					<p class="text-dark">Update  Service</p>
					<form id=${"products/service/update/"+service._id} class="editMilestone" name="submitForm" onsubmit="return register(event)">
						<div class="row">
							<div class="col-12 col-sm-12 col-md-12">
								<div class="form-group">
									<label id="error-title">Title</label>
									<input type="text" name="title" value="${service.product}" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="eg design a prototype?">
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
	 displayTextEditor(service.description);
		}


	 	const load=(response)=>{
				console.log(response)
				if (response.status === 401) {

				loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					editServiceHandller(response.service);
				}
			}

			getRequest("products/service/"+id, {token:token, _id:tokenId}, "GET", load);
	}



});