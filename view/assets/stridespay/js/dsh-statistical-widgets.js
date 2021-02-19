$(document).ready(function() {
  'use strict';

  // Statistics Charts 1
  var statsOneCtx = document.getElementById("dsh_statistics_ex_1"),
  statsOneConfig = {
    chart: {
      fontFamily: 'Poppins, sans-serif',
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
      name: 'Sales',
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
    colors: ['#4285F4'],
  }
  var statsOneChart = new ApexCharts(statsOneCtx, statsOneConfig);
  statsOneChart.render();

  //Statistics Chart 2
  var statsTwoCtx = document.getElementById("dsh_statistics_ex_2"),
  statsTwoConfig = {
    colors: ['#fda600'],
    series: [{
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
        DSHUtils.randomScalingFactor()
      ]
    }],
    chart: {
      fontFamily: 'Poppins, sans-serif',
      type: 'bar',
      height: 100,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '80%'
      }
    },
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    xaxis: {
      crosshairs: {
        width: 1
      },
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return ''
          }
        }
      },
      marker: {
        show: false
      }
    }
  };

  var statsTwoChart = new ApexCharts(statsTwoCtx, statsTwoConfig);
  statsTwoChart.render();

  //Statistics Chart 3
  var statsThreeCtx = document.getElementById("dsh_statistics_ex_3"),
  statsThreeConfig = {
    colors: ['#ff737b'],
    chart: {
      fontFamily: 'Poppins, sans-serif',
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
      name: 'Sales',
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
  }
  var statsThreeChart = new ApexCharts(statsThreeCtx, statsThreeConfig);
  statsThreeChart.render();

  //Statistics Chart 4
  var statsFourCtx = document.getElementById("dsh_statistics_ex_4"),
  statsFourConfig = {
    colors: ['#1ec1b0'],
    series: [{
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
        DSHUtils.randomScalingFactor()
      ]
    }],
    chart: {
      fontFamily: 'Poppins, sans-serif',
      type: 'bar',
      height: 100,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '80%'
      }
    },
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    xaxis: {
      crosshairs: {
        width: 1
      },
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return ''
          }
        }
      },
      marker: {
        show: false
      }
    }
  };
  var statsFourChart = new ApexCharts(statsFourCtx, statsFourConfig);
  statsFourChart.render();
  
});
