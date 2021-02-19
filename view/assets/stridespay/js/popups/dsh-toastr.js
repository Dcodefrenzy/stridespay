$(document).ready(function() {
  'use strict';

  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
  $("#toastForm").on('submit', function(e) {
    e.preventDefault();
    var toastData = DSHUtils.formSerializeArrayToJson($(this).serializeArray()),
    closeBtn = $("#closeButton").prop('checked'),
    debugMode = $("#debug").prop('checked'),
    preventDuplicates = $("#preventDuplicates").prop('checked'),
    progressBar = $("#progressBar").prop('checked'),
    newestOnTop = $("#newestOnTop").prop('checked'),
    message = toastData.message ? toastData.message : 'This is a test message, you can also add your own!',
    title = toastData.title ? toastData.title : 'Hello World';
    toastr.options = {
      "closeButton": closeBtn,
      "debug": debugMode,
      "preventDuplicates": preventDuplicates,
      "progressBar": progressBar,
      "newestOnTop": newestOnTop,
      "positionClass": toastData.toastPosition,
      "showDuration": toastData.toastShowDuration,
      "hideDuration": toastData.toastHideDuration,
      "timeOut": toastData.toastTimeOut,
      "extendedTimeOut": toastData.toastExtendedTimeOut,
      "showEasing": toastData.toastShowEasing,
      "hideEasing": toastData.toastHideEasing,
      "showMethod": toastData.toastShowMethod,
      "hideMethod": toastData.toastHideMethod,
    }
    switch (toastData.toastType) {
      case 'success':
        toastr.success(message, title);
        break;
      case 'info':
        toastr.info(message, title);
        break;
      case 'warning':
        toastr.warning(message, title);
        break;
      case 'danger':
        toastr.error(message, title);
        break;
      default:
        toastr.success(message, title);
        break;
    }
    $("#toastCode").text("toastr.options = " + JSON.stringify(toastr.options, null, '\t'));
  });

  $("#clearToasts").on('click', function() {
    toastr.remove();
  });

});
