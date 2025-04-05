import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'
import Home from './components/common/Home.jsx'
import Signin from './components/common/Signin.jsx'
import Signup from './components/common/Signup.jsx'
import UserProfile from './components/user/UserProfile.jsx'
import AuthorProfile from './components/author/AuthorProfile.jsx'
import Articles from './components/common/Articles.jsx'
import ArticlesByID from './components/common/ArticlesByID.jsx'
import PostArticle from './components/author/PostArticle.jsx'
import UserAuthorContext from './contexts/UserAuthorContext.jsx'
import AdminProfile from './components/admin/AdminProfile.jsx'
import RegisteredEvents from './components/user/RegisteredEvents.jsx'
import UpcomingEvents from './components/user/UpcomingEvents.jsx'
import PastEvents from './components/user/PastEvents.jsx'
import CalendarPage from './components/calendar/CalendarPage.jsx'

const browserRouterObj = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "signin",
        element: <Signin/>
      }, 
      {
        path: "signup",
        element: <Signup/>
      },
      {
        path: "user-profile/:email",
        element: <UserProfile/>,
        children: [
          {
            path: "past-events",
            element: <PastEvents />
          },
          {
            path: "registered-events",
            element: <RegisteredEvents />
          },
          {
            path: "upcoming-events",
            element: <UpcomingEvents />
          },
          {
            path: "calendar",
            element: <CalendarPage />
          },
          {
            path: "",
            element: <RegisteredEvents />
          }
        ]
      },
      {
        path: "author-profile/:email",
        element: <AuthorProfile/>,
        children: [
          {
            path: "articles",
            element: <Articles/>
          },
          {
            path: ":articleId",
            element: <ArticlesByID/>
          },
          {
            path: "article",
            element: <PostArticle/>
          },
          {
            path: "",
            element: <Navigate to = "articles" />
          }
        ]
      },
      {
        path: "admin-profile/:email",
        element: <AdminProfile/>,
        children: []
      }
    ]
  }
],  {
  future: {
    v7_relativeSplatPath: true,

  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthorContext>
    <RouterProvider router = {browserRouterObj}/>
    </UserAuthorContext>
  </StrictMode>,
)
