import {useForm} from 'react-hook-form'
import { useContext } from 'react';
import axios from 'axios'
import {userAuthorContextObj} from '../../contexts/UserAuthorContext'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';

function PostArticle() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    start_time: "",
    end_time: "",
    ticket_type: "free",
    ticket_price: 0,
    participant_limit: 0
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "ticket_price" || name === "participant_limit" ? parseInt(value) : value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/author-api/article", formData);
      alert("Event created successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        start_time: "",
        end_time: "",
        image_url: "",
        ticket_type: "free",
        ticket_price: 0,
        participant_limit: 0
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create event.");
    }
  };
  // const {register, handleSubmit, formState:{errors}} = useForm();
  // const {currentUser} = useContext(userAuthorContextObj);
  // const navigate = useNavigate();

  // async function postArticle(articleObj){

  //     //create articleobj as per article schema
  //     // const authorData = {
  //     //   nameOfAuthor: currentUser.firstName,
  //     //   email: currentUser.email,
  //     //   profileImageUrl: currentUser.profileImageUrl
  //     // }
  //     // // Add author details
  //     // articleObj.authorData = authorData;
      
  //     // // Add article id which is date of creation
  //     // articleObj.articleId = Date.now();

  //     // // Add the date of creation and modification in required format
  //     // let currentDate = new Date();
  //     // articleObj.created_at = currentDate.getDate() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getFullYear() + " " + currentDate.toLocaleTimeString("en-IN", { hour12: false });

  //     // articleObj.created_at = currentDate.getDate() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getFullYear() + " " + currentDate.toLocaleTimeString("en-IN", { hour12: false });      

  //     // // Add comments array
  //     // articleObj.comments = []

  //     // // Add article active state
  //     // articleObj.isArticleActive = true

  //     // Make HTTP post request
  //     let res = await axios.post('http://localhost:3000/author-api/article', articleObj)

  //     if(res.status == 201){
  //         navigate(`/author-profile/${currentUser.email}/articles`)
  //     } else {
  //       // set error
  //     }
  //  }

