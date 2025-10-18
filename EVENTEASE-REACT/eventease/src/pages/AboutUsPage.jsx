import React from 'react';
import './AboutUsPage.css';

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      <div className="about-us-header">
        <h1>About EventEase</h1>
        <p>Your ultimate solution for seamless event planning and management.</p>
      </div>
      <div className="about-us-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At EventEase, our mission is to simplify the complexity of event management for organizers and create a vibrant community for attendees. We believe that planning a memorable event should be an exciting journey, not a stressful task. Our platform provides the tools and support needed to bring any event vision to life.
          </p>
        </section>
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            We are a passionate team of developers, designers, and event enthusiasts dedicated to building a platform that empowers connection. We understand the challenges of organizing events and the joy of attending them, and we've poured that experience into creating a user-friendly, powerful, and reliable system.
          </p>
        </section>
        <section className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li><strong>For Organizers:</strong> A comprehensive suite of tools to create, manage, and promote events, track attendees, and communicate effectively.</li>
            <li><strong>For Attendees:</strong> An easy way to discover exciting events, register with a single click, and keep track of all your upcoming activities.</li>
            <li><strong>For Admins:</strong> A secure and robust dashboard to oversee the platform, manage users, and ensure a safe environment for everyone.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
