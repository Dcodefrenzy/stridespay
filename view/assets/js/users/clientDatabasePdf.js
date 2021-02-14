define(function(require, exports, module){

	return getClientDatabasePDF = (event, token, id)=>{	
		console.log(token)
		const {loading} = require("../loading");
	const {getRequest} = require("../request");
	const {loginForm} = require("../logins");		
	const body = document.getElementById("body");
	const spinner = document.getElementById("spinner");	
	spinner.className ="display-none";
	const {sideBar} = require("./sidebar");
		const clientDatabase = (clients)=>{
			require(["../../../jspdf.debug/jspdf.debug.js"], function(jsPDF) {


						   var  cellWidth = 50,
						        rowCount = 0,
						        cellContents,
						        leftMargin = 2,
						        topMargin = 12,
						        topMarginTable = 55,
						        headerRowHeight = 20,
						        rowHeight = 20,
				         l = {
						         orientation: 'l',
						         unit: 'mm',
						         format: 'a3',
						         compress: true,
						         fontSize: 8,
						         lineHeight: 1,
						         autoSize: false,
						         printHeaders: true
						     };

				
				var doc = new jsPDF(l, '', '', '');

				    doc.cellInitialize();  
				    /*doc.table(20, 100, [])*/

            var columns = [{'id':'ID','firstname':'Firstname','lastname':'Lastname', 'email':'Email','phone':'phone Number'}];
            	columns.map((colum)=>{
	                doc.margins = 1;
	                doc.setFont("helvetica");
	                doc.setFontType("bold");
	                doc.setFontSize(12);
	                doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, colum.id, 'i');
	                doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, colum.firstname, 'i');
	                doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, colum.lastname, 'i');
	                doc.cell(leftMargin, topMargin, 100, headerRowHeight, colum.email, 'i');
	                doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, colum.phone, 'i');           	
            	});
            	doc.text(20, 30, '\n');
				clients.map((client, index)=>{
	                doc.margins = 1;
	                doc.setFont("helvetica");
	                doc.setFontSize(9);
					const count = index + 1;
					doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, count.toString(), 'i')
					doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, client.clients.firstname, 'i')
					doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, client.clients.lastname, 'i')
					doc.cell(leftMargin, topMargin, 100, headerRowHeight, client.clients.email, 'i')
					doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, "0"+client.clients.phonenumber.toString(), 'i')

				})
			   		doc.save("table.pdf");

				
			});
		}

			const loadDashboard=(response)=>{
				console.log(response);
				if (response.status === 401) {
					
					loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					clientDatabase(response.data);
				}
			}


			getRequest("users/client-database", {token:token, _id:""}, "GET", loadDashboard)
	 }


})