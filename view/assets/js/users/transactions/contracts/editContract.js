define(function(require, exports, module) {
		 
	 exports.editContract =(token, id)=>{
		console.log(id)
		console.log(token)
	const {getRequest} = require("request");
	const {sideBar} = require("../../sidebar");
	const {loading} = require("../../../loading");
	const {loginForm} = require("../../../logins");
	const {displayTextEditor} = require('../../texteditor');

		const editServiceHandller = (service)=>{
					sideBar(token, id);
					const html = `<div id="revert" class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

			<!-- Breadcrumbs -->
			<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
				<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					<h1>Contract</h1>
					<ol class="breadcrumb style-1">
						<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item"><a href=${"/users/services/token/"+service._id}>Contract</a></li>
						<li class="breadcrumb-item" aria-current="page">Update Contract</li>
					</ol>
				</div>
			</div>

			<div class="row">

				<div class="col-xl-12">
					<div class="card">
						<div class="card-body">
							<h1>Edit Contract</h1>
							<p class="text-dark">Update  Contract</p>
							<form id=${"transactions/edit/"+service._id} class="editContract" name="submitForm" onsubmit="return register(event)">
								<div class="row">
									<div class="col-12 col-sm-12 col-md-12">
										<div class="form-group">
											<label id="error-title">Title</label>
											<input type="text" name="service" value="${service.productName}" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="eg design a prototype?">
										</div>
									</div>
									<div class="col-12 col-sm-12 col-md-12">
										<div class="form-group">
											<label id="error-currency">Currency</label>
													<select class="form-control" name="currency" oninput="return returnValidation(this.value, this.name)" required>
														<option value="${service.currency}">${service.currency}</option>
														<option value="NGN">NGN</option>
														<option value="USD">USD</option>
													</select>
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
					editServiceHandller(response.transaction);
				}else if (response.status === 403) {
					if (response.message.kind) {}			
			 	alert("This Contract do not exist in the database")
				window.location = "/users/contracts";	
				}
			}

			getRequest("transactions/manage/"+id, token, "GET", load);
	}



});