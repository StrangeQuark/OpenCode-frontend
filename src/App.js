import './App.css';
import Home from './Home';
import Blog from './Blog';
import About from './About';
import Login from './Login';
import Projects from './Projects';
import Project from './Project';
import SignUp from './SignUp';
import Question from './Question';
import ResetPasswordSearch from './ResetPasswordSearch';
import ResetPassword from './ResetPassword';
import UserProfile from './UserProfile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(
  [
    { path: "/", element: <Home />},
    { path: "/question", element: <Question />},
    { path: "/blog", element: <Blog />},
    { path: "/about", element: <About />},
    { path: "/projects", element: <Projects />},
    { path: "/login", element: <Login />},
    { path: "/signup", element: <SignUp />},
    { path: "/password-reset", element: <ResetPasswordSearch />},
    { path: "/new-password", element: <ResetPassword />},
    { path: "/project", element: <Project />},
    { path: "/user/:id", element: <UserProfile />}
  ],
  {
    future: {
      v7_startTransition: true
    },
  }
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App;
