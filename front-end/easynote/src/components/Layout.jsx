import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useProfile } from './ProfileContext';
import logo from '../images/notebook-logo.png';



const Layout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, setUser } = useProfile();
  const navigate = useNavigate();
  const navRef = useRef(null);

  useEffect(() => {
    const isMobileDevice = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    setIsMobile(isMobileDevice());

    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };



    window.addEventListener('resize', handleResize);

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

  const handleViewProfile = () => {
    navigate('/view-profile');
  };

  const handleLogoClick = () => {
    navigate('/'); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current && 
        !navRef.current.contains(event.target) && 
        !event.target.closest('.menu-icon')
      ) {
        setIsNavOpen(false);
      }
    };

    if (isNavOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

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
        <button className="logo" onClick={handleLogoClick}>
          <img src={logo} className="logo-image" alt="Notebook Logo" />
        </button>
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
             {console.log("Hello===>",user)}
              <div className="profile-dropdown-item">
              <strong>Hello, {user.username}!</strong>
              </div>
              <div className="profile-dropdown-item">
                Occupation: {user?.occupation}
              </div>
              <div className="profile-dropdown-item">
                Studying: {user?.studying}
              </div>
              <div className="profile-dropdown-item">
                <button 
                className="view-profile-btn" 
                  onClick={handleViewProfile}
            >
              View Profile
            </button>
              </div>
            
              <div className="profile-dropdown-item">
                <button onClick={handleLogout}>Logout</button>
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