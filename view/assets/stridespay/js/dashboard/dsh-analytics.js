$(document).ready(function() {
  'use strict';

  // Impressions
  var statsOneCtx = document.getElementById("dsh_statistics_ex_1"),
    statsOneConfig = {
      chart: {
        type: 'line',
        height: 100,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'smooth',
        lineCap: 'butt',
      },
      fill: {
        opacity: 1,
      },
      series: [{
        name: 'Impressions',
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor()
        ]
      }],
      labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ],
      colors: ['#4285F4'],
    }
  var statsOneChart = new ApexCharts(statsOneCtx, statsOneConfig);
  statsOneChart.render();

  // Sessions
  var statsTwoCtx = document.getElementById("dsh_statistics_ex_2"),
    statsTwoConfig = {
      colors: ['#1ec1b0'],
      series: [{
        name: 'Sessions',
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
        ]
      }],
      chart: {
        type: 'bar',
        height: 100,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          endingShape: 'rounded'
        }
      },
      labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ],
      tooltip: {
        fixed: {
          enabled: false
        },
        marker: {
          show: false
        }
      }
    };
  var statsTwoChart = new ApexCharts(statsTwoCtx, statsTwoConfig);
  statsTwoChart.render();

  //Bounce Rate
  var statsThreeCtx = document.getElementById("dsh_statistics_ex_3"),
    statsThreeConfig = {
      chart: {
        type: 'line',
        height: 100,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'smooth',
        lineCap: 'butt',
      },
      fill: {
        opacity: 1,
      },
      series: [{
        name: 'Bounce Rate',
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
        ]
      }],
      labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ],
      colors: ['#1ec1b0'],
    }
  var statsThreeChart = new ApexCharts(statsThreeCtx, statsThreeConfig);
  statsThreeChart.render();

  //Pageviews
  var statsFourCtx = document.getElementById("dsh_statistics_ex_4"),
    statsFourConfig = {
      chart: {
        type: 'line',
        height: 100,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'smooth',
        lineCap: 'butt',
      },
      fill: {
        opacity: 1,
      },
      series: [{
        name: 'Page Views',
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
        ]
      }],
      labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ],
      colors: ['#4285F4'],
    }
  var statsFourChart = new ApexCharts(statsFourCtx, statsFourConfig);
  statsFourChart.render();

  // Web statistics
  var webStatisticsCtx = document.getElementById('dsh_statistics_ex_5'),
    webStatisticsConfig = {
      chart: {
        fontFamily: 'Poppins, sans-serif',
        type: 'bar',
        height: 390,
        stacked: true,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false
          },
          columnWidth: '75%',
          endingShape: 'rounded'
        }
      },
      colors: ["#4285F4", '#F3F2FC'],
      series: [{
        name: "Sessions",
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
        ],
      }, {
        name: "Views",
        data: [
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
          DSHUtils.randomScalingFactor(),
        ],
      }],
      labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ],
      xaxis: {
        axisBorder: {
          show: true,
          color: "#bec7e0"
        },
        axisTicks: {
          show: true,
          color: "#bec7e0"
        }
      },
      tooltip: {
        shared: true,
        followCursor: true
      },

    }

  var webStatisticsChart = new ApexCharts(webStatisticsCtx, webStatisticsConfig);
  webStatisticsChart.render();

  // Sessions by device
  var doughnutCtx = document.getElementById("dsh_statistics_ex_7"),
  dougnutConfig = {
    colors: ['#4285F4', '#1ec1b0', '#fda600', '#ff737b', '#5a9ee0'],
    series: [58,41,72 ],
    chart: {
      fontFamily: 'Poppins, sans-serif',
      width: 250,
      type: 'donut',
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    labels: ["Desktop", "Tablet", "Mobile"],
  };
  var doughnutChart = new ApexCharts(doughnutCtx, dougnutConfig);
  doughnutChart.render();

});
