// import { useState } from 'react';
// import axios from 'axios';

// function RegisterUser() {
//   const [formData, setFormData] = useState({
//     roll_no: '',
//     full_name: '',
//     email: '',
//     branch: '',
//     section: '',
//     gender: '',
//     phone_number: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3000/user-api/register', formData);
//       alert('Registration successful!');
//       setFormData({
//         roll_no: '',
//         full_name: '',
//         email: '',
//         branch: '',
//         section: '',
//         gender: '',
//         phone_number: ''
//       });
//     } catch (err) {
//       console.error(err);
//       alert('Failed to register user.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
//       <div
//         style={{
//           backgroundColor: '#fff',
//           boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//           borderRadius: '10px',
//           padding: '20px',
//         }}
//       >
//         <h2
//           style={{
//             color: 'goldenrod',
//             textAlign: 'center',
//             borderBottom: '2px solid goldenrod',
//             paddingBottom: '10px',
//           }}
//         >
//           Register User
//         </h2>

//         <form onSubmit={handleSubmit}>
//           {[
//             { label: 'Roll No', name: 'roll_no', type: 'text' },
//             { label: 'Full Name', name: 'full_name', type: 'text' },
//             { label: 'Email', name: 'email', type: 'email' },
//             { label: 'Branch', name: 'branch', type: 'text' },
//             { label: 'Section', name: 'section', type: 'text' },
//             { label: 'Phone Number', name: 'phone_number', type: 'tel' }
//           ].map(({ label, name, type }) => (
//             <div style={{ marginBottom: '15px' }} key={name}>
//               <label htmlFor={name} style={{ fontWeight: 'bold', color: '#333' }}>
//                 {label}
//               </label>
//               <input
//                 type={type}
//                 id={name}
//                 name={name}
//                 value={formData[name]}
//                 onChange={handleChange}
//                 placeholder={`Enter ${label.toLowerCase()}...`}
//                 style={{
//                   width: '100%',
//                   padding: '10px',
//                   border: '2px solid goldenrod',
//                   borderRadius: '5px',
//                   marginTop: '5px',
//                   fontSize: '16px',
//                 }}
//               />
//             </div>
//           ))}

//           <div style={{ marginBottom: '15px' }}>
//             <label htmlFor="gender" style={{ fontWeight: 'bold', color: '#333' }}>
//               Gender
//             </label>
//             <select
//               id="gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 border: '2px solid goldenrod',
//                 borderRadius: '5px',
//                 marginTop: '5px',
//                 fontSize: '16px',
//               }}
//             >
//               <option value="" disabled>
//                 -- Select Gender --
//               </option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <div style={{ textAlign: 'right' }}>
//             <button
//               type="submit"
//               style={{
//                 backgroundColor: 'goldenrod',
//                 color: 'white',
//                 fontWeight: 'bold',
//                 padding: '10px 20px',
//                 border: 'none',
//                 borderRadius: '5px',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//                 transition: 'background 0.3s',
//               }}
//               onMouseOver={(e) => (e.target.style.backgroundColor = '#c38e29')}
//               onMouseOut={(e) => (e.target.style.backgroundColor = 'goldenrod')}
//             >
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default RegisterUser;

import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function RegisterUser() {
  const [formData, setFormData] = useState({
    event_name: '',
    roll_no: '',
    full_name: '',
    email: '',
    branch: '',
    section: '',
    gender: '',
    phone_number: ''
  });

  const [events, setEvents] = useState([]);

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

        const titles = rawEvents
          .filter(event => event.title && moment(event.start_time).isValid() && moment(event.end_time).isValid())
          .map(event => event.title);

        setEvents(titles);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/user-api/register', formData);
      alert('Registration successful!');
      setFormData({
        event_name: '',
        roll_no: '',
        full_name: '',
        email: '',
        branch: '',
        section: '',
        gender: '',
        phone_number: ''
      });
    } catch (err) {
      console.error(err);
      alert('Failed to register user.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <div
        style={{
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '10px',
          padding: '20px',
        }}
      >
        <h2
          style={{
            color: 'goldenrod',
            textAlign: 'center',
            borderBottom: '2px solid goldenrod',
            paddingBottom: '10px',
          }}
        >
          Register User
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Event Dropdown */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="event_name" style={{ fontWeight: 'bold', color: '#333' }}>
              Event Name
            </label>
            <select
              id="event_name"
              name="event_name"
              value={formData.event_name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid goldenrod',
                borderRadius: '5px',
                marginTop: '5px',
                fontSize: '16px',
              }}
            >
              <option value="" disabled>-- Select Event --</option>
              {events.map((title, idx) => (
                <option key={idx} value={title}>{title}</option>
              ))}
            </select>
          </div>

          {/* Other Fields */}
          {[
            { label: 'Roll No', name: 'roll_no', type: 'text' },
            { label: 'Full Name', name: 'full_name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Branch', name: 'branch', type: 'text' },
            { label: 'Section', name: 'section', type: 'text' },
            { label: 'Phone Number', name: 'phone_number', type: 'tel' }
          ].map(({ label, name, type }) => (
            <div style={{ marginBottom: '15px' }} key={name}>
              <label htmlFor={name} style={{ fontWeight: 'bold', color: '#333' }}>
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter ${label.toLowerCase()}...`}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid goldenrod',
                  borderRadius: '5px',
                  marginTop: '5px',
                  fontSize: '16px',
                }}
              />
            </div>
          ))}

          {/* Gender Dropdown */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="gender" style={{ fontWeight: 'bold', color: '#333' }}>
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid goldenrod',
                borderRadius: '5px',
                marginTop: '5px',
                fontSize: '16px',
              }}
            >
              <option value="" disabled>-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <div style={{ textAlign: 'right' }}>
            <button
              type="submit"
              style={{
                backgroundColor: 'goldenrod',
                color: 'white',
                fontWeight: 'bold',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background 0.3s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#c38e29')}
              onMouseOut={(e) => (e.target.style.backgroundColor = 'goldenrod')}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
