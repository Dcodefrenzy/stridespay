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
		const html = `<div id="revert" class="bg-background">
						<div class="container">
							<div id="loading"></div>
								<div class="row mt-2 p-3">
								<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
							<a href="/users/dashboard"><i class="fa fa-arrow-left text-dark"></i></div></a>
								</div>
							<div class="col-12 col-sm-12 col-md-9 offset-md-3 col-lg-9 offset-lg-3">
								<h1><i class="fa fa-users" aria-hidden="true"></i> Client Database</h1>
								<span>You can contact your clients and also exports them in a file.</span>
								<div  class="mt-5">
									<div class="row">
									<button class="btn btn-sm btn-primary" id="${token.token}" name="${id}" onclick="return getClientDatabasePDF(event, this.id, this.name)">Export to PDF  <i class="fa fa-file-export" aria-hidden="true"></i></button>
										<div class="col-12 col-sm-12 col-md-12">
											<table class="table thead-background mt-5">
												  <thead class="thead-background">
												    <tr>
												      <th scope="col">#</th>
												      <th scope="col">First</th>
												      <th scope="col">Last</th>
												      <th scope="col">Contact</th>
												      <th scope="col">Projects</th>
												    </tr>
												  </thead>
												  <tbody>
												  ${clients.map((client, index)=>{
												  	
										return   `<tr>
												      <th scope="row">${index + 1}</th>
												      <td>${client.clients.firstname}</td>
												      <td>${client.clients.lastname}</td>
												      <td>	<a href="mailto:${client.clients.email}"><button class="btn btn-sm btn-success">Mail ${client.clients.firstname} <i class="fa fa-envelope" aria-hidden="true"></i></button></a>
												      		<a href="tel:+234${client.clients.phone}"><button class="btn btn-sm btn-danger">Call ${client.clients.firstname} <i class="fa fa-phone" aria-hidden="true"></i></button></a>
												      	</td>
												      <td>	
												      		<a href="/users/client-projects/${client.clients._id}"><button class="btn btn-sm btn-success">Projects</button></a>
												      	</td>
												    </tr>`

												  })}
												  </tbody>
												</table>
										<div>
									</div>
								</div>
							</div>
						</div>
					</div>
				 </div>`;
	 			body.insertAdjacentHTML('beforeend', html);
			}
			
			const loadDashboard=(response)=>{
				
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