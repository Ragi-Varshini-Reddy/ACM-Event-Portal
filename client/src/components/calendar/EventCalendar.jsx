import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function EventCalendar({ filter }) {
  const now = new Date();
  const [date, setDate] = useState(now);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/user-api/articles');
        const contentType = response.headers.get('content-type');

        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('API did not return JSON');
        }

        const data = await response.json();
        const rawEvents = Array.isArray(data)
          ? data
          : Array.isArray(data.payload)
          ? data.payload
          : [];

        const mapped = rawEvents
          .map(event => {
            if (!event.start_time || !event.end_time || !event.title) return null;

            const start = moment(event.start_time);
            const end = moment(event.end_time);

            if (!start.isValid() || !end.isValid()) return null;

            return {
              title: event.title,
              start: start.toDate(),
              end: end.toDate(),
              ticketType: event.ticket_type || 'free',
              isActive: event.isEventActive ?? true,
            };
          })
          .filter(Boolean);

        setEvents(mapped);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]); // no fallback event either
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    const now = new Date();
    return events.filter(event => {
      if (filter === 'past') return event.end < now;
      if (filter === 'upcoming') return event.start > now;
      if (filter === 'ongoing') return event.start <= now && event.end >= now;
      return true;
    });
  }, [filter, events]);

  const eventPropGetter = (event) => {
    const now = new Date();
    let backgroundColor = '#888';
    let fontWeight = 'normal';

    if (!event.isActive) {
      backgroundColor = '#aaa';
    } else if (event.start <= now && event.end >= now) {
      backgroundColor = 'green';
      fontWeight = 'bold';
    } else if (event.end < now) {
      backgroundColor = '#bbb';
    } else if (event.ticketType === 'free') {
      backgroundColor = '#5cb85c';
    } else if (event.ticketType === 'paid') {
      backgroundColor = '#5bc0de';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        padding: '6px',
        color: 'white',
        border: '1px solid #333',
        fontWeight,
        height: '100%',
      }
    };
  };

  if (loading) return <div className="text-center mt-5">Loading events...</div>;

  return (
    <div className="container mt-4 shadow p-3 bg-white rounded">
      {filteredEvents.length === 0 ? (
        <div className="text-center my-4 text-dark">
          No {filter ? filter : ''} events available.
        </div>
      ) : (
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          titleAccessor={(event) => `${event.title} (${event.ticketType})`}
          style={{ height: 600 }}
          eventPropGetter={eventPropGetter}
          views={['month']}
          defaultView="month"
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          toolbar={true}
        />
      )}
    </div>
  );
}

export default EventCalendar;
