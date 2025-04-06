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
        Our Event and Organizer Portal streamlines the entire event journey—from creation to participation.
        Organizers can easily manage events, while users can explore, register, and track upcoming activities.
        It's a seamless, user-friendly hub for all things events.
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
          Email: Sanvaya@gmail.com
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
