import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./EditEventPage.css";

const EditEventPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dateTime: "",
    location: "",
    category: "",
    ticketPrice: 0,
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the event ID from the URL

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        // Format the dateTime to be compatible with the datetime-local input
        const formattedDateTime = new Date(res.data.dateTime)
          .toISOString()
          .slice(0, 16);
        setFormData({ ...res.data, dateTime: formattedDateTime });
      } catch (err) {
        console.error("Error fetching event data:", err);
      }
    };
    fetchEvent();
  }, [id]);

  const { title, description, dateTime, location, category, ticketPrice } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/events/${id}`, formData);
      console.log("Event updated successfully:", res.data);
      navigate("/events");
    } catch (err) {
      console.error(
        "Event update error:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <div className="edit-event-page">
      <h2>Edit Event</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateTime">Date and Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={dateTime}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="edit-event-button">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEventPage;
