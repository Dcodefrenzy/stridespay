define(function(require, exports, module){

	exports.showUserWithdraw =(token, id)=>{	
	const {loading} = require("../loading");
	const {adminGetRequest} = require("../request");
	const {loginForm} = require("./sessionLogin");		
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");	
	spinner.className ="display-none";
	const {sideBar} = require("./sidebar");


			const userWithdraw = (users, withdraws)=>{
			sideBar(token, id);
		const html = `<div id="revert" class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

			<!-- Breadcrumbs -->
			<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
				<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					<h1><i class="fa fa-users" aria-hidden="true"></i> Users Database</h1>
					<ol class="breadcrumb style-1">
						<li class="breadcrumb-item"><a href="/admins/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item" aria-current="page">Users</li>
					</ol>
				</div>
			</div>
			<!-- Default Datatable -->
			<div class="card">
				<div class="card-body">
					<div class="dsh-section-title">
						<h5 class="card-title">Users</h5>
					</div>
					<div id="buttons_datatable_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
						<!-- 
						<div class="row">
						<div class="col-sm-12 text-right"><div class="dt-buttons btn-group flex-wrap"> 
						     
						<button class="btn buttons-print btn-primary" tabindex="0" aria-controls="buttons_datatable" type="button"><span>Print</span></button> <button class="btn buttons-excel buttons-html5 btn-primary" tabindex="0" aria-controls="buttons_datatable" type="button"><span>Excel</span></button> <button class="btn buttons-csv buttons-html5 btn-primary" tabindex="0" aria-controls="buttons_datatable" type="button"><span>CSV</span></button> 									
						<button class="btn btn-sm btn-primary" id="${token.token}" name="${id}" onclick="return getClientDatabasePDF(event, this.id, this.name)">PDF </button></div></div></div><div class="row"><div class="col-sm-12">
						</div>
						</div>
						-->
						<table id="buttons_datatable" class="table table-bordered dataTable no-footer dtr-inline" role="grid" aria-describedby="buttons_datatable_info" style="width: 1036px;">
						<thead>
							<tr role="row">
							<th class="sorting_asc" tabindex="0" aria-controls="buttons_datatable" rowspan="1" colspan="1" style="width: 141.25px;" aria-sort="ascending" aria-label="Name: activate to sort column descending">Name</th>
							<th class="sorting" tabindex="0" aria-controls="buttons_datatable" rowspan="1" colspan="1" style="width: 235.25px;" aria-label="Position: activate to sort column ascending">Amount/Recipient</th>
							<th class="sorting" tabindex="0" aria-controls="buttons_datatable" rowspan="1" colspan="1" style="width: 235.25px;" aria-label="Position: activate to sort column ascending">Reference/TransferId</th>
							</tr> 
						</thead>
						<tbody>
							
						${withdraws.map((withdraw, index)=>{

							const user = users.find((user)=>{
									if (withdraw.user === user._id) {
										return user;
									}
								})												  	
							return   `<tr role="row" class="odd">
									<td tabindex="0" class="sorting_1">${user.firstname} ${user.lastname}</td>
									<td><p>${withdraw.currency} ${withdraw.amount}</p> <p>Recipient: <b>${withdraw.recipient}</b></p><p>Date: ${moment(withdraw.dateCreated).format("L")} </p></td>
									<td><p>Reference: ${withdraw.reference}</p><p>Transfer Id: ${withdraw.transferId}</p></td>
									
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
					userWithdraw(response.users, response.withdraws);
				}
			}


			adminGetRequest("admins/dashboard", token, "GET", loadDashboard)
	}
})