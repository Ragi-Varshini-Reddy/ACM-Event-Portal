// import { useContext, useEffect, useState } from 'react'
// import {userAuthorContextObj} from '../../contexts/UserAuthorContext'
// import {useUser} from '@clerk/clerk-react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import './Home.css'
// import { MdWavingHand } from "react-icons/md";

// function Home() {

//   const {currentUser, setCurrentUser} = useContext(userAuthorContextObj)
//   const {isSignedIn, user, isLoaded} = useUser()
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

  
//   const handleSignUp = () => {
//     navigate('/signup'); 
//   };

//  async function onSelectRole(e){
//     setError('')
//     const selectedRole = e.target.value;
//     currentUser.role = selectedRole;
//      // Check if user is disabled before making API request
//      console.log("Current User:", currentUser);

//     let res = null;
//     try{
//       if (selectedRole === 'author'){
//         res = await axios.post('http://localhost:3000/author-api/author', currentUser)
//         let {message, payload} = res.data;
//         if(message === 'author'){
//           setCurrentUser({...currentUser, ...payload})
//           // save user to localstorage (to deal with refresh)
//           localStorage.setItem("currentUser", JSON.stringify(payload))
//         } else {
//           setError(message);
//         }
//       }
//       if(selectedRole === 'user'){
//         res = await axios.post('http://localhost:3000/user-api/user', currentUser)
//         let {message, payload} = res.data;
//         if(message === 'user'){
//           setCurrentUser({...currentUser, ...payload})
//           // save user to localstorage (to deal with refresh)
//           localStorage.setItem("currentUser", JSON.stringify(payload))
//         } else {
//           setError(message);
//         }
//       }
//       if(selectedRole === 'admin'){
//         res = await axios.post('http://localhost:3000/admin-api/admin', currentUser)
//         let {message, payload} = res.data;
//         if(message === 'admin'){
//           setCurrentUser({...currentUser, ...payload})
//           // save user to localstorage (to deal with refresh)
//           localStorage.setItem("currentUser", JSON.stringify(payload))
//         } else {
//           setError(message);
//         }
//       }
//     }
//     catch(err){
//       setError(err.message);
//     }
//   }


//   useEffect(() => {
//     if(isSignedIn === true){
//     setCurrentUser({
//       ...currentUser,
//       firstName: user?.firstName,
//       lastName: user?.lastName,
//       email: user?.emailAddresses[0].emailAddress,
//       profileImageUrl: user?.imageUrl,
//     });
//   }
//   }, [isLoaded, user, isSignedIn])


//   useEffect(() => {
//     if (currentUser?.role === 'user' && error.length === 0){
//       navigate(`/user-profile/${currentUser.email}`);
//     }
//     if (currentUser?.role === 'author' && error.length === 0){
//       navigate(`/author-profile/${currentUser.email}`);
//     }
//     if (currentUser?.role === 'admin' && error.length === 0){
//       navigate(`/admin-profile/${currentUser.email}`);
//     }
//   }, [currentUser]);

//   return (
//     <div className='container'>
//           {
//   isSignedIn === false && 
//   // <div className="welcome-section text-center text-white">
//   //   <div className="banner-container d-flex justify-content-center">
//   //     <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794" alt="Welcome Banner" className="banner-img" />
//   //   </div>
//   //   <div className="mt-4">
//   //     <h1 className="fw-bold">Welcome to Our Community!</h1>
//   //     <p className="lead">Join a platform where <b>authors share their stories</b> and <b>readers explore endless inspiration</b>.</p>
//   //     <p className="fs-5">Be part of something exciting. Sign up today and start your journey!</p>
//   //     <button onClick={handleSignUp} className="btn btn-lg btn-warning text-dark fw-bold mt-3 px-4">
//   //       Get Started
//   //     </button>
//   //   </div>
//   // </div>

//   <div className="welcome-section text-white">
//     <div className="container">
//       <div className="row align-items-center">
//         {/* Banner Image */}
//         <div className="col-lg-6 d-flex justify-content-center justify-content-lg-start mb-4 mb-lg-0">
//           <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794" alt="Welcome Banner" className="banner-img" />
//         </div>

//         {/* Text Content */}
//         <div className="col-lg-6 text-center text-lg-start d-flex flex-column justify-content-center">
//           <h1 className="fw-bold mb-3 text-center">Welcome to Our Community!</h1>
//           <p className="lead mb-3 text-center">Join a platform where <b>authors share their stories</b> and <b>readers explore endless inspiration</b>.</p>
//           <p className="fs-5 mb-4 text-center">Be part of something exciting. Sign up today and start your journey!</p>
//           <div className="text-center">
//             <button onClick={handleSignUp} className="btn btn-lg btn-warning text-dark fw-bold mt-3 px-4">
//               Get Started
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// }
//       {
//         isSignedIn === true && 
//       <div className="container">
//       <div className="card p-3 text-white">
//         <div className="bg-secondary p-3 rounded-top">
//           <p className="display-6">Hi, {user.firstName} ! <MdWavingHand className="ms-2 text-warning" size={30}/></p>
//         </div>
//         <div className="cardbody">
//           <p className="lead">*Select role</p>
//           {error.length !== 0 && (
//             <p className="text-danger text-center">{error}</p>
//           )}
//           <div className="d-flex role-radio py-3 justify-content-center bg-accent rounded">
//             <div className="form-check mx-3">
//               <input
//                 type="radio"
//                 name="role"
//                 value="author"
//                 className="form-check-input"
//                 id="author"
//                 onChange={onSelectRole}
//               />
//               <label htmlFor="author" className="form-check-label text-white">
//                 Author
//               </label>
//             </div>
//             <div className="form-check mx-3">
//               <input
//                 type="radio"
//                 name="role"
//                 value="user"
//                 className="form-check-input"
//                 id="user"
//                 onChange={onSelectRole}
//               />
//               <label htmlFor="user" className="form-check-label text-white">
//                 User
//               </label>
//             </div>
//             <div className="form-check mx-3">
//               <input
//                 type="radio"
//                 name="role"
//                 value="admin"
//                 className="form-check-input"
//                 id="admin"
//                 onChange={onSelectRole}
//               />
//               <label htmlFor="admin" className="form-check-label text-white">
//                 Admin
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//       }
      
