// CalendarPage.jsx
import React, { useState } from 'react';
import EventFilterTabs from './EventFilterTabs';
import EventCalendar from './EventCalendar';
import './calendar.css';

function CalendarPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="calendar-page container mt-4">
      <h2 className="text-center text-dark mb-4">College Events Calendar</h2>
      <EventFilterTabs currentFilter={filter} setFilter={setFilter} />
      <EventCalendar filter={filter} />
    </div>
  );
}

export default CalendarPage;
