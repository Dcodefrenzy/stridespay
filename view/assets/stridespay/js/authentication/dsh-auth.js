$(document).ready(function() {
  'use strict';

  // Auth slider
  $(".dsh-slider").slick({
    autoplay: true
  });

  // Forgot passowrd
  $(".forgotPassword-form").on('submit', function(e){
    e.preventDefault();

    if($("#forgot-email").val() != ''){
      toastr.success("An email has been sent to your inbox with further instructions", "Email Sent");
      $("#forgot-btn").prop('disabled', true);
    }

  });

});