//     </div>
//   )
// }

// export default Home 


import { useContext, useEffect, useState } from 'react';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdWavingHand } from "react-icons/md";
import './Home.css';

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch user role after sign-in
  // useEffect(() => {
  //   const fetchRole = async () => {
  //     if (isSignedIn && user) {
  //       const email = user?.emailAddresses[0].emailAddress;

  //       try {
  //         const res = await axios.post('http://localhost:3000/checkRole/get-role', { email });
  //         const { message, payload } = res.data;

  //         if (['user', 'author', 'admin'].includes(message)) {
  //           const userInfo = {
  //             ...payload,
  //             role: message,
  //             firstName: user?.firstName,
  //             lastName: user?.lastName,
  //             email: email,
  //             profileImageUrl: user?.imageUrl
  //           };

  //           setCurrentUser(userInfo);
  //           localStorage.setItem('currentUser', JSON.stringify(userInfo));
  //         } else {
  //           navigate('/signup');
  //         }
  //       } catch (err) {
  //         console.error("Role check error:", err);
  //         navigate('/signup');
  //       }
  //     }
  //   };

  //   fetchRole();
  // }, [isSignedIn]);

  useEffect(() => {
    const fetchOrCreateUser = async () => {
      if (isSignedIn && user) {
        const email = user?.emailAddresses[0].emailAddress;
  
        try {
          // 1. Check if user already exists
          const res = await axios.post('http://localhost:3000/checkRole/get-role', { email });
          const { message, payload } = res.data;
  
          if (['user', 'author', 'admin'].includes(message)) {
            const userInfo = {
              ...payload,
              role: message,
              firstName: user?.firstName,
              lastName: user?.lastName,
              email: email,
              profileImageUrl: user?.imageUrl
            };
  
            setCurrentUser(userInfo);
            localStorage.setItem('currentUser', JSON.stringify(userInfo));
            navigate(`/${message}-profile/${userInfo.email}`);
          } else {
            throw new Error("Invalid role received");
          }
        } catch (err) {
          // 2. If user not found, create them
          console.warn("User not found, creating new user...");
  
          const newUser = {
            email: email,
            firstName: user?.firstName,
            lastName: user?.lastName,
            profileImageUrl: user?.imageUrl,
            role: 'user'
          };
  
          try {
            const createRes = await axios.post('http://localhost:3000/user-api/user', newUser);
            const createdUser = createRes.data.payload;
  
            const userInfo = {
              ...createdUser,
              ...newUser
            };
  
            setCurrentUser(userInfo);
            localStorage.setItem('currentUser', JSON.stringify(userInfo));
            navigate(`/user-profile/${userInfo.email}`); // Adjust as per your routing
          } catch (createErr) {
            console.error("Failed to create user:", createErr);
          }
        }
      }
    };
  
    fetchOrCreateUser();
  }, [isSignedIn]);
  
  

  // Navigate based on role
  useEffect(() => {
    if (currentUser?.role === 'user') {
      navigate(`/user-profile/${currentUser.email}`);
    } else if (currentUser?.role === 'author') {
      navigate(`/author-profile/${currentUser.email}`);
    } else if (currentUser?.role === 'admin') {
      navigate(`/admin-profile/${currentUser.email}`);
    }
  }, [currentUser]);

  return (
    <div className='container'>
      {
        isSignedIn === false &&
        <div className="welcome-section text-white">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 d-flex justify-content-center justify-content-lg-start mb-4 mb-lg-0">
                <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794" alt="Welcome Banner" className="banner-img" />
              </div>
              <div className="col-lg-6 text-center text-lg-start d-flex flex-column justify-content-center">
                <h1 className="fw-bold mb-3 text-center">Welcome to Our Community!</h1>
                <p className="lead mb-3 text-center">Join a platform where <b>authors share their stories</b> and <b>readers explore endless inspiration</b>.</p>
                <p className="fs-5 mb-4 text-center">Be part of something exciting. Sign up today and start your journey!</p>
                <div className="text-center">
                  <button onClick={() => navigate('/signup')} className="btn btn-lg btn-warning text-dark fw-bold mt-3 px-4">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      {
        isSignedIn && isLoaded &&
        <div className="container">
          <div className="card p-3 text-white">
            <div className="bg-secondary p-3 rounded-top">
              <p className="display-6">Hi, {user.firstName}! <MdWavingHand className="ms-2 text-warning" size={30} /></p>
              {error && <p className="text-danger mt-3">{error}</p>}
              <p className="text-white mt-2">We're checking your profile...</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Home;
