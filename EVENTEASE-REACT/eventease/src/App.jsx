import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventsPage from "./pages/EventsPage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";
import NotifyAttendeesPage from "./pages/NotifyAttendeesPage";
import NotificationsPage from "./pages/NotificationsPage";
import LogoutPage from "./pages/LogoutPage";
import EventAttendeesPage from "./pages/EventAttendeesPage";
import ProfilePage from "./pages/ProfilePage";
import SavedEventsPage from "./pages/SavedEventsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AboutUsPage from "./pages/AboutUsPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/events" element={<EventsPage />} />
              <Route path="/create-event" element={<CreateEventPage />} />
              <Route path="/edit-event/:id" element={<EditEventPage />} />
              <Route
                path="/notify-attendees/:id"
                element={<NotifyAttendeesPage />}
              />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route
                path="/event/:id/attendees"
                element={<EventAttendeesPage />}
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/saved-events" element={<SavedEventsPage />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
