import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const getLinkClass = ({ isActive }) =>
    isActive ? "navbar-link active-link" : "navbar-link";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          EventEase
        </NavLink>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </div>

        <ul className={menuOpen ? "navbar-menu active" : "navbar-menu"}>
          <li className="navbar-item">
            <NavLink
              to="/"
              className={getLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              to="/about"
              className={getLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </NavLink>
          </li>
          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <NavLink
                  to="/events"
                  className={getLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Events
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink
                  to="/notifications"
                  className={getLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Notifications
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink
                  to="/saved-events"
                  className={getLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Saved Events
                </NavLink>
              </li>
              {(user?.role === "Organizer" || user?.role === "Admin") && (
                <li className="navbar-item">
                  <NavLink
                    to="/create-event"
                    className={getLinkClass}
                    onClick={() => setMenuOpen(false)}
                  >
                    Create Event
                  </NavLink>
                </li>
              )}
              {user?.role === "Admin" && (
                <li className="navbar-item">
                  <NavLink
                    to="/admin"
                    className={getLinkClass}
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
              <li className="navbar-item">
                <NavLink
                  to="/profile"
                  className={getLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/logout" className="navbar-button">
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <NavLink to="/login" className="navbar-button">
                  Login
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/register" className="navbar-button">
                  Sign Up
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
