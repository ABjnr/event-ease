import React, { useState, useEffect } from "react";
import { useAuth } from "../services/AuthContext.jsx";
import api from "../services/api";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email, // Email is read-only
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/users/profile", { name: formData.name });
      alert("Profile updated successfully!");
      refreshUser(); // Refresh user data in context
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Failed to update profile.");
    }
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Role </label>
          <input type="text" value={user.role} readOnly />
        </div>
        <button type="submit" className="profile-update-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
