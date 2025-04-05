import React from 'react' 
import { NavLink, Outlet } from 'react-router-dom'
import '../author/AuthorProfile.css'

function UserProfile() {
  return (
    <div className="user-profile">
      <div className="nav-bar">
      <ul className="nav-list">
            <li>
              <NavLink to = "articles" className="nav-link">Articles</NavLink>
            </li>
          </ul>
      </div>
          <div className="mt-5">
            <Outlet/>
          </div>
        </div>
  )
}

export default UserProfile