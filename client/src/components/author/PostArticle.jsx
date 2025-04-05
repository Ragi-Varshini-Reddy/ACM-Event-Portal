import {useForm} from 'react-hook-form'
import { useContext } from 'react';
import axios from 'axios'
import {userAuthorContextObj} from '../../contexts/UserAuthorContext'
import {useNavigate} from 'react-router-dom'

function PostArticle() {
  const {register, handleSubmit, formState:{errors}} = useForm();
  const {currentUser} = useContext(userAuthorContextObj)
  const navigate = useNavigate()

  async function postArticle(articleObj){

      //create articleobj as per article schema
      const authorData = {
        nameOfAuthor: currentUser.firstName,
        email: currentUser.email,
        profileImageUrl: currentUser.profileImageUrl
      }
      // Add author details
      articleObj.authorData = authorData;
      
      // Add article id which is date of creation
      articleObj.articleId = Date.now();

      // Add the date of creation and modification in required format
      let currentDate = new Date();
      articleObj.dateOfCreation = currentDate.getDate() + "-" + currentDate.getMonth() + "-" + currentDate.getFullYear() + " " + currentDate.toLocaleTimeString("en-US", {hour12 : true})

      articleObj.dateOfModification = currentDate.getDate() + "-" + currentDate.getMonth() + "-" + currentDate.getFullYear() + " " + currentDate.toLocaleTimeString("en-US", {hour12 : true})

      // Add comments array
      articleObj.comments = []

      // Add article active state
      articleObj.isArticleActive = true

      // Make HTTP post request
      let res = await axios.post('http://localhost:3000/author-api/article', articleObj)

      if(res.status == 201){
          navigate(`/author-profile/${currentUser.email}/articles`)
      } else {
        // set error
      }
   }

return (
  <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
    <div style={{ backgroundColor: "#fff", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: "10px", padding: "20px" }}>
      {/* Title */}
      <h2 style={{ color: "goldenrod", textAlign: "center", borderBottom: "2px solid goldenrod", paddingBottom: "10px" }}>
        Write an Article
      </h2>

      <form onSubmit={handleSubmit(postArticle)}>
        {/* Title Input */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="title" style={{ fontWeight: "bold", color: "#333" }}>Title</label>
          <input
            type="text"
            id="title"
            {...register("title")}
            placeholder="Enter article title..."
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

        {/* Category Select */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="category" style={{ fontWeight: "bold", color: "#333" }}>Select a Category</label>
          <select
            {...register("category")}
            id="category"
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid goldenrod",
              borderRadius: "5px",
              marginTop: "5px",
              fontSize: "16px",
            }}
            defaultValue=""
          >
            <option value="" disabled>-- Select Category --</option>
            <option value="programming">Programming</option>
            <option value="AI&ML">AI & ML</option>
            <option value="database">Database</option>
          </select>
        </div>

        {/* Content Textarea */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="content" style={{ fontWeight: "bold", color: "#333" }}>Content</label>
          <textarea
            {...register("content")}
            id="content"
            rows="6"
            placeholder="Write your article here..."
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

        {/* Submit Button */}
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
            Post
          </button>
        </div>
      </form>
    </div>
  </div>
)
}

export default PostArticle