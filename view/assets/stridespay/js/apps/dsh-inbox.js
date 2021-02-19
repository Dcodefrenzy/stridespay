$(document).ready(function() {
  'use strict';

  // Compose Mail Editor
  new Quill("#dsh_mail_content", {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote'],
        [{
          'header': 1
        }, {
          'header': 2
        }], // custom button values
        [{
          'list': 'ordered'
        }, {
          'list': 'bullet'
        }],
        [{
          'indent': '-1'
        }, {
          'indent': '+1'
        }], // outdent/indent
        [{
          'direction': 'rtl'
        }], // text direction
        [{
          'header': [1, 2, 3, 4, 5, 6, false]
        }],
        [{
          'color': []
        }, {
          'background': []
        }], // dropdown with defaults from theme
        [{
          'align': []
        }],
        ['clean']
      ]
    },
    placeholder: "Start typing your email...",
    theme: "snow"
  });

  // Reply Mail Editor
  new Quill("#dsh_reply_content", {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote'],
        [{
          'header': 1
        }, {
          'header': 2
        }], // custom button values
        [{
          'list': 'ordered'
        }, {
          'list': 'bullet'
        }],
        [{
          'indent': '-1'
        }, {
          'indent': '+1'
        }], // outdent/indent
        [{
          'direction': 'rtl'
        }], // text direction
        [{
          'header': [1, 2, 3, 4, 5, 6, false]
        }],
        [{
          'color': []
        }, {
          'background': []
        }], // dropdown with defaults from theme
        [{
          'align': []
        }],
        ['clean']
      ]
    },
    placeholder: "Start typing your reply...",
    theme: "snow"
  });

  // Toggle Mail Section (Single Email / Copose new email / Email list)
  $(".dsh-inbox-toggle-section").on('click', function(e) {

    var target = $(this).data('target'),
      activeClassParentWrapper = $(".dsh-sidebar-list-wrapper");
    if ($(target).hasClass('active')) return;

    DSHUtils.blockUi($("body"), 'Processing...', 1000, function() {
      if (target != '#emailList') {
        DSHUtils.removeAllActiveItems(activeClassParentWrapper);
      }
      $(".dsh-section").removeClass('active');
      $(target).addClass('active');
    });

  });

  // Check All Emails
  $(".dsh-inbox-wrapper").on("change", ".dsh-check-group", function() {
    var checkbox = $(this).closest(".card").find(".custom-control-input"),
      isChecked = $(this).is(":checked");
    $(checkbox).each(function() {
      isChecked ? ($(this).prop("checked", true), $(this).closest(".dsh-email-item").addClass("active")) : ($(this).prop("checked", false), $(this).closest(".dsh-email-item").removeClass("active"))
    });
  }),
  $(".dsh-inbox-wrapper .card-body").on("change", ".custom-control-input", function() {
    $(this).closest(".dsh-email-item").toggleClass("active")
  });

  // composeToTags
    var composeList = document.getElementById('mailTo');
    new Tagify(composeList, {
      delimiters: ", ",
      maxTags: 5,
      keepInvalidTags: true,
      whitelist: [{
          value: "Shery Wain",
          email: "shery_wain@example.com",
        },
        {
          value: "Meghann Otwell",
          email: "meghan-otwell989@example.com",
        }, {
          value: "Derek Salinas",
          email: "derekS@example.com",
        }, {
          value: "Tyson Prindle",
          email: "tyson_prindle@example.com",
        }, {
          value: "In Yelvington",
          email: "InYL@example.com",
        }, {
          value: "Laurinda Dally",
          email: "laury@example.com",
        }, {
          value: "Elmira Flick",
          email: "elmira@example.com",
        }, {
          value: "Dani Voelker",
          email: "TheDani@example.com",
        }
      ],
      templates: {
        dropdownItem: function(i) {
          return '<div class="tagify__dropdown__item">' +
            '<div class="media">' +
            '<div class="media-body">' +
            '<h6>'+i.value+'</h6>' +
            '<p>'+i.email+'</p>' +
            '</div>' +
            '</div>' +
            '</div>';
        }
      },
      dropdown: {
        enabled: true,
        maxItems: 5
      }
    });

});
