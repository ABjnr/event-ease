import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../services/AuthContext.jsx";
import "./EventsPage.css";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRsvp = async (eventId) => {
    try {
      const res = await api.post(`/events/${eventId}/rsvp`);
      alert("RSVP successful!");
      console.log("RSVP response:", res.data);
    } catch (err) {
      alert(
        "RSVP failed: " +
          (err.response ? err.response.data.message : err.message)
      );
      console.error(
        "RSVP error:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/events/${eventId}`);
        alert("Event deleted successfully!");
        fetchEvents();
      } catch (err) {
        alert(
          "Failed to delete event: " +
            (err.response ? err.response.data.message : err.message)
        );
        console.error(
          "Delete error:",
          err.response ? err.response.data : err.message
        );
      }
    }
  };

  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  const handleNotify = (eventId) => {
    navigate(`/notify-attendees/${eventId}`);
  };

  const handleViewAttendees = (eventId) => {
    navigate(`/event/${eventId}/attendees`);
  };

  const handleSave = async (eventId) => {
    try {
      await api.post(`/events/${eventId}/save`);
      alert("Event saved!");
      refreshUser(); // Refresh the user data to update savedEvents
    } catch (err) {
      alert(
        "Failed to save event: " +
          (err.response ? err.response.data.message : err.message)
      );
    }
  };

  const handleUnsave = async (eventId) => {
    try {
      await api.delete(`/events/${eventId}/save`);
      alert("Event unsaved!");
      refreshUser(); // Refresh the user data to update savedEvents
    } catch (err) {
      alert(
        "Failed to unsave event: " +
          (err.response ? err.response.data.message : err.message)
      );
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearchTerm = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? event.category === categoryFilter
      : true;
    const matchesLocation = locationFilter
      ? event.location === locationFilter
      : true;
    const matchesDate = dateFilter
      ? new Date(event.dateTime).toLocaleDateString() ===
        new Date(dateFilter).toLocaleDateString()
      : true;
    return (
      matchesSearchTerm && matchesCategory && matchesLocation && matchesDate
    );
  });

  // Get unique categories and locations for filter dropdowns
  const categories = [...new Set(events.map((event) => event.category))];
  const locations = [...new Set(events.map((event) => event.location))];

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error fetching events: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}
              </p>
              <p>
                <strong>Organizer:</strong>{" "}
                {event.organizer ? event.organizer.name : "Unknown"}
              </p>
              <div className="event-actions">
                {user && user.role === "Attendee" && (
                  <>
                    <button onClick={() => handleRsvp(event._id)} className="btn btn-primary">RSVP</button>
                    {user.savedEvents?.includes(event._id) ? (
                      <button onClick={() => handleUnsave(event._id)} className="btn btn-secondary">
                        Unsave
                      </button>
                    ) : (
                      <button onClick={() => handleSave(event._id)} className="btn btn-secondary">
                        Save
                      </button>
                    )}
                  </>
                )}
                {user && event.organizer && user._id === event.organizer._id && (
                  <>
                    <button onClick={() => handleEdit(event._id)} className="btn btn-primary">Edit</button>
                    <button onClick={() => handleDelete(event._id)} className="btn btn-danger">
                      Delete
                    </button>
                    <button onClick={() => handleNotify(event._id)} className="btn btn-secondary">
                      Notify
                    </button>
                    <button onClick={() => handleViewAttendees(event._id)} className="btn btn-secondary">
                      Attendees
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
