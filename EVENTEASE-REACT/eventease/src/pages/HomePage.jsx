import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./HomePage.css";

const HomePage = () => {
  const [randomEvents, setRandomEvents] = useState([]);

  useEffect(() => {
    const fetchAndSelectRandomEvents = async () => {
      try {
        const res = await api.get("/events");
        // Shuffle the array and take the first 3
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        setRandomEvents(shuffled.slice(0, 3));
      } catch (err) {
        console.error("Could not fetch events for homepage", err);
      }
    };
    fetchAndSelectRandomEvents();
  }, []);

  return (
    <div className="homepage">
      <h1>Welcome to EventEase</h1>
      <p>Your one-stop solution for event management.</p>

      <h2>Discover Events</h2>
      {randomEvents.length > 0 ? (
        <div className="events-grid">
          {randomEvents.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading exciting events...</p>
      )}

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Discover</h3>
            <p>
              Browse a wide variety of events from tech workshops to community
              gatherings.
            </p>
          </div>
          <div className="step">
            <h3>2. Register</h3>
            <p>
              Sign up for events you're interested in with just a single click.
            </p>
          </div>
          <div className="step">
            <h3>3. Attend</h3>
            <p>
              Get notifications and reminders, and enjoy your event experience.
            </p>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>For Organizers & Attendees</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Easy Event Creation</h3>
            <p>Organizers can set up a detailed event page in minutes.</p>
          </div>
          <div className="feature-card">
            <h3>Simple RSVP</h3>
            <p>Attendees can register for events without any hassle.</p>
          </div>
          <div className="feature-card">
            <h3>Stay Notified</h3>
            <p>Receive important updates and reminders about your events.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
