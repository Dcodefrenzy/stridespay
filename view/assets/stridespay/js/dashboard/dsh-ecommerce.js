$(document).ready(function() {
  'use strict';

  /*
    // this function will generate output in this format
    // data = [ [timestamp, 23], ... ]
  */
  function generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = baseval;
      var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  // Revenue Statistics
  var data = generateDayWiseTimeSeries( new Date('11 Feb 2020').getTime(), 185, {min: 9400,max: 10424}),
  mainRevenueStatsCtx = document.getElementById("dsh_statistics_ex_1"),
  mainRevenueStatsConfig = {
    series: [{
      name: 'Revenue',
      data: data
    }],
    chart: {
      fontFamily: 'Poppins, sans-serif',
      id: 'chart2',
      type: 'line',
      height: 230,
      toolbar: {
        autoSelected: 'pan',
        show: false
      }
    },
    colors: ['#4285F4'],
    stroke: {
      width: 3,
      curve: 'smooth',
      lineCap: 'butt',
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        show: true,
        color: "#bec7e0"
      },
      axisTicks: {
        show: true,
        color: "#bec7e0"
      }
    },
    yaxis: {
      labels: {
        formatter: function(value) {
          return DSHUtils.kFormatter(value.toFixed(2));
        }
      },
      tickAmount: 5
    }
  };
  var mainRevenueStatsChart = new ApexCharts(mainRevenueStatsCtx, mainRevenueStatsConfig);
  mainRevenueStatsChart.render();

  var filterRevenueStatsCtx = document.getElementById("dsh_statistics_ex_2"),
  filterRevenueStatsConfig = {
    series: [{
      data: data
    }],
    chart: {
      fontFamily: 'Poppins, sans-serif',
      id: 'chart1',
      height: 130,
      type: 'area',
      brush: {
        target: 'chart2',
        enabled: true
      },
      stroke: {
        curve: 'smooth',
        lineCap: 'butt',
      },
      selection: {
        enabled: true,
        xaxis: {
          min: new Date('19 Jun 2020').getTime(),
          max: new Date('14 Aug 2020').getTime(),
          axisBorder: {
            show: true,
            color: "#bec7e0"
          },
          axisTicks: {
            show: true,
            color: "#bec7e0"
          }
        }
      },
    },
    colors: ['#4285F4'],
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.91,
        opacityTo: 0.1,
      }
    },
    xaxis: {
      type: 'datetime',
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      show: false,
      tickAmount: 2
    }
  };
  var filterRevenueStatsChart = new ApexCharts(filterRevenueStatsCtx, filterRevenueStatsConfig);
  filterRevenueStatsChart.render();

  // Get max revenue from data array
  var maxRevenue = 0;
  data.map(function(d) {
    maxRevenue = Math.max(maxRevenue, d[1])
  }); // Get the max value from the data array, as mentioned above, the data format is [timestamp, 23]

  if (!isNaN(maxRevenue)) {
    $("#currentRevenue").text('$' + DSHUtils.kFormatter(maxRevenue.toFixed(2)));
  }

  // Get average revenue from data array
  var sum = 0,
    average = 0;
  for (var i = 0; i < data.length; i++) {
    sum += data[i][1]; // Get the sum of all values from the data array, as mentioned above, the data format is [timestamp, 23]
  }
  if (!isNaN(sum)) {
    average = sum / data.length;
    $("#averageRevenue").text('$' + DSHUtils.kFormatter(average.toFixed(2)));
  }

  // Order statistics
  var lineCtx = document.getElementById("dsh_statistics_ex_3"),
  lineConfig = {
    colors: ['#4285F4', '#1ec1b0', '#fda600', '#ff737b', '#5a9ee0'],
    series: [{
      name: "Orders",
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
      ]
    }],
    chart: {
      fontFamily: 'Poppins, sans-serif',
      height: 350,
      type: 'line',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'butt',
    },
    title: {
      show: false
    },
    grid: {
      row: {
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
  };
  var lineChart = new ApexCharts(lineCtx, lineConfig);
  lineChart.render();

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

  // Slider
  $(".dsh-slider").slick({
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: $('.dsh-slider-prev'),
    nextArrow: $('.dsh-slider-next'),
  });


});
