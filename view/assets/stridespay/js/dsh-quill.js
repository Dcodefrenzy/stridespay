$(document).ready(function() {
  'use strict';

  var demo1, demo2, demo3, n;
  new Quill("#dsh_quill_ex_1", {
    modules: {
      toolbar: [
        [{
          header: [1, 2, !1]
        }],
        ["bold", "italic", "underline"],
        ["image", "code-block"]
      ]
    },
    placeholder: "Start typing...",
    theme: "snow"
  });

  demo1 = Quill.import("delta");

  demo2 = new Quill("#dsh_quill_ex_2", {
    modules: {
      toolbar: true
    },
    placeholder: "Start typing...",
    theme: "snow"
  });

  demo3 = new Quill("#dsh_quill_ex_3", {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']
      ]
    },
    placeholder: "Start typing...",
    theme: "snow"
  });

  n = new demo1;

  demo2.on("text-change", function(demo1) {
    n = n.compose(demo1)
  });

  setInterval(function() {
    n.length() > 0 && (toastr.success('Your changes have been saved successfully', 'Saved'), n = new demo1)
  }, 5e3);

  window.onbeforeunload = function() {
    if (n.length() > 0) return "There are unsaved changes. Are you sure you want to leave?"
  }

});
