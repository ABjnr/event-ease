import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          EventEase
        </NavLink>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776; {/* Hamburger Icon */}
        </div>

        <ul className={menuOpen ? "navbar-menu active" : "navbar-menu"}>
          <li className="navbar-item">
            <NavLink
              to="/"
              className="navbar-link"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              to="/about"
              className="navbar-link"
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
                  className="navbar-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Events
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink
                  to="/notifications"
                  className="navbar-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Notifications
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink
                  to="/saved-events"
                  className="navbar-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Saved Events
                </NavLink>
              </li>
              {user?.role === "Organizer" && (
                <li className="navbar-item">
                  <NavLink to="/create-event" className={getLinkClass}>
                    Create Event
                  </NavLink>
                </li>
              )}
              {user?.role === "Admin" && (
                <li className="navbar-item">
                  <NavLink
                    to="/admin"
                    className="navbar-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
              <li className="navbar-item">
                <NavLink
                  to="/profile"
                  className="navbar-link"
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
