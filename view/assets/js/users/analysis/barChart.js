define(function(require, exports, module) {
	exports.getBarChart = (token,  link, year)=>{
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
						console.log(year)
						const getTotalTransaction = (dummyData)=>{
								const value = data.transactions.map((trans)=>{
								const price = trans.price * 3/100;
									if (price > 300000) {
										return deduction = trans.price - 3000;
									}else if (price < 300000) {
										return deduction = trans.price  - price;	
									}
							}).reduce((a, b) => a + b, 0);
								return value.toString().slice(0, -2);
						}
						const transactionValue = getTotalTransaction("transactions")
						const transactionId = document.getElementById('total-financies');
						transactionId.innerHTML = transactionValue;




						const getTotalWithdrawal = (dummyData)=>{
								const value = data.withdraws.map((withdraw)=>{
									return withdraw.amount
							}).reduce((a, b) => a + b, 0);
								return value;
						}
						const withdrawalValue = getTotalWithdrawal("withdrawal")
						const withdrawalId = document.getElementById('total-withdrawal');
						withdrawalId.innerHTML =  withdrawalValue;



						const getTotalWallet = (dummyData)=>{
								const value = data.wallets.map((wallet)=>{
									return wallet.amount
							}).reduce((a, b) => a + b, 0);
								return value.toString().slice(0, -2);
						}
						const walletValue = getTotalWallet("wallet")
						const walletId = document.getElementById('total-wallet');
						walletId.innerHTML = parseInt(walletValue);




						const getValue = (month)=>{
							const value =  data.transactions.filter(transaction=>{
								if (new Date(transaction.dateCreated).getMonth() === month && new Date(transaction.dateCreated).getFullYear() === year) {
									
									return transaction;
								}
							}).map((trans)=>{
								const price = trans.price * 3/100;
									if (price > 300000) {
										return deduction = trans.price - 3000;
									}else if (price < 300000) {
										return deduction = trans.price  - price;	
									}
							}).reduce((a, b) => a + b, 0);
							return value
						}

						const janTrans = getValue(0).toString().slice(0, -2)
						const febTrans = getValue(1).toString().slice(0, -2)
						const marTrans = getValue(2).toString().slice(0, -2)
						const aprTrans = getValue(3).toString().slice(0, -2)
						const mayTrans = getValue(4).toString().slice(0, -2)
						const junTrans = getValue(5).toString().slice(0, -2)
						const julTrans = getValue(6).toString().slice(0, -2)
						const augTrans = getValue(7).toString().slice(0, -2)
						const septTrans = getValue(8).toString().slice(0, -2)
						const octTrans = getValue(9).toString().slice(0, -2)
						const novTrans = getValue(10).toString().slice(0, -2)
						const decTrans = getValue(11).toString().slice(0, -2)



						google.charts.load("current", {packages:["corechart"]});
						google.charts.setOnLoadCallback(drawChart);
						google.charts.setOnLoadCallback(drawPieChart);

					


						function drawChart() {
				      var data = google.visualization.arrayToDataTable([
						        ["Element", "Density", { role: "style" } ],
						        ["Jan", parseInt(janTrans), "blue"],
						        ["Feb", parseInt(febTrans), "silver"],
						        ["Mar", parseInt(marTrans), "gold"],
						        ["Apr", parseInt(aprTrans), "silver"],
						        ["May", parseInt(mayTrans), "blue"],
						        ["Jun", parseInt(junTrans), "silver"],
						        ["Jul", parseInt(julTrans), "gold"],
						        ["Aug", parseInt(augTrans), "blue"],
						        ["Sep", parseInt(septTrans), "silver"],
						        ["Oct", parseInt(octTrans), "gold"],
						        ["Nov", parseInt(novTrans), "blue"],
						        ["Dec", parseInt(decTrans), "silver"],
						      ]);

						      var view = new google.visualization.DataView(data);
						      view.setColumns([0, 1,
						                       { calc: "stringify",
						                         sourceColumn: 1,
						                         type: "string",
						                         role: "annotation" },
						                       2]);

						      var options = {
						        title: `Annual financial analysis for ${year}`,
						        width: "100%",
						        height: "100%",
						        bar: {groupWidth: "100%"},
						        legend: { position: "none" },
						      };

							var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
							chart.draw(data, options);
					}


						const getValueForWithdraw = (month)=>{
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
						const decWithdraw =  getValueForWithdraw(11)
						      // Callback that draws the pie chart for Sarah's pizza.
						      function drawPieChart() {

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
						      }

					
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