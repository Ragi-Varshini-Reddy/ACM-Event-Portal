// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const PastEvents = () => {
//   const [loading, setLoading] = useState(true);
//   const [upcomingEvents, setUpcomingEvents] = useState([]);

//   useEffect(() => {
//     // Fetch events when component is mounted
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/user-api/articles');
//         console.log('API Response:', response.data); // Log the response to check its structure

//         // Ensure the response is an array
//         const data = Array.isArray(response.data) ? response.data : response.data.payload || [];

//         const now = new Date();
//         const filteredUpcomingEvents = data.filter(event => {
//           const start = new Date(event.start_time);
//           const end = new Date(event.end_time);
//           console.log(`Event: ${event.title}, Start: ${start}, End: ${end}`);
//           return start < now; // Only include events that are upcoming
//         });

//         setUpcomingEvents(filteredUpcomingEvents);
//       } catch (err) {
//         console.error('Error fetching events:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="container mt-4">
//       <h3 className='mb-2'>Past Events</h3>
//       {upcomingEvents.length === 0 ? (
//         <p>No past events available.</p>
//       ) : (
//         <div className="row">
//           {upcomingEvents.map(event => (
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

// export default PastEvents;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PastEvents = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    date: '',
    location: ''
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:3000/user-api/articles');
        const data = Array.isArray(res.data) ? res.data : res.data.payload || [];
        const now = new Date();
        const past = data.filter(e => new Date(e.start_time) < now);
        setEvents(past);
        setFilteredEvents(past);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = ({ category, date, location }) => {
    const result = events.filter(e => {
      const matchCategory = category ? e.category === category : true;
      const matchDate = date ? new Date(e.start_time).toDateString() === new Date(date).toDateString() : true;
      const matchLocation = location ? e.location.toLowerCase().includes(location.toLowerCase()) : true;
      return matchCategory && matchDate && matchLocation;
    });
    setFilteredEvents(result);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Past Events</h3>

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
      <option value="A113">A113</option>
      <option value="VNR Sports Complex">VNR Sports Complex</option>
      <option value="Ground">Ground</option>
      <option value="A114">A114</option>
      <option value="Basketball Court">Basketball Court</option>
      <option value="B313">B313</option>
      <option value="B314">B314</option>
      <option value="B1315">B1315</option>
      <option value="B316">B316</option>
      <option value="P404">P404</option>
      <option value="P403">P403</option>
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
                <p className="card-text"><strong>Start:</strong> {new Date(event.start_time).toLocaleString()}</p>
                <p className="card-text"><strong>End:</strong> {new Date(event.end_time).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastEvents;
