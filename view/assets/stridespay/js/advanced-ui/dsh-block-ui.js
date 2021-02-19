$(document).ready(function() {
  'use strict';

  // Content Example
  $("#dsh_block_content_ex_1_trigger").on('click', function() {

    $("#dsh_block_content_ex_1").block({
      message: '<div class="spinner-border text-primary spinner-border-sm mr-2" role="status"></div>',
      css: {
        border: '0',
      }
    });
    setTimeout(function() {
      $("#dsh_block_content_ex_1").unblock();
    }, 1000);

  });
  $("#dsh_block_content_ex_2_trigger").on('click', function() {

    $("#dsh_block_content_ex_1").block({
      message: '<div class="spinner-border text-danger spinner-border-sm mr-2" role="status"></div><h5>Hold On...</h5>',
      css: {
        border: '0',
      }
    });
    setTimeout(function() {
      $("#dsh_block_content_ex_1").unblock();
    }, 1000);

  });
  $("#dsh_block_content_ex_3_trigger").on('click', function() {

    $("#dsh_block_content_ex_1").block({
      message: '<div class="spinner-border text-success spinner-border-sm mr-2" role="status"></div><h5>Please Wait...</h5>',
      css: {
        border: '0',
      }
    });
    setTimeout(function() {
      $("#dsh_block_content_ex_1").unblock();
    }, 1000);

  });

  // Page Example
  $("#dsh_block_content_ex_4_trigger").on('click', function() {

    $("body").block({
      message: '<div class="spinner-border text-primary spinner-border-sm mr-2" role="status"></div>',
      css: {
        border: '0',
      }
    });
    setTimeout(function() {
      $("body").unblock();
    }, 1000);

  });
  $("#dsh_block_content_ex_5_trigger").on('click', function() {

    $("body").block({
      message: '<div class="spinner-border text-danger spinner-border-sm mr-2" role="status"></div><h5>Hold On...</h5>',
      css: {
        border: '0',
      }
    });
    setTimeout(function() {
      $("body").unblock();
    }, 1000);

  });
  $("#dsh_block_content_ex_6_trigger").on('click', function() {

    $("body").block({
      message: '<div class="spinner-border text-success spinner-border-sm mr-2" role="status"></div><h5>Please Wait...</h5>',
      css: {
        border: '0',
      }
    });
    setTimeout(function() {
      $("body").unblock();
    }, 1000);

  });

  // Portlet Example
  $("#dsh_block_content_ex_7_trigger").on('click', function() {

    $("#dsh_block_content_ex_2").block({
      message: '<div class="spinner-border text-primary spinner-border-sm mr-2" role="status"></div>',
      css: {
        border: '0',
      }
    });
    setTimeout(function() {
      $("#dsh_block_content_ex_2").unblock();
    }, 1000);

  });
  $("#dsh_block_content_ex_8_trigger").on('click', function() {

    $("#dsh_block_content_ex_2").block({
      message: '<div class="spinner-border text-danger spinner-border-sm mr-2" role="status"></div><h5>Hold On...</h5>',
      css: {
        border: '0',
      }
    });
    setTimeout(function() {
      $("#dsh_block_content_ex_2").unblock();
    }, 1000);

  });
  $("#dsh_block_content_ex_9_trigger").on('click', function() {

    $("#dsh_block_content_ex_2").block({
      message: '<div class="spinner-border text-success spinner-border-sm mr-2" role="status"></div><h5>Please Wait...</h5>',
      css: {
        border: '0',
      }
    });
    setTimeout(function() {
      $("#dsh_block_content_ex_2").unblock();
    }, 1000);

  });

  // Advanced Blocking
  $("#dsh_block_content_ex_10_trigger").on('click', function() {

    toastr.warning("Blocked Successfully");
    $("body").block({
      message: '<div class="spinner-border text-primary spinner-border-sm mr-2" role="status"></div>',
      css: {
        border: '0',
      }
    });
    setTimeout(function() {
      $("body").unblock();
      toastr.warning("Unblocked Successfully");
    }, 1000);

  });
  $("#dsh_block_content_ex_11_trigger").on('click', function() {

    toastr.error("Blocked Successfully");
    $("body").block({
      message: '<div class="spinner-border text-danger spinner-border-sm mr-2" role="status"></div><h5>Hold On...</h5>',
      css: {
        border: '0',
      }
    });
    setTimeout(function() {
      $("body").unblock();
      toastr.error("Unblocked Successfully");
    }, 1000);

  });
  $("#dsh_block_content_ex_12_trigger").on('click', function() {

    toastr.success("Blocked Successfully");
    $("body").block({
      message: '<div class="spinner-border text-success spinner-border-sm mr-2" role="status"></div><h5>Please Wait...</h5>',
      css: {
        border: '0',
      }
    });
    setTimeout(function() {
      $("body").unblock();
      toastr.success("Unblocked Successfully");
    }, 1000);

  });

});
