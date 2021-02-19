$(document).ready(function() {
  'use strict';

  // Single Item
  $("#dsh_slider_ex_1 .dsh-slider").slick();

  // Multiple Items
  $('#dsh_slider_ex_2 .dsh-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });

  // Responsive Display
  $('#dsh_slider_ex_3 .dsh-slider').slick({
    dots: true,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });

  // Center Mode
  $('#dsh_slider_ex_4 .dsh-slider').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    prevArrow: $('#dsh_slider_ex_4 .dsh-slider-prev'),
    nextArrow: $('#dsh_slider_ex_4 .dsh-slider-next'),
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },{
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }]
  });

  // Autoplay
  $('#dsh_slider_ex_5 .dsh-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  // Fade
  $('#dsh_slider_ex_6 .dsh-slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  });

  //Synced Slider
  $('#dsh_slider_ex_7 .dsh-slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '#dsh_slider_ex_7 .dsh-slider-nav'
  });
  $('#dsh_slider_ex_7 .dsh-slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '#dsh_slider_ex_7 .dsh-slider-for',
    dots: false,
    focusOnSelect: true
  });

});
