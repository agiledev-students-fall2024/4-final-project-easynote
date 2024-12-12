import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useProfile } from './ProfileContext';

const Layout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, setUser } = useProfile();
  const navigate = useNavigate();
  const navRef = useRef(null);

  useEffect(() => {
    // Check if the device is mobile
    const isMobileDevice = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    setIsMobile(isMobileDevice());

    // Add event listener to detect window resize
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        <div 
          className={`menu-icon ${isMobile ? 'mobile-menu-icon' : ''}`} 
          onClick={toggleNav}
        >
          {isNavOpen ? '✕' : '☰'}
        </div>
        <div className="logo"></div>
        <div className="profile-section">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className={`account-icon ${isMobile ? 'mobile-account-icon' : ''}`}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />
          ) : (
            <div
              className={`account-icon ${isMobile ? 'mobile-account-icon' : ''}`}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            ></div>
          )}
          {isProfileOpen && (
            <div className={`profile-dropdown ${isMobile ? 'mobile-profile-dropdown' : ''}`}>
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
        className={`nav-sidebar ${isNavOpen ? 'nav-sidebar-open' : ''} ${isMobile ? 'mobile-nav-sidebar' : ''}`}
      >
        <ul className="nav-list">
          <li><Link to="/" className="nav-link" onClick={() => setIsNavOpen(false)}>Home</Link></li>
          <li><Link to="/new-note" className="nav-link" onClick={() => setIsNavOpen(false)}>New Note</Link></li>
          <li><Link to="/existing-notes" className="nav-link" onClick={() => setIsNavOpen(false)}>Existing Notes</Link></li>
          <li><Link to="/transcription" className="nav-link" onClick={() => setIsNavOpen(false)}>Speech-to-Text</Link></li>
        </ul>
      </nav>

      <main className={`container ${isMobile ? 'mobile-container' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;