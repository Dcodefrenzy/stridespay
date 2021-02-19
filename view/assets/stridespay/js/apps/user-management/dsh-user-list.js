$(document).ready(function() {
  'use strict';

  var table = $('#user_list_datatable').DataTable({
    responsive: true,
    order: [[1, 'desc']],
    dom:"<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>\n\t\t\t<'row'<'col-sm-12'tr>>\n\t\\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
    buttons: {
      buttons: [
          {
            extend: 'print',
            className: 'btn-primary',
            init: function(api, node, config) {
              $(node).removeClass('btn-secondary')
            }
          },
          {
            extend: 'excelHtml5',
            className: 'btn-primary',
            init: function(api, node, config) {
              $(node).removeClass('btn-secondary')
            }
          },
          {
            extend: 'csvHtml5',
            className: 'btn-primary',
            init: function(api, node, config) {
              $(node).removeClass('btn-secondary')
            }
          },
          {
            extend: 'pdfHtml5',
            className: 'btn-primary',
            init: function(api, node, config) {
              $(node).removeClass('btn-secondary')
            }
          }
      ]
    },
    headerCallback:function(thead, data, start, end, display) {
      thead.getElementsByTagName("th")[0].innerHTML='<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input dsh-check-group" id="checkAll1"><label class="custom-control-label" for="checkAll1"></label></div>'
    },
    columnDefs: [
      {
        targets: [0],
        width: "20",
        className: "text-right",
        orderable: false,
        render: function(data, type, full, meta) {
          return'<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input dsh-check" id="checkItem'+meta.row+'"><label class="custom-control-label" for="checkItem'+meta.row+'"></label></div>'
        }
      },
      {
        targets: [1],
        width:"30px",
        orderable: false,
      },
      {
        targets: [9],
        width:"30px",
        render: function (data, type, row) {
          return '<div class="dropleft d-inline-block"><a href="#" class="btn btn-icon btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="lni-more-alt"></i></a>'+
                  '<div class="dropdown-menu"> <a class="dropdown-item" href="#">View</a> <a class="dropdown-item" href="#">Edit</a>'+
                  '<a class="dropdown-item" href="#">Delete</a> </div> </div>';
        }
      },
    ]
  });

  table.on("change", ".dsh-check-group", function() {
      var checkbox = $(this).closest("table").find("td:first-child .dsh-check"),
      isChecked = $(this).is(":checked");
      $(checkbox).each(function() {
        isChecked ? ($(this).prop("checked", true), $(this).closest("tr").addClass("active")) : ($(this).prop("checked", false), $(this).closest("tr").removeClass("active"))
      });
  }).on("change", ".dsh-check", function() {
    $(this).parents("tr").toggleClass("active")
  });

});
