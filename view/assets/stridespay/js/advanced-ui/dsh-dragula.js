$(document).ready(function() {
  'use strict';

  // Basic Usage
  dragula([document.getElementById('dsh_drag_ex_1_left'), document.getElementById('dsh_drag_ex_1_right')]);

  // Copy
  dragula([document.getElementById('dsh_drag_ex_2_copy_left'), document.getElementById('dsh_drag_ex_2_copy_right')], {
    copy: true,
  });

  // Sortable List
  dragula([document.getElementById('dsh_drag_ex_3')]);

});
