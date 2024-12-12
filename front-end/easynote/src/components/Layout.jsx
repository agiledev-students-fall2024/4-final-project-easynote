import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useProfile } from './ProfileContext';

const Layout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, setUser } = useProfile();
  const navigate = useNavigate();
  const navRef = useRef(null);

  const toggleNav = () => {
    setIsNavOpen(prev => !prev);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  // Close navigation when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the navigation sidebar and menu icon
      if (
        navRef.current && 
        !navRef.current.contains(event.target) && 
        !event.target.closest('.menu-icon')
      ) {
        setIsNavOpen(false);
      }
    };

    // Add event listener when nav is open
    if (isNavOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavOpen]);

  return (
    <div>
      <header className="header">
        <div className="menu-icon" onClick={toggleNav}>
          {isNavOpen ? '✕' : '☰'}
        </div>
        <div className="logo"></div>
        <div className="profile-section">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="account-icon"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />
          ) : (
            <div
              className="account-icon"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            ></div>
          )}
          {isProfileOpen && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-item">
                <strong>{user?.name}</strong>
              </div>
              <div className="profile-dropdown-item">
                {user?.occupation}
              </div>
              <div className="profile-dropdown-item">
                Studying: {user?.studying}
              </div>
              <div className="profile-dropdown-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </header>

      <nav 
        ref={navRef}
        className={`nav-sidebar ${isNavOpen ? 'nav-sidebar-open' : ''}`}
      >
        <ul className="nav-list">
          <li><Link to="/" className="nav-link" onClick={() => setIsNavOpen(false)}>Home</Link></li>
          <li><Link to="/new-note" className="nav-link" onClick={() => setIsNavOpen(false)}>New Note</Link></li>
          <li><Link to="/existing-notes" className="nav-link" onClick={() => setIsNavOpen(false)}>Existing Notes</Link></li>
          <li><Link to="/transcription" className="nav-link" onClick={() => setIsNavOpen(false)}>Speech-to-Text</Link></li>
        </ul>
      </nav>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;