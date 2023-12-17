import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Feed from "./pages/Feed.tsx"
import Upload from "./pages/Upload.tsx"
import Profile from "./pages/Profile.tsx"
import SinglePost from "./pages/SinglePost.tsx"
import ProtectedRoutes from './components/ProtectedRoutes.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Feed />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/upload",
    element: (
      <ProtectedRoutes>
        <Upload />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/post/:id",
    element: <SinglePost />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>,
)
