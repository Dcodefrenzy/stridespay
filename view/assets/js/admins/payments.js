define(function(require, exports, module){

	exports.adminUsersPaymentTransactions=(token, id)=>{	
	const {loading} = require("../loading");
	const {adminGetRequest} = require("../request");
	const {loginForm} = require("./sessionLogin");		
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");	
	spinner.className ="display-none";
	const {sideBar} = require("./sidebar");


			const paymentTransactions = (users, transactions)=>{
			sideBar(token, id);
		const html = `<div id="revert" class="dsh-content-wrapper col-12 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 col-xl-10 offset-xl-1">

			<!-- Breadcrumbs -->
			<div class="breadcrumb-wrapper d-flex align-items-start align-items-sm-center justify-content-between flex-column flex-sm-row">
				<div class="breadcrumb-wrapper--inner d-flex flex-column-reverse">
					<h1><i class="fa fa-users" aria-hidden="true"></i>Finalcial Transactions</h1>
					<ol class="breadcrumb style-1">
						<li class="breadcrumb-item"><a href="/admins/dashboard"">Dashboard</a></li>
						<li class="breadcrumb-item" aria-current="page">Finalcial Transactions</li>
					</ol>
				</div>
			</div>
			<!-- Default Datatable -->
			<div class="card">
				<div class="card-body">
					<div class="dsh-section-title">
						<h5 class="card-title">Finalcial Transactions</h5>
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
							<th class="sorting_asc" tabindex="0" aria-controls="buttons_datatable" rowspan="1" colspan="1" style="width: 141.25px;" aria-sort="ascending" aria-label="Name: activate to sort column descending">Payer</th>
							<th class="sorting" tabindex="0" aria-controls="buttons_datatable" rowspan="1" colspan="1" style="width: 235.25px;" aria-label="Position: activate to sort column ascending">Amount/Payment Status</th>
							<th class="sorting" tabindex="0" aria-controls="buttons_datatable" rowspan="1" colspan="1" style="width: 48.25px;" aria-label="Actions: activate to sort column ascending">Transaction Id/Date</th>
							</tr> 
						</thead>
						<tbody>
							
						${transactions.map((transaction, index)=>{	
							const payer = users.find((user)=>{
									if (transaction.createdBy === user._id) {
										return user;
									}
								})
							return   `<tr role="row" class="odd">
									<td tabindex="0" class="sorting_1">${payer.firstname} ${payer.lastname}</td>
									<td><p>${transaction.currency} ${transaction.price.toString().slice(0, -2)}</p> <p>Payment status: <b>${transaction.paymentStatus}</b></p></td>
									<td>${transaction.transaction} <p>Date: ${moment(transaction.dateCreated).format("L")}</p></td>
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
					paymentTransactions(response.users, response.payments);
				}
			}


			adminGetRequest("admins/dashboard", token, "GET", loadDashboard)
	}
})