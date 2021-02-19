'use strict';

// This prevents using the class 'dropzone' which will conflict with new instances of DropZone created programatically
// Set this to true, or delete if you want to create an instance of Dropzone without having to write any code:
// More info here: https://www.dropzonejs.com/#configuration
Dropzone.autoDiscover = false;

$(document).ready(function() {
  'use strict';

  $("#dsh_dropzone_ex_1").dropzone({
    url: "https://androthemes.com/scripts/silence.php",
    paramName: "file",
    maxFiles: 1,
    maxFilesize: 5,
    addRemoveLinks: true,
  }),
  $("#dsh_dropzone_ex_2").dropzone({
    url: "https://androthemes.com/scripts/silence.php",
    paramName: "file",
    maxFiles: 5,
    maxFilesize: 5,
    addRemoveLinks: true,
  }),
  $("#dsh_dropzone_ex_3").dropzone({
    url: "https://androthemes.com/scripts/silence.php",
    paramName: "file",
    maxFiles: 1,
    maxFilesize: 5,
    addRemoveLinks: true,
    acceptedFiles: "image/*,application/pdf,.psd",
  }),
  $("#dsh_dropzone_ex_4").dropzone({
    url: "https://androthemes.com/scripts/silence.php",
    paramName: "file",
    maxFiles: 1,
    maxFilesize: 1,
    addRemoveLinks: true,
    previewsContainer: '#dsh_dropzone_preview .dsh-dropzone-preview--inner',
    acceptedFiles: "image/*",
  });

});
