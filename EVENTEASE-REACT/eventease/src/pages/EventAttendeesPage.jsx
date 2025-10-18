import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "./EventAttendeesPage.css";

const EventAttendeesPage = () => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const res = await api.get(`/events/${id}/registrations`);
        setAttendees(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, [id]);

  if (loading) {
    return <div>Loading attendees...</div>;
  }

  if (error) {
    return <div>Error fetching attendees: {error}</div>;
  }

  return (
    <div className="attendees-page">
      <h2>Event Attendees</h2>
      {attendees.length > 0 ? (
        <table className="attendees-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((registration) => (
              <tr key={registration._id}>
                <td>{registration.attendee.name}</td>
                <td>{registration.attendee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendees have registered for this event yet.</p>
      )}
    </div>
  );
};

export default EventAttendeesPage;
