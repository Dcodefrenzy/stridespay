// Map vectors can be found at http://jvectormap.com/maps/world/africa/
$(document).ready(function() {
  'use strict';

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

  // Europe
  $("#dsh_worldmap_ex_2").vectorMap({
    map: "europe_mill",
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
  });

  // India
  $("#dsh_worldmap_ex_3").vectorMap({
    map: "in_mill",
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
  });

  // Germany
  $("#dsh_worldmap_ex_4").vectorMap({
    map: "de_mill",
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
  });

});
