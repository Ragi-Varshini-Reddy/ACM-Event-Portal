// import React from 'react';
// import { NavLink, Outlet } from 'react-router-dom';
// import { FiCalendar } from 'react-icons/fi'; 
// import '../author/AuthorProfile.css';

// function UserProfile() {
//   return (
//     <div className="user-profile container mt-4">
//       <div className="row text-center mb-4">
//         <div className="col-md-3">
//           <NavLink to="past-events" className="text-decoration-none">
//             <div className="card p-3 shadow-sm">
//               <h5>Past Events</h5>
//             </div>
//           </NavLink>
//         </div>
//         <div className="col-md-3">
//           <NavLink to="registered-events" className="text-decoration-none">
//             <div className="card p-3 shadow-sm">
//               <h5>Registered Events</h5>
//             </div>
//           </NavLink>
//         </div>
//         <div className="col-md-3">
//           <NavLink to="upcoming-events" className="text-decoration-none">
//             <div className="card p-3 shadow-sm">
//               <h5>Upcoming Events</h5>
//             </div>
//           </NavLink>
//         </div>
//         <div className="col-md-3">
//           <NavLink to="calendar" className="text-decoration-none">
//             <div className="card p-3 shadow-sm d-flex flex-column align-items-center">
//               <FiCalendar size={28} className="mb-2" />
//             </div>
//           </NavLink>
//         </div>
//       </div>

//       <div className="mt-5">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default UserProfile;

import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi'; 
import '../author/AuthorProfile.css';


function UserProfile() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="user-profile container mt-4">
      <div className="row text-center mb-4">
        <div className="col-md-3">
          <NavLink to="past-events" className="text-decoration-none">
            <div className="card p-3 shadow-sm">
              <h5>Past Events</h5>
            </div>
          </NavLink>
        </div>
        <div className="col-md-3">
          <NavLink to="registered-events" className="text-decoration-none">
            <div className="card p-3 shadow-sm">
              <h5>Registered Events</h5>
            </div>
          </NavLink>
        </div>
        <div className="col-md-3">
          <NavLink to="upcoming-events" className="text-decoration-none">
            <div className="card p-3 shadow-sm">
              <h5>Upcoming Events</h5>
            </div>
          </NavLink>
        </div>
        <div className="col-md-3">
          <NavLink to="calendar" className="text-decoration-none">
            <div className="card p-3 shadow-sm d-flex flex-column align-items-center">
              <FiCalendar size={28} className="mb-2" />
              <h5>Calendar</h5>
            </div>
          </NavLink>
        </div>
      </div>

      {/* Register Button */}
      <div className="text-center mt-4">
      <NavLink to="register" className="text-decoration-none">
            <div className="card p-3 shadow-sm">
              <h5>Register</h5>
            </div>
          </NavLink>
      </div>

      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;