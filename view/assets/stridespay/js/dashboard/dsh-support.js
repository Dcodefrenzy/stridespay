$(document).ready(function() {
  'use strict';

  var solvedUnsolvedCtx = document.getElementById("dsh_support_ex_1"),
  solvedUnsolvedConfig = {
    series: [{
        name: "Unsolved Tickets",
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
      },
      {
        name: "Solved Tickets",
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
      }
    ],
    chart: {
      fontFamily: 'Poppins, sans-serif',
      height: 310,
      type: 'line',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 3,
      curve: 'smooth',
      lineCap: 'butt',
    },
    legend: {
      tooltipHoverFormatter: function(val, opts) {
        return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
      }
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan', '10 Jan', '11 Jan', '12 Jan' ],
    },
  };

  var solvedUnsolvedChart = new ApexCharts(solvedUnsolvedCtx, solvedUnsolvedConfig);
  solvedUnsolvedChart.render();

  var options = {
    colors: ['#1ec1b0', '#5a9ee0', '#ff737b'],
    series: [
      DSHUtils.randomScalingFactor(),
      DSHUtils.randomScalingFactor(),
      DSHUtils.randomScalingFactor(),
    ],
    chart: {
      type: 'donut',
      fontFamily: 'Poppins, sans-serif',
      height: 250,
    },
    labels: ['Satisfied', 'Moderate', 'Dissatisfied'],
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  var chart = new ApexCharts(document.querySelector("#dsh_support_ex_2"), options);
  chart.render();

  // World map
  $("#dsh_worldmap_ex_1").vectorMap({
    map: "world_mill",
    scaleColors: ["#eff0f1", "#eff0f1"],
    normalizeFunction: "polynomial",
    hoverOpacity: .7,
    hoverColor: false,
    regionStyle: {
      initial: {
        fill: "#eaf0f7"
      }
    },
    markerStyle: {
      initial: {
        stroke: "transparent",
        'font-family': 'Poppins, sans-serif',
        'font-size': 12,
      },
      hover: {
        stroke: "rgba(112, 112, 112, 0.30)"
      }
    },
    markerLabelStyle: {
      'font-family': 'Poppins, sans-serif',
      'font-size': 12,
    },
    backgroundColor: "transparent",
    markers: [{
      latLng: [35.8617, 104.1954],
      name: "China",
      style: {
        fill: "#ff737b"
      }
    }, {
      latLng: [20.5937, 78.9629],
      name: "India",
      style: {
        fill: "#fda600"
      }
    }, {
      latLng: [61.5240, 105.3188],
      name: "Russia",
      style: {
        fill: "#5a9ee0"
      }
    }, {
      latLng: [-23.53377, -46.62529],
      name: "Brazil",
      style: {
        fill: "#1ec1b0"
      }
    }]
  });

});
