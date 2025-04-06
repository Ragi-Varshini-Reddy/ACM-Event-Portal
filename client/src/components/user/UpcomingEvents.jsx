import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpcomingEvents = () => {
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    // Fetch events when component is mounted
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user-api/articles');
        console.log('API Response:', response.data); // Log the response to check its structure

        // Ensure the response is an array
        const data = Array.isArray(response.data) ? response.data : response.data.payload || [];

        const now = new Date();
        const filteredUpcomingEvents = data.filter(event => {
          const start = new Date(event.start_time);
          const end = new Date(event.end_time);
          console.log(`Event: ${event.title}, Start: ${start}, End: ${end}`);
          return start > now; // Only include events that are upcoming
        });

        setUpcomingEvents(filteredUpcomingEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3 className='mb-2'>Upcoming Events</h3>
      {upcomingEvents.length === 0 ? (
        <p>No upcoming events available.</p>
      ) : (
        <div className="row">
          {upcomingEvents.map(event => (
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