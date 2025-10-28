import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./CreateEventPage.css";

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dateTime: "",
    location: "",
    category: "",
    ticketPrice: 0,
  });
  const navigate = useNavigate();

  const { title, description, dateTime, location, category, ticketPrice } =
    formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", formData);
      alert("Event created successfully!");
      navigate("/events");
    } catch (err) {
      console.error("Failed to create event", err);
    }
  };

  return (
    <div className="create-event-page">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateTime">Date and Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="create-event-button">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