return (
  // <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
  //   <div style={{ backgroundColor: "#fff", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: "10px", padding: "20px" }}>
  //     {/* Title */}
  //     <h2 style={{ color: "goldenrod", textAlign: "center", borderBottom: "2px solid goldenrod", paddingBottom: "10px" }}>
  //       Create An Event
  //     </h2>

  //     <form onSubmit={handleSubmit(postArticle)}>
  //       {/* Title Input */}
  //       <div style={{ marginBottom: "15px" }}>
  //         <label htmlFor="title" style={{ fontWeight: "bold", color: "#333" }}>Title</label>
  //         <input
  //           type="text"
  //           id="title"
  //           {...register("title")}
  //           placeholder="Enter event title..."
  //           style={{
  //             width: "100%",
  //             padding: "10px",
  //             border: "2px solid goldenrod",
  //             borderRadius: "5px",
  //             marginTop: "5px",
  //             fontSize: "16px",
  //           }}
  //         />
  //       </div>

  //       {/* Category Select */}
  //       <div style={{ marginBottom: "15px" }}>
  //         <label htmlFor="category" style={{ fontWeight: "bold", color: "#333" }}>Select a Category</label>
  //         <select
  //           {...register("category")}
  //           id="category"
  //           style={{
  //             width: "100%",
  //             padding: "10px",
  //             border: "2px solid goldenrod",
  //             borderRadius: "5px",
  //             marginTop: "5px",
  //             fontSize: "16px",
  //           }}
  //           defaultValue=""
  //         >
  //           <option value="" disabled>-- Select Category --</option>
  //           <option value="cultural">Cultural</option>
  //           <option value="academic">Academic</option>
  //           <option value="sports">Sports</option>
  //           <option value="other">Other</option>
  //         </select>
  //       </div>

  //       {/* Description Textarea */}
  //       <div style={{ marginBottom: "15px" }}>
  //         <label htmlFor="description" style={{ fontWeight: "bold", color: "#333" }}>Description</label>
  //         <textarea
  //           {...register("description")}
  //           id="description"
  //           rows="6"
  //           placeholder="Write your description here..."
  //           style={{
  //             width: "100%",
  //             padding: "10px",
  //             border: "2px solid goldenrod",
  //             borderRadius: "5px",
  //             marginTop: "5px",
  //             fontSize: "16px",
  //             resize: "vertical",
  //           }}
  //         ></textarea>
  //       </div>

  //       {/* Location */}
  //       <div style={{ marginBottom: "15px" }}>
  //         <label htmlFor="location" style={{ fontWeight: "bold", color: "#333" }}>Location</label>
  //         <input
  //           type="text"
  //           id="location"
  //           {...register("location")}
  //           placeholder="Enter event location..."
  //           style={{
  //             width: "100%",
  //             padding: "10px",
  //             border: "2px solid goldenrod",
  //             borderRadius: "5px",
  //             marginTop: "5px",
  //             fontSize: "16px",
  //           }}
  //         />
  //       </div>

  //       {/* Start Time */}
  //       <div style={{ marginBottom: "15px" }}>
  //         <label htmlFor="start_time" style={{ fontWeight: "bold", color: "#333" }}>Start Time</label>
  //         <input
  //           type="datetime-local"
  //           id="start_time"
  //           {...register("start_time")}
  //           placeholder="Enter event start time..."
  //           style={{
  //             width: "100%",
  //             padding: "10px",
  //             border: "2px solid goldenrod",
  //             borderRadius: "5px",
  //             marginTop: "5px",
  //             fontSize: "16px",
  //           }}
  //         />
  //       </div>

  //       {/* End Time */}
  //       <div style={{ marginBottom: "15px" }}>
  //         <label htmlFor="end_time" style={{ fontWeight: "bold", color: "#333" }}>End Time</label>
  //         <input
  //           type="datetime-local"
  //           id="end_time"
  //           {...register("end_time")}
  //           placeholder="Enter event start time..."
  //           style={{
  //             width: "100%",
  //             padding: "10px",
  //             border: "2px solid goldenrod",
  //             borderRadius: "5px",
  //             marginTop: "5px",
  //             fontSize: "16px",
  //           }}
  //         />
  //       </div>

  //       {/* Ticket type Select */}
  //       <div style={{ marginBottom: "15px" }}>
  //         <label htmlFor="ticket_type" style={{ fontWeight: "bold", color: "#333" }}>Select Ticket Type</label>
  //         <select
  //           {...register("ticket_type")}
  //           id="ticket_type"
  //           style={{
  //             width: "100%",
  //             padding: "10px",
  //             border: "2px solid goldenrod",
  //             borderRadius: "5px",
  //             marginTop: "5px",
  //             fontSize: "16px",
  //           }}
  //           defaultValue=""
  //         >
  //           <option value="" disabled>-- Select Category --</option>
  //           <option value="free">Free</option>
  //           <option value="paid">Paid</option>
  //         </select>
  //       </div>

  //       {/* {formData.ticket_type === "paid" && (
  //       <input type="number" name="ticket_price" value={formData.ticket_price} onChange={handleChange} placeholder="Ticket Price" className="w-full p-2 border rounded" min="1" />
  //     )} */}

  //       {/* Submit Button */}
  //       <div style={{ textAlign: "right" }}>
  //         <button
  //           type="submit"
  //           style={{
  //             backgroundColor: "goldenrod",
  //             color: "white",
  //             fontWeight: "bold",
  //             padding: "10px 20px",
  //             border: "none",
  //             borderRadius: "5px",
  //             cursor: "pointer",
  //             fontSize: "16px",
  //             transition: "background 0.3s",
  //           }}
  //           onMouseOver={(e) => (e.target.style.backgroundColor = "#c38e29")}
  //           onMouseOut={(e) => (e.target.style.backgroundColor = "goldenrod")}
  //         >
  //           Create
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // </div>
  <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <div
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h2
          style={{
            color: "goldenrod",
            textAlign: "center",
            borderBottom: "2px solid goldenrod",
            paddingBottom: "10px",
          }}
        >
          Create An Event
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="title" style={{ fontWeight: "bold", color: "#333" }}>
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title..."
              style={{
                width: "100%",
                padding: "10px",
                border: "2px solid goldenrod",
                borderRadius: "5px",
                marginTop: "5px",
                fontSize: "16px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="category" style={{ fontWeight: "bold", color: "#333" }}>
              Select a Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "2px solid goldenrod",
                borderRadius: "5px",
                marginTop: "5px",
                fontSize: "16px",
              }}
            >
              <option value="" disabled>
                -- Select Category --
              </option>
              <option value="cultural">Cultural</option>
              <option value="academic">Academic</option>
              <option value="sports">Sports</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="description" style={{ fontWeight: "bold", color: "#333" }}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              placeholder="Write your description here..."
              style={{
                width: "100%",
                padding: "10px",
                border: "2px solid goldenrod",
                borderRadius: "5px",
                marginTop: "5px",
                fontSize: "16px",
                resize: "vertical",
              }}
            ></textarea>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="location" style={{ fontWeight: "bold", color: "#333" }}>
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location..."
              style={{
                width: "100%",
                padding: "10px",
                border: "2px solid goldenrod",
                borderRadius: "5px",
                marginTop: "5px",
                fontSize: "16px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="start_time" style={{ fontWeight: "bold", color: "#333" }}>
              Start Time
            </label>
            <input
              type="datetime-local"
              id="start_time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "2px solid goldenrod",
                borderRadius: "5px",
                marginTop: "5px",
                fontSize: "16px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="end_time" style={{ fontWeight: "bold", color: "#333" }}>
              End Time
            </label>
            <input
              type="datetime-local"
              id="end_time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "2px solid goldenrod",
                borderRadius: "5px",
                marginTop: "5px",
                fontSize: "16px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="ticket_type" style={{ fontWeight: "bold", color: "#333" }}>
              Select Ticket Type
            </label>
            <select
              id="ticket_type"
              name="ticket_type"
              value={formData.ticket_type}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "2px solid goldenrod",
                borderRadius: "5px",
                marginTop: "5px",
                fontSize: "16px",
              }}
            >
              <option value="" disabled>
                -- Select Category --
              </option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {formData.ticket_type === "paid" && (
            <div style={{ marginBottom: "15px" }}>
              <input
                type="number"
                name="ticket_price"
                value={formData.ticket_price}
                onChange={handleChange}
                placeholder="Ticket Price"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "2px solid goldenrod",
                  borderRadius: "5px",
                  marginTop: "5px",
                  fontSize: "16px",
                }}
                min="1"
              />
            </div>
          )}

          <div style={{ marginBottom: "15px" }}>
          <label htmlFor="participant_limit" style={{ fontWeight: "bold", color: "#333" }}>
              Participants Limit
            </label>
            <input
              type="number"
              name="participant_limit"
              value={formData.participant_limit}
              onChange={handleChange}
              placeholder="Participant Limit"
              style={{
                width: "100%",
                padding: "10px",
                border: "2px solid goldenrod",
                borderRadius: "5px",
                marginTop: "5px",
                fontSize: "16px",
              }}
              min="1"
            />
          </div>

          <div style={{ textAlign: "right" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "goldenrod",
                color: "white",
                fontWeight: "bold",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "background 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#c38e29")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "goldenrod")}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
)
}

export default PostArticle