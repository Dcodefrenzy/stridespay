$(document).ready(function() {
  'use strict';

  /* Collect the form data and pass it to formatFolder to convert into HTML template */
  $(".dsh-create-folder-form").on('submit', function(e) {
    e.preventDefault();

    var folder = {
      name: $("#folderName").val(),
      password: $("#folderPassword").val(),
      capacity: $("#folderCapacity").val()
    }

    formatFolder(folder);

  });

  /* Formats the data into html */
  function formatFolder(data) {
    if (DSHUtils.isEmpty(data.name) && DSHUtils.isEmpty(data.capacity)) return false;

    var passwordModal = !DSHUtils.isEmpty(data.password) ? 'data-toggle="modal" data-target="#passwordModal"' : '',
      passwordIcon = !DSHUtils.isEmpty(data.password) ? '<i class="lni-lock"></i>' : '',
      passwordClass = !DSHUtils.isEmpty(data.password) ? 'dsh-private-folder' : 'dsh-can-active';

    var html = '<li class="dsh-sidebar-section-title ' + passwordClass + '">' +
      '<a href="#" ' + passwordModal + '>' +
      '<span class="dsh-svg-icon svg-warning align-items-start">' +
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" xml:space="preserve">' +
      '<path d="M14,23.5c-0.254,0-0.479,0.172-0.545,0.417L2,52.5v1c0,0.734-0.047,1,0.565,1h44.759c1.156,0,2.174-0.779,2.45-1.813 L60,24.5c0,0,0-0.625,0-1H14z"></path>' +
      '<path opacity="0.4" d="M12.731,21.5H53h1v-6.268c0-1.507-1.226-2.732-2.732-2.732H26.515l-5-7H2.732C1.226,5.5,0,6.726,0,8.232v41.796 l10.282-26.717C10.557,22.279,11.575,21.5,12.731,21.5z"></path>' +
      '</svg>' +
      '<span class="dsh-sidebar-item-wrap"> ' + data.name + ' <span class="small">0GB / ' + data.capacity + 'GB Used</span> </span>' +
      '</span>' + passwordIcon +
      '</a>' +
      '</li>';

    $(".dsh-sidebar-list").append(html);
  }

});
