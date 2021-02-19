$(document).ready(function() {
  'use strict';

  $("#dsh_swal_ex_1").on('click', function() {
    Swal.fire('Hello world!')
  });
  $("#dsh_swal_ex_2").on('click', function() {
    Swal.fire(
      'The Internet?',
      'That thing is still around?',
      'question'
    )
  });
  $("#dsh_swal_ex_3").on('click', function() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    })
  });

  $("#dsh_swal_ex_4").on('click', function() {
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      text: 'You have done something awesome',
    })
  });

  $("#dsh_swal_ex_5").on('click', function() {
    Swal.fire({
      icon: 'info',
      title: 'Look at you!',
      text: 'You have done something awesome',
    })
  });

  $("#dsh_swal_ex_6").on('click', function() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  });

  $("#dsh_swal_ex_7").on('click', function() {
    Swal.fire({
      title: 'Custom animation with Animate.css',
      showClass: {
        popup: 'animated zoomInLeft faster'
      },
      hideClass: {
        popup: 'animated zoomOutLeft faster'
      }
    })
  });

  $("#dsh_swal_ex_8").on('click', function() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if ( result.dismiss === Swal.DismissReason.cancel ) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  });

  $("#dsh_swal_ex_9").on('click', function() {
    Swal.fire({
      title: 'Sweet!',
      text: 'Modal with a custom image.',
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  });

  $("#dsh_swal_ex_10").on('click', function() {
    var timerInterval
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          Swal.getContent().querySelector('b')
            .textContent = Swal.getTimerLeft()
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.timer
      ) {
        console.log('I was closed by the timer') // esldsh-disable-line
      }
    })
  });

});
