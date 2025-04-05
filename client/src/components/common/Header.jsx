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
        <Link to="/" className="logo">Inksprie</Link>
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
                <span className="role">{currentUser?.role}</span>
              </div>
              <p className="mb-0 user-name">{user.firstName}</p>
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
