import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./NotifyAttendeesPage.css";

const NotifyAttendeesPage = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/events/${id}/notify`, { message });
      console.log("Notification sent:", res.data);
      alert("Notifications sent successfully!");
      navigate("/events");
    } catch (err) {
      alert(
        "Failed to send notifications: " +
          (err.response ? err.response.data.message : err.message)
      );
      console.error("Failed to send notification", err);
    }
  };

  return (
    <div className="notify-attendees-page">
      <h2>Notify Attendees</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="notify-button">
          Send Notification
        </button>
      </form>
    </div>
  );
};

export default NotifyAttendeesPage;
