define(function(require, exports, module) {
	exports.getProjectBarChart = (token,  link, year)=>{
			const {getRequest} = require("request");
			const {loading} = require("../../loading");
			const {loginForm} = require("../../logins");
			const {copyText} = require("../../copyText");
			const {sideBar} = require("../sidebar");
			const body = document.getElementById("body");
			const spinner = document.getElementById("spinner");
			spinner.className ="display-none";
		
			const showChart = (data)=>{
				require(["https://www.gstatic.com/charts/loader.js"], function() {
					//const year = new Date().getFullYear();
					const presentMonth = new Date().getMonth();





						const getValue = (month)=>{
							const value =  data.transactions.filter(transaction=>{
								if (new Date(transaction.dateCreated).getMonth() === month && new Date(transaction.dateCreated).getFullYear() === year) {
									
									return transaction;
								}
							})
							return value
						}

						const janTrans = getValue(0).length;
						const febTrans = getValue(1).length;
						const marTrans = getValue(2).length;
						const aprTrans = getValue(3).length;
						const mayTrans = getValue(4).length;
						const junTrans = getValue(5).length;
						const julTrans = getValue(6).length;
						const augTrans = getValue(7).length;
						const septTrans = getValue(8).length;
						const octTrans = getValue(9).length;
						const novTrans = getValue(10).length;
						const decTrans = getValue(11).length;



						google.charts.load("current", {packages:["corechart"]});
						google.charts.setOnLoadCallback(drawChart);
						//google.charts.setOnLoadCallback(drawPieChart);

					


						function drawChart() {
				      var data = google.visualization.arrayToDataTable([
						        ["Element", "Density", { role: "style" } ],
						        ["Jan", janTrans, "blue"],
						        ["Feb", febTrans, "silver"],
						        ["Mar", marTrans, "gold"],
						        ["Apr", aprTrans, "silver"],
						        ["May", mayTrans, "blue"],
						        ["Jun", junTrans, "silver"],
						        ["Jul", julTrans, "gold"],
						        ["Aug", augTrans, "blue"],
						        ["Sep", septTrans, "silver"],
						        ["Oct", octTrans, "gold"],
						        ["Nov", novTrans, "blue"],
						        ["Dec", decTrans, "silver"],
						      ]);

						      var view = new google.visualization.DataView(data);
						      view.setColumns([0, 1,
						                       { calc: "stringify",
						                         sourceColumn: 1,
						                         type: "string",
						                         role: "annotation" },
						                       2]);

						      var options = {
						        title: `Annual Project analysis for ${year}`,
						        width: "100%",
						        height: "100%",
						        bar: {groupWidth: "100%"},
						        legend: { position: "none" },
						      };

							var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
							chart.draw(data, options);
					}


					/*	const getValueForWithdraw = (month)=>{
							const value =  data.withdraws.filter(withdraw=>{
								if (new Date(withdraw.dateCreated).getMonth() === month && new Date(withdraw.dateCreated).getFullYear() === year) {
									return withdraw
								}
							}).map((withdraw)=>withdraw.amount).reduce((a, b) => a + b, 0);
							return value
						}

						const janWithdraw = getValueForWithdraw(0)
						const febWithdraw = getValueForWithdraw(1)
						const marWithdraw = getValueForWithdraw(2)
						const aprWithdraw = getValueForWithdraw(3)
						const mayWithdraw = getValueForWithdraw(4)
						const junWithdraw = getValueForWithdraw(5)
						const julWithdraw = getValueForWithdraw(6)
						const augWithdraw = getValueForWithdraw(7)
						const septWithdraw = getValueForWithdraw(8)
						const octWithdraw = getValueForWithdraw(9)
						const novWithdraw =  getValueForWithdraw(10)
						const decWithdraw =  getValueForWithdraw(11)*/
						      // Callback that draws the pie chart for Sarah's pizza.
						     /* function drawPieChart() {

						        // Create the data table for Sarah's pizza.
						        var data = new google.visualization.DataTable();
						        data.addColumn('string', 'Topping');
						        data.addColumn('number', 'Slices');
						        data.addRows([
						        ["Jan", janWithdraw],
						        ["Feb", febWithdraw],
						        ["Mar", marWithdraw],
						        ["Apr", aprWithdraw],
						        ["May", mayWithdraw],
						        ["Jun", junWithdraw],
						        ["Jul", julWithdraw],
						        ["Aug", augWithdraw],
						        ["Sep", septWithdraw],
						        ["Oct", octWithdraw],
						        ["Nov", novWithdraw],
						        ["Dec", decWithdraw],
						        ]);

						        // Set options for Sarah's pie chart.
						        var options = {title:`Annual withdrawal analysis for ${year}`,
						                       width:"100%",
						                       height:"100%"};

						        // Instantiate and draw the chart for Sarah's pizza.
						        var chart = new google.visualization.PieChart(document.getElementById('pie-chart'));
						        chart.draw(data, options);
						      }*/
					
			});
			}
				const loadDashboard=(response)=>{
				
				if (response.status === 401) {
					console.log(response);
					loading("user-side-bar-open", "display-none");
					 body.insertAdjacentHTML('afterbegin', loginForm);
				}else if (response.status === 200) {
					console.log(response);
					showChart(response);
				}
			}


			getRequest(link, token, "GET", loadDashboard)

	}
});