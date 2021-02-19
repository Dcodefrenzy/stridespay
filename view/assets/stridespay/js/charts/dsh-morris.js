$(document).ready(function() {
  'use strict';

  // Line chart
  var lineChart = new Morris.Line({
    element: 'dsh_chart_ex_line',
    lineColors: ['#4285F4', '#1ec1b0', '#fda600', '#ff737b', '#5a9ee0'],
    data: [
      { year: '2019', value: DSHUtils.randomScalingFactor() },
      { year: '2020', value: DSHUtils.randomScalingFactor() },
      { year: '2021', value: DSHUtils.randomScalingFactor() },
      { year: '2022', value: DSHUtils.randomScalingFactor() },
      { year: '2023', value: DSHUtils.randomScalingFactor() }
    ],
    xkey: 'year',
    ykeys: ['value'],
    labels: ['Value']
  });

  // Bar Chart
  var barChart = new Morris.Bar({
    element: 'dsh_chart_ex_bar',
    barColors: ['#ff737b', '#1ec1b0', '#fda600', '#ff737b', '#5a9ee0'],
    data: [
      { y: '2019', a: DSHUtils.randomScalingFactor(), b: DSHUtils.randomScalingFactor() },
      { y: '2020', a: DSHUtils.randomScalingFactor(),  b: DSHUtils.randomScalingFactor() },
      { y: '2021', a: DSHUtils.randomScalingFactor(),  b: DSHUtils.randomScalingFactor() },
      { y: '2022', a: DSHUtils.randomScalingFactor(),  b: DSHUtils.randomScalingFactor() },
      { y: '2023', a: DSHUtils.randomScalingFactor(),  b: DSHUtils.randomScalingFactor() },
      { y: '2024', a: DSHUtils.randomScalingFactor(),  b: DSHUtils.randomScalingFactor() },
      { y: '2025', a: DSHUtils.randomScalingFactor(), b: DSHUtils.randomScalingFactor() }
    ],
    xkey: 'y',
    ykeys: ['a', 'b'],
    labels: ['Series A', 'Series B']
  });

  //Doughnut Chart
  var doughnutChart = new Morris.Donut({
    element: 'dsh_chart_ex_doughnut',
    colors: ['#4285F4', '#5a9ee0', '#ff737b', '#ff737b', '#5a9ee0'],
    data: [
      {label: "Download Sales", value: DSHUtils.randomScalingFactor()},
      {label: "In-Store Sales", value: DSHUtils.randomScalingFactor()},
      {label: "Mail-Order Sales", value: DSHUtils.randomScalingFactor()}
    ]
  });

  //Stacked Bar
  var stackedBarChart = new Morris.Bar({
    element: 'dsh_chart_ex_stacked',
    barColors: ['#4285F4', '#1ec1b0', '#fda600', '#ff737b', '#5a9ee0'],
    data: [
      {x: '2019 Q1', y: 3, z: 2, a: 3},
      {x: '2019 Q2', y: 2, z: null, a: 1},
      {x: '2019 Q3', y: 0, z: 2, a: 4},
      {x: '2019 Q4', y: 2, z: 4, a: 3}
    ],
    xkey: 'x',
    ykeys: ['y', 'z', 'a'],
    labels: ['Y', 'Z', 'A'],
    stacked: true
  });

  //Updating Chart
  var nReloads = 0;
  function data(offset) {
    var ret = [];
    for (var x = 0; x <= 360; x += 10) {
      var v = (offset + x) % 360;
      ret.push({
        x: x,
        y: Math.sin(Math.PI * v / 180).toFixed(4),
        z: Math.cos(Math.PI * v / 180).toFixed(4)
      });
    }
    return ret;
  }
  var realtimeChart = new Morris.Line({
    element: 'dsh_chart_ex_realtime',
    lineColors: ['#5a9ee0', '#1ec1b0', '#fda600', '#ff737b', '#5a9ee0'],
    data: data(0),
    xkey: 'x',
    ykeys: ['y', 'z'],
    labels: ['data1', 'data2'],
    parseTime: false,
    ymin: -1.0,
    ymax: 1.0,
    hideHover: true
  });
  function update() {
    nReloads++;
    realtimeChart.setData(data(5 * nReloads));
  }
  setInterval(update, 500);

  //Area Chart
  var areaChart = new Morris.Area({
    element: 'dsh_chart_ex_area',
    lineColors: ['#4285F4', '#1ec1b0', '#fda600', '#ff737b', '#5a9ee0'],
    data: [
      { y: '2006', a: DSHUtils.randomScalingFactor(), b: DSHUtils.randomScalingFactor() },
      { y: '2007', a: DSHUtils.randomScalingFactor(),  b: DSHUtils.randomScalingFactor() },
      { y: '2008', a: DSHUtils.randomScalingFactor(),  b: DSHUtils.randomScalingFactor() },
      { y: '2009', a: DSHUtils.randomScalingFactor(),  b: DSHUtils.randomScalingFactor() },
      { y: '2010', a: DSHUtils.randomScalingFactor(),  b: DSHUtils.randomScalingFactor() },
      { y: '2011', a: DSHUtils.randomScalingFactor(),  b: DSHUtils.randomScalingFactor() },
      { y: '2012', a: DSHUtils.randomScalingFactor(), b: DSHUtils.randomScalingFactor() }
    ],
    xkey: 'y',
    ykeys: ['a', 'b'],
    labels: ['Series A', 'Series B']
  });

  $(window).resize(function() {
    lineChart.redraw();
    barChart.redraw();
    doughnutChart.redraw();
    realtimeChart.redraw();
    realtimeChart.redraw();
    areaChart.redraw();
  });

});
