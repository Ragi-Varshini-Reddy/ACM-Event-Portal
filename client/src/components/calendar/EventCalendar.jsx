// import React, { useMemo, useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// const localizer = momentLocalizer(moment);

// const allEvents = [
//   {
//     title: 'Tech Talk',
//     start: new Date('2025-04-03T10:00:00'),
//     end: new Date('2025-04-03T12:00:00'),
//     type: 'past'
//   },
//   {
//     title: 'Hackathon',
//     start: new Date('2025-04-07T09:00:00'),
//     end: new Date('2025-04-08T18:00:00'),
//     type: 'registered'
//   },
//   {
//     title: 'Alumni Meet',
//     start: new Date('2025-03-20T10:00:00'),
//     end: new Date('2025-03-20T14:00:00'),
//     type: 'upcoming'
//   }
// ];

// function EventCalendar({ filter }) {
//   const now = new Date();
//   const [date, setDate] = useState(now); // Controls the current visible month

//   const filteredEvents = useMemo(() => {
//     if (filter === 'past') return allEvents.filter(e => e.end < now);
//     if (filter === 'upcoming') return allEvents.filter(e => e.start > now);
//     if (filter === 'ongoing') return allEvents.filter(e => e.start <= now && e.end >= now);
//     return allEvents;
//   }, [filter]);

//   const eventColors = {
//     past: '#d9534f',       // red
//     upcoming: '#5bc0de',   // blue
//     registered: '#5cb85c'  // green
//   };

//   const eventPropGetter = (event) => {
//     const backgroundColor = eventColors[event.type] || '#888';
//     return {
//       style: {
//         backgroundColor,
//         borderRadius: '6px',
//         padding: '4px',
//         color: 'white',
//         border: 'none'
//       }
//     };
//   };

//   return (
//     <div className="container mt-4 shadow p-3 bg-white rounded">
//       <Calendar
//         localizer={localizer}
//         events={filteredEvents}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 600 }}
//         eventPropGetter={eventPropGetter}
//         views={['month']}           // Only month view
//         defaultView="month"
//         date={date}                 // Controlled view date
//         onNavigate={(newDate) => setDate(newDate)} // Allow navigation
//         toolbar={true}
//       />
//     </div>
//   );
// }

// export default EventCalendar;


import React, { useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

// Example data matching the schema you shared (replace with real DB data)
const allEvents = [
  {
    title: 'Tech Talk',
    start_time: '2025-04-03T10:00:00',
    end_time: '2025-04-03T12:00:00',
    isEventActive: false,
    ticket_type: 'free',
  },
  {
    title: 'Hackathon',
    start_time: '2025-04-07T09:00:00',
    end_time: '2025-04-08T18:00:00',
    isEventActive: true,
    ticket_type: 'paid',
  },
  {
    title: 'Alumni Meet',
    start_time: '2025-03-20T10:00:00',
    end_time: '2025-03-20T14:00:00',
    isEventActive: true,
    ticket_type: 'free',
  }
];

function EventCalendar({ filter }) {
  const now = new Date();
  const [date, setDate] = useState(now);

  // Convert schema event data into Calendar-compatible format
  const mappedEvents = allEvents.map(event => ({
    title: event.title,
    start: new Date(event.start_time),
    end: new Date(event.end_time),
    ticketType: event.ticket_type,
    isActive: event.isEventActive,
  }));

  const filteredEvents = useMemo(() => {
    return mappedEvents.filter(event => {
      if (filter === 'past') return event.end < now;
      if (filter === 'upcoming') return event.start > now;
      if (filter === 'ongoing') return event.start <= now && event.end >= now;
      return true; // show all
    });
  }, [filter, mappedEvents]);

  const eventPropGetter = (event) => {
    let backgroundColor = '#888';

    if (!event.isActive) {
      backgroundColor = '#aaa'; // grey for inactive
    } else if (event.ticketType === 'free') {
      backgroundColor = '#5cb85c'; // green
    } else if (event.ticketType === 'paid') {
      backgroundColor = '#5bc0de'; // blue
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        padding: '4px',
        color: 'white',
        border: 'none'
      }
    };
  };

  return (
    <div className="container mt-4 shadow p-3 bg-white rounded">
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventPropGetter}
        views={['month']}
        defaultView="month"
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
        toolbar={true}
      />
    </div>
  );
}

export default EventCalendar;
