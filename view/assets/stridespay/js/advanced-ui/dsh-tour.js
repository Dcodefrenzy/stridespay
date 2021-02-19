$(document).ready(function() {
  'use strict';

  var driver = new Driver();

  // Define the steps for tour
  driver.defineSteps([
    {
      element: '#tour-1',
      popover: {
        title: 'Step 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        position: 'right'
      }
    },
    {
      element: '#tour-2',
      popover: {
        title: 'Did you know?',
        description: 'You can add HTML in title or description also!',
        position: 'bottom'
      }
    },
    {
      element: '#tour-3',
      popover: {
        title: '<em>Tags</em> in title or <u>body</u>',
        description: 'Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit.</strong>',
        position: 'top'
      }
    },
    {
      element: '#tour-4',
      popover: {
        title: 'Keyboard control',
        description: 'You can manipulate the tour with your arrow keys, and close with the ESC button',
        position: 'left'
      }
    },
    {
      element: '#tour-5',
      popover: {
        title: 'And much more!',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        position: 'top'
      }
    },
  ]);

  // Start the tour
  driver.start();

});
