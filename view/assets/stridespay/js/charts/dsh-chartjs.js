$(document).ready(function() {
  'use strict';

  //Line Chart
  var lineCtx = document.getElementById('dsh_chart_ex_line').getContext('2d'),
  lineConfig = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First dataset',
        backgroundColor: '#ff737b',
        borderColor: '#ff737b',
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor()
        ],
        fill: false,
      }, {
        label: 'My Second dataset',
        fill: false,
        backgroundColor: '#fda600',
        borderColor: '#fda600',
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor()
        ],
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
    }
  };
  new Chart(lineCtx, lineConfig);


  //Pie Chart
  var pieCtx = document.getElementById("dsh_chart_ex_pie"),
  pieConfig = {
    type: 'pie',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [{
        backgroundColor: ["#1ec1b0", "#fda600","#ff737b","#5a9ee0","#aa66cc"],
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
        ]
      }]
    },
    options: {
      title: {
        display: false,
      }
    }
  };
  new Chart(pieCtx, pieConfig);

  //Polar Chart
  var polarCtx = document.getElementById("dsh_chart_ex_polar"),
  polarConfig = {
    type: 'polarArea',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#1ec1b0", "#fda600","#ff737b","#5a9ee0","#aa66cc"],
          data: [
            DSHUtils.randomScalingFactor(),
            DSHUtils.randomScalingFactor(),
            DSHUtils.randomScalingFactor(),
            DSHUtils.randomScalingFactor(),
            DSHUtils.randomScalingFactor(),
          ]
        }
      ]
    },
    options: {
      title: {
        display: false,
      }
    }
  };
  new Chart(polarCtx, polarConfig);

  //Doughnut Chart
  var doughnutCtx = document.getElementById("dsh_chart_ex_doughnut"),
  doughnutConfig = {
    type: 'doughnut',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          backgroundColor: ["#1ec1b0", "#fda600","#ff737b","#5a9ee0","#aa66cc"],
          data: [
            DSHUtils.randomScalingFactor(),
            DSHUtils.randomScalingFactor(),
            DSHUtils.randomScalingFactor(),
            DSHUtils.randomScalingFactor(),
            DSHUtils.randomScalingFactor(),
          ]
        }
      ]
    },
    options: {
      title: {
        display: false,
      }
    }
  };
  new Chart(doughnutCtx, doughnutConfig);

  //bar chart
  var barCtx = document.getElementById("dsh_chart_ex_bar"),
  barConfig = {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            backgroundColor: ["#1ec1b0", "#fda600","#ff737b","#5a9ee0","#aa66cc"],
            data: [
              DSHUtils.randomScalingFactor(),
              DSHUtils.randomScalingFactor(),
              DSHUtils.randomScalingFactor(),
              DSHUtils.randomScalingFactor(),
              DSHUtils.randomScalingFactor(),
            ]
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
        }
      }
  };
  new Chart(barCtx, barConfig);

  // Radar Chart
  var radarCtx = document.getElementById('dsh_chart_ex_radar'),
  radarConfig = {
    type: 'radar',
    data: {
      labels: [['Eating', 'Dinner'], ['Drinking', 'Water'], 'Sleeping', ['Designing', 'Graphics'], 'Coding', 'Cycling', 'Running'],
      datasets: [{
        label: 'My First dataset',
        backgroundColor: "rgba(26, 176, 243, .3)",
        borderColor: "#4285F4",
        pointBackgroundColor: "#4285F4",
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor()
        ]
      }, {
        label: 'My Second dataset',
        backgroundColor: "rgba(141, 49, 251, .3)",
        borderColor: "#aa66cc",
        pointBackgroundColor: "#aa66cc",
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor()
        ]
      }]
    },
    options: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Radar Chart'
      },
      scale: {
        ticks: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(radarCtx, radarConfig);

  // Stacked Bar Chart
  var stackedBarCtx = document.getElementById('dsh_chart_ex_stacked_bar').getContext('2d'),
  stackedBarConfig = {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: '#1ec1b0',
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor()
        ]
      }, {
        label: 'Dataset 2',
        backgroundColor: '#ff737b',
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor()
        ]
      }, {
        label: 'Dataset 3',
        backgroundColor: '#aa66cc',
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor()
        ]
      }]

    },
    options: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
    }
  };
  new Chart(stackedBarCtx, stackedBarConfig);

  // Combo Line Bar Chart
  var comboCtx = document.getElementById('dsh_chart_ex_bar_line').getContext('2d'),
  comboConfig = {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        type: 'line',
        label: 'Dataset 1',
        borderColor: '#1ec1b0',
        borderWidth: 2,
        fill: false,
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor()
        ]
      }, {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: '#ff737b',
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor()
        ],
      }, {
        type: 'bar',
        label: 'Dataset 3',
        backgroundColor: '#4285F4',
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor()
        ]
      }]

    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Combo Bar Line Chart'
      },
      tooltips: {
        mode: 'index',
        intersect: true
      }
    }
  };
  new Chart(comboCtx, comboConfig);

});
