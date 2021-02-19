$(document).ready(function() {
  'use strict';

  // Initialize the draggable events
  var containerEl = document.getElementById('dsh_external_events_ex');
  new FullCalendarInteraction.Draggable(containerEl, {
    itemSelector: '.fc-event',
    eventData: function(eventEl) {
      return {
        title: eventEl.innerText.trim(),
        stick: true
      }
    }
  });

  var momentObj = moment().startOf("day"),
    monthYear = momentObj.format("YYYY-MM"),
    dayMinusOne = momentObj.clone().subtract(1, "day").format("YYYY-MM-DD"),
    dayPlusOne = momentObj.clone().add(1, "day").format("YYYY-MM-DD"),
    now = momentObj.format("YYYY-MM-DD"),
    calendarCtx = document.getElementById("dsh_calendar_ex_1");

  var calendar = new FullCalendar.Calendar(calendarCtx, {
    plugins: ['bootstrap', 'interaction', 'dayGrid', 'timeGrid', 'list'],
    header: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    themeSystem: 'bootstrap',
    height: 600,
    contentHeight: 600,
    aspectRatio: 3,
    nowIndicator: true,
    now: now + "T09:25:00",
    views: {
      dayGridMonth: {
        buttonText: "Month"
      },
      timeGridWeek: {
        buttonText: "Week"
      },
      timeGridDay: {
        buttonText: "Day"
      }
    },
    defaultView: "dayGridMonth",
    defaultDate: now,
    editable: true,
    eventLimit: true,
    droppable: true, // this allows things to be dropped onto the calendar
    drop: function(arg) {
      // is the "remove after drop" checkbox checked?
      if (document.getElementById('dsh_external_events_remove_ex').checked) {
        // if so, remove the element from the "Draggable Events" list
        arg.draggedEl.parentNode.removeChild(arg.draggedEl);
      }
    },
    eventReceive: function(info){
      toastr.success('Event has been successfully assigned','Success');
      if($("#dsh_external_events_ex .fc-event").length == 0){
        $("#dsh_external_events_ex").html('<p>No more events to display</p>');
      }
    },
    navLinks: true,
    events: [{
        title: "Dashield Event",
        start: monthYear + "-14T13:30:00",
        end: monthYear + "-14",
        classNames: ["fc-event-danger"]
      },
      {
        title: "Launch Event 2020",
        start: monthYear + "-02",
        end: monthYear + "-03",
        classNames: ["fc-event-warning"]
      },
      {
        title: "Design Trends 2020",
        start: monthYear + "-03",
        end: monthYear + "-05",
        classNames: ["fc-event-success"]
      },
      {
        title: "Health Facts with Sylvester Stalion",
        start: monthYear + "-12",
        end: monthYear + "-10"
      },
      {
        title: "Weekend at John's",
        start: monthYear + "-16T16:00:00"
      },
      {
        title: "Wedding Day",
        start: now + "T10:30:00",
        end: now + "T12:30:00"
      },
      {
        title: "Lunch",
        start: now + "T12:00:00",
        classNames: ["fc-event-secondary"]
      },
      {
        title: "Gym Facts with Margot Bobbie",
        start: now + "T14:30:00",
        classNames: ["fc-event-danger"]
      },
      {
        title: "Movie Night: Mission Possible",
        start: now + "T17:30:00",
        classNames: ["fc-event-success"]
      },
      {
        title: "Day Out",
        start: dayPlusOne + "T05:00:00",
        classNames: ["fc-event-warning"]
      },
      {
        title: "Holiday",
        start: dayPlusOne + "T07:00:00",
        classNames: ["fc-event-primary"]
      },
      {
        title: "Check this Link Out",
        url: "http://youtube.com/",
        start: monthYear + "-28",
        classNames: ["fc-event-dark"]
      }
    ]
  })

  calendar.render();

});
