import React, { useContext } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import UserProfile from './components/UserProfile/UserProfile';
import { UserProvider, UserContext } from './context/UserContext';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profiles' element={<UserProfile />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

const Nav = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <div className="container-fluid">
        
        <div className="d-flex">
          <Link className="navbar-brand" to="/">Agile Track System</Link>
          <Link className="nav-link" to="/">Dashboard</Link>
        </div>
        
        
        <div>
          {user ? (
            <>
              <Link className="btn btn-outline-primary me-2" to="/profiles">Profile</Link> &nbsp;
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link className="btn btn-outline-primary" to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default App;
