
$(document).ready(function() {
  'use strict';

  function updateOutput(e){
    var list   = e.length ? e : $(e.target),
    output = list.data('output');

    if (window.JSON) {
        output.val(window.JSON.stringify(list.nestable('serialize')));
    } else {
        output.val('JSON browser support required for this demo.');
    }
  }

  // Default nestable list
  $('#dsh_nestable_list_ex_1').nestable({
    maxDepth: 10,
    group: 1
  }).on('change', updateOutput);

  // Nestable list with handle
  $('#dsh_nestable_list_ex_2').nestable({
    maxDepth: 10,
    group: 1
  }).on('change', updateOutput);

  updateOutput($('#dsh_nestable_list_ex_1').data('output', $('#nestable-output')));
  updateOutput($('#dsh_nestable_list_ex_2').data('output', $('#nestable2-output')));


});
