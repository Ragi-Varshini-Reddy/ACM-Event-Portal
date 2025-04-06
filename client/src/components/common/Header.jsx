// import { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useClerk, useUser } from '@clerk/clerk-react';
// import { userAuthorContextObj } from '../../contexts/UserAuthorContext';

// function Header() {
//   const { signOut } = useClerk();
//   const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
//   const navigate = useNavigate();
//   const { isSignedIn, user, isLoaded } = useUser();

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       setCurrentUser(null);
//       localStorage.clear();
//       navigate('/');
//     } catch (err) {
//       console.error('Error signing out:', err);
//     }
//   };

//   return (
//     <header className="header-container">
//       <nav className="navbar navbar-expand-lg">
//         <div className="navbar-nav ms-auto mt-2">
//           {!isSignedIn ? (
//             <>
//               <Link to="/" className="nav-link">Home</Link>
//               <Link to="/signin" className="nav-link">Signin</Link>
//               <Link to="/signup" className="nav-link">Signup</Link>
//             </>
//           ) : (
//             <div className="user-button position-relative">
//               <div className="position-relative">
//                 <img
//                   src={user.imageUrl}
//                   className="user-img"
//                   alt="User"
//                 />
//                 <span className="role">{currentUser?.role}</span>
//               </div>
//               <p className="mb-0 user-name">{user.firstName}</p>
//               <button className="btn btn-danger ms-3" onClick={handleSignOut}>
//                 Sign Out
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header; 


// import { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useClerk, useUser } from '@clerk/clerk-react';
// import { userAuthorContextObj } from '../../contexts/UserAuthorContext';
// import { FaBars } from 'react-icons/fa';
// import { useState } from 'react';

// function Header() {
//   const { signOut } = useClerk();
//   const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
//   const navigate = useNavigate();
//   const { isSignedIn, user, isLoaded } = useUser();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       setCurrentUser(null);
//       localStorage.clear();
//       navigate('/');
//     } catch (err) {
//       console.error('Error signing out:', err);
//     }
//   };

//   return (
//     <header className="header-container">
//       <nav className="navbar navbar-expand-lg">
//         <div className="navbar-brand">
//           <Link to="/" className="logo">MyApp</Link>
//         </div>
//         <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//           <FaBars />
//         </button>
//         <div className={`navbar-nav ${isMenuOpen ? 'show' : ''}`}>
//           {!isSignedIn ? (
//             <>
//               <Link to="/" className="nav-link">Home</Link>
//               <Link to="/signin" className="nav-link">Signin</Link>
//               <Link to="/signup" className="nav-link">Signup</Link>
//             </>
//           ) : (
//             <div className="user-button position-relative">
//               <div className="position-relative">
//                 <img
//                   src={user.imageUrl}
//                   className="user-img"
//                   alt="User"
//                 />
//                 <span className="role">{currentUser?.role}</span>
//               </div>
//               <p className="mb-0 user-name">{user.firstName}</p>
//               <button className="btn btn-danger" onClick={handleSignOut}>
//                 Sign Out
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;

import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';

function Header() {
  const { signOut } = useClerk();
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setCurrentUser(null);
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Automatically close menu if resizing above 992px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header-container">
      <nav className="navbar navbar-expand-lg">
        <Link to="/" className="logo"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-calendar-date me-2" viewBox="0 0 16 16">
  <path d="M6.445 11.688V6.354h-.633A13 13 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23"/>
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
</svg>Sanvaya</Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776; 
        </button>

        <div className={`navbar-nav ${menuOpen ? 'show' : ''}`}>
          {!isSignedIn ? (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/signin" className="nav-link">Signin</Link>
              <Link to="/signup" className="nav-link">Signup</Link>
            </>
          ) : (
            <div className="user-button position-relative">
              <div className="position-relative">
                <img
                  src={user.imageUrl}
                  className="user-img"
                  alt="User"
                />
                <span className="role">{currentUser?.role === "author" ? "organizer" : "student"}</span>
              </div>
              <p className="mb-0 user-name">{user.firstName + " " + user.lastName}</p>
              <button className="btn btn-danger ms-3" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
