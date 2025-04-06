// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useUser } from '@clerk/clerk-react';

// const RegisteredEvents = () => {
//   const { user } = useUser();
//   const [registeredEvents, setRegisteredEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await axios.get('http://localhost:3000/user-api/articles');
//         const allEvents = res.data.payload || [];

//         const filtered = allEvents.filter(event =>
//           event.registered_emails?.includes(user.primaryEmailAddress.emailAddress)
//         );

//         setRegisteredEvents(filtered);
//       } catch (err) {
//         console.error('Error fetching events:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) fetchEvents();
//   }, [user]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="container mt-4">
//       <h3 className='mb-2'>Registered Events</h3>
//       {registeredEvents.length === 0 ? (
//         <p>You haven't registered for any events.</p>
//       ) : (
//         <div className="row">
//           {registeredEvents.map(event => (
//             <div key={event._id} className="col-md-4 mb-3">
//               <div className="card shadow-sm p-3">
//                 <h5 className="card-title">{event.title}</h5>
//                 <p className="card-text">{event.description}</p>
//                 <p className="card-text">
//                   <strong>Start:</strong> {new Date(event.start_time).toLocaleString()}
//                 </p>
//                 <p className="card-text">
//                   <strong>End:</strong> {new Date(event.end_time).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RegisteredEvents;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const RegisteredEvents = () => {
  const { user } = useUser();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({ category: '', date: '', location: '' });
  const [loading, setLoading] = useState(true);

  const locations = ['A113','VNR Sports Complex', 'Ground', 'A114', 'Basketball Court', 'B313', 'B314', 'B1315', 'B316', 'P404', 'P403'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:3000/user-api/articles');
        const allEvents = res.data.payload || [];

        const userEvents = allEvents.filter(event =>
          event.registered_emails?.includes(user.primaryEmailAddress.emailAddress)
        );

        setRegisteredEvents(userEvents);
        setFilteredEvents(userEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchEvents();
  }, [user]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    const filtered = registeredEvents.filter(event => {
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
      <h3 className='mb-2'>Registered Events</h3>

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
        <p>No matching events found.</p>
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
                <p className="card-text">
                  <strong>Location:</strong> {event.location.toLocaleString()}
                </p>
                <p className="card-text">
                  <strong>Ticket Type:</strong> {event.ticket_type.toLocaleString()}
                </p>
                <p className="card-text">
                  <strong>Ticket Price:</strong> {event.ticket_price.toLocaleString()}
                </p>
                <p className="card-text">
                  <strong>Seats left:</strong> {event.participant_limit.toLocaleString()-event.participant_count.toLocaleString()}
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
