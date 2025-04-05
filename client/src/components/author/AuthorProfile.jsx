import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './AuthorProfile.css'

function AuthorProfile() {
  return (
    <div className="author-profile">
      <nav className="nav-bar">
        <ul className='nav-list'>
        <li>
          <NavLink to = "articles" className="nav-link">Articles</NavLink>
        </li>
        <li>
          <NavLink to = "article" className="nav-link">Add New Article</NavLink>
        </li>
        </ul>
      </nav>
      <div className="mt-5">
        <Outlet/>
      </div>
    </div>
  )
}

export default AuthorProfile