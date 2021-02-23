define(function(require, exports, module) {
		 
	return createMilestone =(event, id, close)=>{
	
	const {displayTextEditor} = require('../texteditor');
	const spinner = document.getElementById(close);

	spinner.className ="display-none";
		const html = `<div id="revert" class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

			<!-- Breadcrumbs -->
			<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
				<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					<h1>Milestones</h1>
					<ol class="breadcrumb style-1">
						<li class="breadcrumb-item"><a href="/users/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item"><a href="/users/services/${id}">Service</a></li>
						<li class="breadcrumb-item" aria-current="page">Milestone</li>
					</ol>
				</div>
			</div>

			<div class="row">

				<div class="col-xl-12">
					<div class="card">
						<div class="card-body">
							<h1>Create A milestones</h1>
							<p >Create a Milestone</p>
							<form id=${"milestones/create/"+id} class="createMilestone" name="submitForm" onsubmit="return register(event)">
								<div class="row">
									<div class="col-12 col-sm-12 col-md-12">
										<div class="form-group">
											<label id="error-title">Title</label>
											<input type="text" name="title" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="eg design a prototype?">
										</div>
									</div>
									<div class="col-12 col-sm-12 col-md-12">							
										<div class="form-group">
											<label id="error-price">What is the price for this milestone?</label>
											<input type="Number" name="price" required oninput="return returnValidation(this.value, this.name)"  class="form-control" placeholder="The  amount for this milestone?">
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
	 displayTextEditor()
	}



});