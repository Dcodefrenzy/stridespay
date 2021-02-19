define(function(require, exports, module){

	exports.showClientDatabase=(token, id)=>{	
	const {loading} = require("../loading");
	const {getRequest} = require("../request");
	const {loginForm} = require("../logins");		
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");	
	const {getClientDatabasePDF} = require("./clientDatabasePdf");
	spinner.className ="display-none";
	const {sideBar} = require("./sidebar");


			const clientDatabase = (clients)=>{
			sideBar(token, id);
		const html = `<div id="revert" class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

			<!-- Breadcrumbs -->
			<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
				<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					<h1><i class="fa fa-users" aria-hidden="true"></i> Client Database</h1>
					<ol class="breadcrumb style-1">
						<li class="breadcrumb-item"><a href="/users/dashboard"">Dashboard</a></li>
						<li class="breadcrumb-item" aria-current="page">Clients</li>
					</ol>
				</div>
			</div>
			<!-- Default Datatable -->
			<div class="card">
				<div class="card-body">
					<div class="dsh-section-title">
						<h5 class="card-title">Clients</h5>
						<h6 class="card-subtitle">You can contact your clients and also exports them in a file.</h6>
					</div>
					<div id="buttons_datatable_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer"><div class="row"><div class="col-sm-12 text-right"><div class="dt-buttons btn-group flex-wrap">      <button class="btn buttons-print btn-primary" tabindex="0" aria-controls="buttons_datatable" type="button"><span>Print</span></button> <button class="btn buttons-excel buttons-html5 btn-primary" tabindex="0" aria-controls="buttons_datatable" type="button"><span>Excel</span></button> <button class="btn buttons-csv buttons-html5 btn-primary" tabindex="0" aria-controls="buttons_datatable" type="button"><span>CSV</span></button> 									<button class="btn btn-sm btn-primary" id="${token.token}" name="${id}" onclick="return getClientDatabasePDF(event, this.id, this.name)">PDF </button></div></div></div><div class="row"><div class="col-sm-12"></div></div><table id="buttons_datatable" class="table table-bordered dataTable no-footer dtr-inline" role="grid" aria-describedby="buttons_datatable_info" style="width: 1036px;">
						<thead>
							<tr role="row"><th class="sorting_asc" tabindex="0" aria-controls="buttons_datatable" rowspan="1" colspan="1" style="width: 141.25px;" aria-sort="ascending" aria-label="Name: activate to sort column descending">First Name</th><th class="sorting" tabindex="0" aria-controls="buttons_datatable" rowspan="1" colspan="1" style="width: 235.25px;" aria-label="Position: activate to sort column ascending">Last Name</th><th class="sorting" tabindex="0" aria-controls="buttons_datatable" rowspan="1" colspan="1" style="width: 111.25px;" aria-label="Office: activate to sort column ascending">Projetcs</th><th class="sorting" tabindex="0" aria-controls="buttons_datatable" rowspan="1" colspan="1" style="width: 48.25px;" aria-label="Actions: activate to sort column ascending">Actions</th></tr>
						</thead>
						<tbody>
							
						${clients.map((client, index)=>{												  	
							return   `<tr role="row" class="odd">
									<td tabindex="0" class="sorting_1">${client.clients.firstname}</td>
									<td>${client.clients.lastname}</td>
									<td><a href="/users/client-projects/${client.clients._id}" class="mt-2 col-md-12  col-sm-12 col-12 btn-sm btn-green text-white">Projects</a></td>
									<td><div class="dropleft d-inline-block"><a href="#" class="btn btn-icon btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="lni-more-alt"></i></a><div class="dropdown-menu" x-placement="left-start" style="position: absolute; transform: translate3d(-184px, 0px, 0px); top: 0px; left: 0px; will-change: transform;"><a class="dropdown-item media align-items-center" href="mailto:${client.clients.email}"><i class="lni-envelope"></i><div class="media-body"><h6>Mail</h6><p class="text-muted fs-12">Mail User ${client.clients.email}</p></div></a><a class="dropdown-item media align-items-center" href="tel:+234${client.clients.phonenumber}"><i class="lni-phone"></i><div class="media-body"><h6>Call</h6><p class="text-muted fs-12">Call User on 234${client.clients.phonenumber}</p></div></a></div></td>
							</tr>`;
						})}
						</tbody>
					</table>
				</div>
			</div>
			<!-- /Default Datatable -->

		</div>`;
	 			body.insertAdjacentHTML('beforeend', html);
			}
			
			const loadDashboard=(response)=>{
				console.log(response);
				if (response.status === 401) {
					console.log(response);
					loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					let newArray= [];

					response.data.map((client)=>{
						 if (newArray.find((arr, index)=>{
							if (arr.clients._id === client.clients._id) {
								return arr
							}
						})) {
							//newArray.push(client)
						}else{
							newArray.push(client)
						}
					})
					clientDatabase(newArray);
				}
			}


			getRequest("users/client-database", token, "GET", loadDashboard)
	}
})