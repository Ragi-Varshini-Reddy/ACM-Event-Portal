import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {userAuthorContextObj} from '../../contexts/UserAuthorContext'
import {FaEdit} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import { MdRestore } from 'react-icons/md'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useAuth} from '@clerk/clerk-react'
import "./ArticlesByID.css"

function ArticlesByID() {
  const {state} = useLocation()
  const {currentUser} = useContext(userAuthorContextObj)
  const [editArticleStatus, setEditArticleStatus] = useState(false)
  const {register, handleSubmit, reset} = useForm()
  const navigate = useNavigate()
  const {getToken} = useAuth()
  const [currentArticle, setCurrentArticle] = useState(state)
  const [commentStatus, setCommentStatus] = useState('')
  const [ticketType, setTicketType] = useState(state.ticket_type || "free");

  // Function to change edit ststaus of article
  function enableEdit(){
    setEditArticleStatus(true)
  }

  // Function to save modified article
  async function onSave(modifiedArticle){
    const articleAfterChanges = {...state, ...modifiedArticle}
    const token = await getToken()
    const currentDate = new Date();
    // Change date of modification
    //articleAfterChanges.dateOfModification = currentDate.getDate() + '-' + currentDate.getMonth() + '-' + currentDate.getFullYear() + ' ' + currentDate.toLocaleTimeString("en-US", {hour12 : true})

    // Make hhtp post request
    let res = await axios.put(`http://localhost:3000/author-api/article/${articleAfterChanges.articleId}`, articleAfterChanges, {
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
    if(res.data.message === 'Article updated'){
      // change edit article status to false
      setEditArticleStatus(false)

      //Navigate to articles page
      navigate(`/author-profile/articles/${state.title}`, {state: res.data.payload})
    }
  }

// // Add comment by user
// async function addComment(commentObj){
//   // Add name of user to comment object
//   commentObj.nameOfUser = currentUser.firstName;
//   //http put request to add comment object to comment array
//   let res = await axios.put(`http://localhost:3000/user-api/comment/${currentArticle.articleId}`, commentObj)
//   if(res.data.message === "Comment added"){
//       const updatedArticle = {
//         ...currentArticle, comments: [...currentArticle.comments, commentObj],
//       }
//       setCurrentArticle(updatedArticle)
//       navigate(`/user-profile/articles/${currentArticle.articleId}`, {state: updatedArticle})
//       setCommentStatus(res.data.message)
//       setTimeout(() => {
//         setCommentStatus('');
//       }, 5000);
//   }
// }

  // Delete article
  async function deleteArticle(){
    state.isArticleActive = false;
    const token = await getToken()
    let res = await axios.put(`http://localhost:3000/author-api/articles/${state.title}`, state, {
      headers: {
        Authorization : `Bearer ${token}`
      }}
    )
    if(res.data.message === "Article deleted or restored"){
        setCurrentArticle(res.data.payload)
    }
    
  }
  // Restore article
  async function restoreArticle(){
    state.isArticleActive = true;
    const token = await getToken()
    let res = await axios.put(`http://localhost:3000/author-api/articles/${state.title}`, state, {
      headers: {
        Authorization : `Bearer ${token}`
      }})
    if(res.data.message === "Article deleted or restored"){
      setCurrentArticle(res.data.payload)
    }
  }


  return (
    <div className="container article-container">
      {
        !editArticleStatus ? (
          <>
            <div className="article-header d-flex justify-content-between">
              <div className="author-block">
                <p className='article-title'>{state.title}</p>
                <span className='article-meta'>
                  <small>Start Date: {state.start_time}</small>
                  <small>End Date: {state.end_time}</small>
                </span>
              </div>
              {/* <div className='author-details text-center'>
                <img src={state.authorData.profileImageUrl} className='author-img' alt="" />
                <p className='mt-3'>{state.authorData.nameOfAuthor}</p>
              </div> */}
              {
                currentUser.role === 'author' && (
                  <div className="action-buttons">
                    <button className="btn-edit" onClick={enableEdit}>
                      <FaEdit />
                    </button>
                    {state.isArticleActive ? (
                      <button className="btn-delete" onClick={deleteArticle}>
                        <MdDelete />
                      </button>
                    ) : (
                      <button className="btn-restore" onClick={restoreArticle}>
                        <MdRestore />
                      </button>
                    )}
                  </div>
                )
              }
            </div>
            <p className="article-content">{state.description}</p>
            {/* <div className="comments">
              {state.comments.length === 0 ? (
                <p className='no-comments'>No comments yet..</p>
              ) : (
                state.comments.map(commentObj => (
                  <div key={commentObj._id} className="comment-item">
                    <p className='user-name'>{commentObj.nameOfUser}</p>
                    <p className="comment">{commentObj.comment}</p>
                  </div>
                ))
              )}
            </div> */}
            {/* <h5 className='comment-status mt-3'>{commentStatus}</h5>
            {
              currentUser.role === 'user' && (
                <form onSubmit={handleSubmit((data) => {addComment(data); reset();})} className="comment-form">
                  <input type="text" {...register("comment")} className="form-control w-50" />
                  <button className='btn-submit'>Add a comment</button>
                </form>
              )
            } */}
          </>
        ) : (
<form 
  onSubmit={handleSubmit(onSave)} 
  className="edit-form" 
  style={{ 
    maxWidth: "800px", 
    margin: "20px auto", 
    padding: "30px", 
    background: "#f8f9fa", 
    borderRadius: "8px", 
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
  }}
>
  <div className="form-group" style={{ marginBottom: "20px" }}>
    <label 
      htmlFor="title" 
      style={{ 
        fontWeight: "bold", 
        fontSize: "16px", 
        marginBottom: "8px", 
        display: "block", 
        color: "#333"
      }}
    >
      Title
    </label>
    <input 
      type="text" 
      className="form-control" 
      id="title" 
      defaultValue={state.title} 
      {...register("title")} 
      style={{ 
        width: "100%", 
        padding: "10px", 
        borderRadius: "6px", 
        border: "1px solid #ccc", 
        fontSize: "16px"
      }} 
    />
  </div>
  <div className="form-group" style={{ marginBottom: "20px" }}>
    <label 
      htmlFor="category" 
      style={{ 
        fontWeight: "bold", 
        fontSize: "16px", 
        marginBottom: "8px", 
        display: "block", 
        color: "#333"
      }}
    >
      Select a category
    </label>
    <select 
      {...register("category")} 
      id="category" 
      className="form-control" 
      defaultValue={state.category} 
      style={{ 
        width: "100%", 
        padding: "10px", 
        borderRadius: "6px", 
        border: "1px solid #ccc",
        fontSize: "16px",
        background: "white"
      }}
    >
      <option value="cultural">Cultural</option>
      <option value="academic">Academic</option>
      <option value="sports">Sports</option>
      <option value="other">Other</option>
    </select>
  </div>

  <div className="form-group" style={{ marginBottom: "20px" }}>
    <label 
      htmlFor="description" 
      style={{ 
        fontWeight: "bold", 
        fontSize: "16px", 
        marginBottom: "8px", 
        display: "block", 
        color: "#333"
      }}
    >
      Description
    </label>
    <textarea 
      {...register("description")} 
      className="form-control" 
      id="content" 
      rows="10" 
      defaultValue={state.description} 
      style={{ 
        width: "100%", 
        padding: "10px", 
        borderRadius: "6px", 
        border: "1px solid #ccc", 
        fontSize: "16px", 
        resize: "vertical"
      }}
    ></textarea>
  </div>

   <div className="form-group" style={{ marginBottom: "20px" }}>
    <label 
      htmlFor="location" 
      style={{ 
        fontWeight: "bold", 
        fontSize: "16px", 
        marginBottom: "8px", 
        display: "block", 
        color: "#333"
      }}
    >
      Location
    </label>
    <input 
      type="text" 
      className="form-control" 
      id="location" 
      defaultValue={state.location} 
      {...register("location")} 
      style={{ 
        width: "100%", 
        padding: "10px", 
        borderRadius: "6px", 
        border: "1px solid #ccc", 
        fontSize: "16px"
      }} 
    />
  </div>

  <div className="form-group" style={{ marginBottom: "20px" }}>
    <label 
      htmlFor="start_time" 
      style={{ 
        fontWeight: "bold", 
        fontSize: "16px", 
        marginBottom: "8px", 
        display: "block", 
        color: "#333"
      }}
    >
      Start Time
    </label>
    <input 
      type="datetime-local" 
      className="form-control" 
      id="start_time" 
      defaultValue={state.start_time} 
      {...register("start_time")} 
      style={{ 
        width: "100%", 
        padding: "10px", 
        borderRadius: "6px", 
        border: "1px solid #ccc", 
        fontSize: "16px"
      }} 
    />
  </div>

  <div className="form-group" style={{ marginBottom: "20px" }}>
    <label 
      htmlFor="end_time" 
      style={{ 
        fontWeight: "bold", 
        fontSize: "16px", 
        marginBottom: "8px", 
        display: "block", 
        color: "#333"
      }}
    >
      End Time
    </label>
    <input 
      type="datetime-local" 
      className="form-control" 
      id="end_time" 
      defaultValue={state.end_time} 
      {...register("end_time")} 
      style={{ 
        width: "100%", 
        padding: "10px", 
        borderRadius: "6px", 
        border: "1px solid #ccc", 
        fontSize: "16px"
      }} 
    />
  </div>
  <div className="form-group" style={{ marginBottom: "20px" }}>
    <label 
      htmlFor="ticket_type" 
      style={{ 
        fontWeight: "bold", 
        fontSize: "16px", 
        marginBottom: "8px", 
        display: "block", 
        color: "#333"
      }}
    >
      Select Ticket Type
    </label>
    <select 
      {...register("ticket_type")} 
      id="ticket_type" 
      className="form-control" 
      value={ticketType}
      onChange={(e) => setTicketType(e.target.value)}
      style={{ 
        width: "100%", 
        padding: "10px", 
        borderRadius: "6px", 
        border: "1px solid #ccc",
        fontSize: "16px",
        background: "white"
      }}
    >
      <option value="free">Free</option>
      <option value="paid">Paid</option>
    </select>
  </div>

  {ticketType === "paid" && (
  <div className="form-group" style={{ marginBottom: "20px" }}>
    <label 
      htmlFor="ticket_price" 
      style={{ 
        fontWeight: "bold", 
        fontSize: "16px", 
        marginBottom: "8px", 
        display: "block", 
        color: "#333"
      }}
    >
      Ticket Price
    </label>
    <input 
      type="number" 
      className="form-control" 
      id="ticket_price" 
      defaultValue={state.ticket_price || ""} 
      {...register("ticket_price")}
      style={{ 
        width: "100%", 
        padding: "10px", 
        borderRadius: "6px", 
        border: "1px solid #ccc", 
        fontSize: "16px"
      }} 
    />
  </div>
)}

  <div className="text-end">
    <button 
      type="submit" 
      className="btn-submit" 
      style={{ 
        background: "#28a745", 
        color: "white", 
        padding: "12px 25px", 
        border: "none", 
        borderRadius: "6px", 
        cursor: "pointer",
        fontSize: "16px",
        transition: "0.3s"
      }}
      onMouseOver={(e) => e.target.style.background = "#218838"}
      onMouseOut={(e) => e.target.style.background = "#28a745"}
    >
      Save
    </button>
  </div>
</form>      
        )
      }
    </div>
  );

}

export default ArticlesByID;