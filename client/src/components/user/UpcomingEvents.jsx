import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpcomingEvents = () => {
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({ category: '', date: '', location: '' });

  const locations = ['A113', 'VNR Sports Complex', 'Ground', 'A114', 'Basketball Court', 'B313', 'B314', 'B1315', 'B316', 'P404', 'P403'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user-api/articles');
        const data = Array.isArray(response.data) ? response.data : response.data.payload || [];

        const now = new Date();
        const upcoming = data.filter(event => new Date(event.start_time) > now);

        setUpcomingEvents(upcoming);
        setFilteredEvents(upcoming);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    const filtered = upcomingEvents.filter(event => {
      const matchCategory = !updatedFilters.category || event.category === updatedFilters.category;
      const matchLocation = !updatedFilters.location || event.location === updatedFilters.location;
      const matchDate = !updatedFilters.date || new Date(event.start_time).toDateString() === new Date(updatedFilters.date).toDateString();
      return matchCategory && matchLocation && matchDate;
    });

    setFilteredEvents(filtered);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3 className='mb-2'>Upcoming Events</h3>

      <div className="mb-4 row g-2">
        <div className="col-md-3">
          <select name="category" onChange={handleFilterChange} className="form-select">
            <option value="">All Categories</option>
            <option value="cultural">Cultural</option>
            <option value="academic">Academic</option>
            <option value="sports">Sports</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="col-md-3">
          <input type="date" name="date" onChange={handleFilterChange} className="form-control" />
        </div>
        <div className="col-md-3">
          <select name="location" onChange={handleFilterChange} className="form-select">
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <p>No matching upcoming events.</p>
      ) : (
        <div className="row">
          {filteredEvents.map(event => (
            <div key={event._id} className="col-md-4 mb-3">
              <div className="card shadow-sm p-3">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.description}</p>
                <p className="card-text">
                  <strong>Start:</strong> {new Date(event.start_time).toLocaleString()}
                </p>
                <p className="card-text">
                  <strong>End:</strong> {new Date(event.end_time).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
