import { Routes, Route, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { useContext } from 'react'
import AuthContext from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PivateRoute';
import ProfilePage from "./pages/Profile"
import Home from './pages/Home';
import AddPost from './pages/AddPosts';
import ProfileRedirect from "./pages/ProfileRedirect";

function App() {
  const { state, handleLogout} = useContext(AuthContext)
  
  return (
    <div className="App">
        <h2>Micro-Blog App</h2>
        <ul>
          { state.isLoggedIn ? (
            <>
             <li><Link to="/dashboard">Dashboard</Link></li>
             <li><Link to="/">home</Link></li>
             <li><Link to="/profile">Profile</Link></li>
             <li><Link to='/create-posts'>Create_Post</Link></li>
             {/* <li><Link to='/my-posts'>my following posts</Link></li> */}
             <li><button onClick={handleLogout}>logout</button></li>
            </>
          ): (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />     
            </PrivateRoute>
          } />
          <Route path="/create-posts" element={
            <PrivateRoute>
              <AddPost />
            </PrivateRoute>
          } />
          
          <Route path="/" element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
            <ProfileRedirect />
            </PrivateRoute>
            } />
        </Routes>

        <ToastContainer />
    </div>
  );
}

export default App;