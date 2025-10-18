import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./NotificationsPage.css";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/notifications");
        setNotifications(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>Error fetching notifications: {error}</div>;
  }

  return (
    <div className="notifications-page">
      <h2>Your Notifications</h2>
      {notifications.length > 0 ? (
        <ul className="notification-list">
          {notifications.map((notification) => (
            <li key={notification._id} className="notification-item">
              <p>{notification.message}</p>
              <div className="notification-date">
                {new Date(notification.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no new notifications.</p>
      )}
    </div>
  );
};

export default NotificationsPage;
