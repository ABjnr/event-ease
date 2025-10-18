import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../services/AuthContext.jsx";
import "./SavedEventsPage.css";

const SavedEventsPage = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Re-add useAuth

  useEffect(() => {
    // Only fetch if the user is loaded
    if (user) {
      const fetchSavedEvents = async () => {
        try {
          const res = await api.get("/users/saved-events");
          setSavedEvents(res.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchSavedEvents();
    } else {
      // If user is not loaded yet, don't start loading events
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading saved events...</div>;
  }

  if (error) {
    return <div>Error fetching saved events: {error}</div>;
  }

  if (!savedEvents || savedEvents.length === 0) {
    return <div>You have no saved events.</div>;
  }

  return (
    <div className="saved-events-page">
      <h2>Your Saved Events</h2>
      {savedEvents.length > 0 ? (
        <div className="events-grid">
          {savedEvents.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.dateTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no saved events.</p>
      )}
    </div>
  );
};

export default SavedEventsPage;
