import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getLinkClass = ({ isActive }) =>
    isActive ? "navbar-link active-link" : "navbar-link";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          EventEase
        </NavLink>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/about" className={getLinkClass}>
              About Us
            </NavLink>
          </li>
          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <NavLink to="/events" className={getLinkClass}>
                  Events
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/notifications" className={getLinkClass}>
                  Notifications
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/profile" className={getLinkClass}>
                  Profile
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/saved-events" className={getLinkClass}>
                  Saved Events
                </NavLink>
              </li>
              {user && user.role === "Organizer" && (
                <li className="navbar-item">
                  <NavLink to="/create-event" className={getLinkClass}>
                    Create Event
                  </NavLink>
                </li>
              )}
              {user && user.role === "Admin" && (
                <li className="navbar-item">
                  <NavLink to="/admin" className={getLinkClass}>
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <NavLink to="/login" className={getLinkClass}>
                  Login
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/register" className="navbar-button">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
