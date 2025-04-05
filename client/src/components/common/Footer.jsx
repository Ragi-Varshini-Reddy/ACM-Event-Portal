// import React from 'react'

// function Footer() {
//   return (
//     <div className='p-5 bg-dark text-white text-center display-4'>Footer</div>
//   )
// }

// export default Footer


import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <div
      style={{
        color: "#FFFFFF",
        padding: "40px 20px",
        textAlign: "center",
      }}
      className="bg-dark"
    >
      <div className="d-flex justify-content-around">
      {/* About Us Section */}
      <div style={{ marginBottom: "20px", maxWidth: "400px" }}>
        <h3>About Us</h3>
        <p style={{ fontSize: "14px", color: "#B0B0B0" }}>
          We are a platform built for storytellers, thinkers, and innovators. 
          Whether you're here to share insights or explore new ideas, we provide a 
          space where voices matter. Join us in shaping a world of creativity and knowledge.
        </p>
      </div>

      {/* Follow Us Section */}
      <div>
        <h3>Follow Us</h3>
        <div>
          <a href="#" style={{ margin: "10px", color: "#FFD700" }}>
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" style={{ margin: "10px", color: "#FFD700" }}>
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" style={{ margin: "10px", color: "#FFD700" }}>
            <i className="fab fa-facebook"></i>
          </a>
        </div>
        <p style={{ marginTop: "10px", color: "#FFD700" }}>
          Email: inkspire@gamil.com
        </p>
      </div>
      </div>
      {/* Bottom Section */}
      <p
        style={{
          marginTop: "20px",
          borderTop: "1px solid #333",
          paddingTop: "10px",
          fontSize: "14px",
          color: "#B0B0B0",
        }}
      >
        &copy; All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
