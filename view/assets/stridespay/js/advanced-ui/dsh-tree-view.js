$(document).ready(function() {
  'use strict';

  // html demo
  $('#dsh_jstree_ex_1').jstree();

  // JS Data demo
  $('#dsh_jstree_ex_2').jstree({
    'core' : {
      'data' : [
        {
          "text" : "Root node",
          "icon" : "lni-folder",
          "state" : { "opened" : true },
          "children" : [
            {
              "text" : "Child file 1",
              "icon" : "lni-empty-file",
            },
            {
              "text" : "Child node 1",
              "icon" : "lni-folder",
              "children" : [
                {
                  "text" : "Child file 1",
                  "icon" : "lni-empty-file",
                },
                {
                  "text" : "Child file 3",
                  "icon" : "lni-empty-file",
                }
            ]}
        ]},
        {
          "text" : "Root File 1",
          "icon" : "lni-empty-file",
        },
        {
          "text" : "Root File 2",
          "icon" : "lni-empty-file",
        },
        {
          "text" : "Root Node 2",
          "icon" : "lni-folder",
          "children" : [{
            "text" : "Child file 1",
            "icon" : "lni-empty-file",
          }]
        }
      ]
    }
  });

  // Checkbox
  $('#dsh_jstree_ex_3').jstree({
    "checkbox" : {
      "keep_selected_style" : false
    },
    "plugins" : [ "checkbox" ]
  });

  // Drag and Drop
  $('#dsh_jstree_ex_4').jstree({
    "core" : {
      "check_callback" : true
    },
    "plugins" : [ "dnd" ]
  });

  // Search
  $("#dsh_jstree_ex_5").jstree({
    "plugins" : [ "search" ]
  });
  var to = false;
  $('#dsh_jstree_ex_5_search').keyup(function () {
    if(to) { clearTimeout(to); }
    to = setTimeout(function () {
      var v = $('#dsh_jstree_ex_5_search').val();
      $('#dsh_jstree_ex_5').jstree(true).search(v);
    }, 250);
  });

});
