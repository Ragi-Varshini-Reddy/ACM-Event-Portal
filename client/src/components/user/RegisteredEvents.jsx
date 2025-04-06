import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const RegisteredEvents = () => {
  const { user } = useUser();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:3000/user-api/articles');
        const allEvents = res.data.payload || [];

        const filtered = allEvents.filter(event =>
          event.registered_emails?.includes(user.primaryEmailAddress.emailAddress)
        );

        setRegisteredEvents(filtered);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchEvents();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3 className='mb-2'>Registered Events</h3>
      {registeredEvents.length === 0 ? (
        <p>You haven't registered for any events.</p>
      ) : (
        <div className="row">
          {registeredEvents.map(event => (
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

export default RegisteredEvents;
