$(document).ready(function() {
  'use strict';

  $('#buttons_datatable').DataTable({
    responsive: true,
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
    columnDefs: [
      {
        targets: [6],
        width:"30px",
        render: function (data, type, row) {
          return '<div class="dropleft d-inline-block"><a href="#" class="btn btn-icon btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="lni-more-alt"></i></a><div class="dropdown-menu">'+
                  '<a class="dropdown-item media align-items-center" href="#"><i class="lni-enter"></i><div class="media-body"><h6>View</h6><p class="text-muted fs-12">View item details</p></div></a>'+
                  '<a class="dropdown-item media align-items-center" href="#"><i class="lni-pencil"></i><div class="media-body"><h6>Edit</h6><p class="text-muted fs-12">Edit item</p></div></a>'+
                  '<div class="dropdown-divider"></div>'+
                  '<a class="dropdown-item media align-items-center text-danger" href="#"><i class="lni-trash"></i><div class="media-body"><h6>Delete</h6><p class="text-muted fs-12">Delete item</p></div></a>'
        }
      },
    ]
  });

});
