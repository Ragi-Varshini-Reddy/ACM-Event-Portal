import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminProfile.css"

function AdminProfile() {
  const [users, setUsers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, authorsRes] = await Promise.all([
          axios.get("http://localhost:3000/user-api/users"),
          axios.get("http://localhost:3000/author-api/authors"),
        ]);
        setUsers(usersRes.data.payload);
        setAuthors(authorsRes.data.payload);
      } catch (error) {
        toast.error("Failed to load data. Try again!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleStatus = async (id, currentStatus, role) => {
    try {
      await axios.put(`http://localhost:3000/admin-api/update-status/${id}`, {
        isActive: !currentStatus,
      });
  
      // Re-fetch users and authors after status update
      const [usersRes, authorsRes] = await Promise.all([
        axios.get("http://localhost:3000/user-api/users"),
        axios.get("http://localhost:3000/author-api/authors"),
      ]);
      setUsers(usersRes.data.payload);
      setAuthors(authorsRes.data.payload);
  
      toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} status updated successfully`);
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to update status.");
    }
  };
  
    return (
      <div className="admin-container">
        <ToastContainer position="top-right" autoClose={3000} />
        <h2 className="admin-title">Admin Dashboard</h2>
        {loading ? (
          <div className="loading-text">Loading data...</div>
        ) : (
          <div className="container">
            {[
              { title: "Users", data: users, color: "text-primary" },
              { title: "Authors", data: authors, color: "text-success" },
            ].map((section) => (
              <div key={section.title} className="admin-card card shadow-lg p-4 mb-4">
                <h3 className={`card-title ${section.color}`}>{section.title}</h3>
                <div className="table-responsive">
                  <table className="table table-dark table-hover text-center">
                    <thead className="table-primary">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.data.map((item) => (
                        <tr key={item._id}>
                          <td>{item.firstName}</td>
                          <td>{item.email}</td>
                          <td>
                            <span
                              className={`badge ${
                                item.isActive ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {item.isActive ? "Active" : "Disabled"}
                            </span>
                          </td>
                          <td>
                            <button
                              className={`btn ${
                                item.isActive ? "btn-danger" : "btn-success"
                              } btn-sm action-btn`}
                              onClick={() => toggleStatus(item._id, item.isActive, section.title.toLowerCase())}
                            >
                              {item.isActive ? "Disable" : "Enable"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  

export default AdminProfile;