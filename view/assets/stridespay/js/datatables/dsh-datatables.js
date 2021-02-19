$(document).ready(function() {
  'use strict';

  $('#default_datatable').DataTable();

  $('#client_ajax_datatable').DataTable({
    responsive: true,
    ajax: {
      url:"http://androthemes.com/themes/html/dashield/data/sample.json",
    },
    columns: [
      { data: "name"},
      { data: "isActive"},
      { data: "balance"},
      { data: "age"},
      { data: "email"},
      { data: "phone"},
      {
        data: null,
        render: function (data, type, full, meta) {
            return '<a href="#" data-id="'+data.id+'" class="dsh-tooltip dsh-dt-action text-info" data-placement="top" title="Edit"><i class="lni-pencil-alt"></i></a>' +
            '<a href="#" data-id="'+data.id+'" class="dsh-tooltip dsh-dt-action text-danger" data-placement="top" title="Delete"><i class="lni-trash"></i></a>';
        }
      },
    ],
    columnDefs: [
      {
        targets: [0],
        render: function (data, type, row) {
            return data == false ? '<span class="badge badge-danger">Inactive</span>' : '<span class="badge badge-success">Active</span>';
        }
      },
    ]
  });

});
