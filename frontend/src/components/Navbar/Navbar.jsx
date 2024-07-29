import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Logout } from '@mui/icons-material';

const Navbar = () => {

  const { logout } = useLogout()
  const { user } = useAuthContext()
  const navigate = useNavigate();
  const handleClick = () => {
    logout()
    navigate('/');
  }
console.log(user)
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Article Rewriter
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            
            <ul className="navbar-nav ms-auto">
              
              {!user && (<li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  <LoginIcon className="me-1" />
                  Login
                </Link>
              </li>)}

              {user && (<div style={{display:'flex',alignItems:'center',gap:'4px'}}>
              <span style={{color:'white'}}>{user.email} </span>
              <button onClick={handleClick} style={{ backgroundColor: 'white', borderRadius: '20px', padding: '5px 10px', border: '1px solid black', fontSize: '14px' }}><LogoutIcon /> Logout</button>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/history"
                >History
                </Link>
              </li>
            </div>)}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
