// EventFilterTabs.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';

function EventFilterTabs({ currentFilter, setFilter }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'past', label: 'Past' },
    { key: 'ongoing', label: 'Ongoing' },
    { key: 'upcoming', label: 'Upcoming' }
  ];

  return (
    <Nav variant="tabs" activeKey={currentFilter} onSelect={setFilter} className="mb-3">
      {filters.map(f => (
        <Nav.Item key={f.key}>
          <Nav.Link eventKey={f.key} className="filter-tab-link">{f.label}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default EventFilterTabs;
