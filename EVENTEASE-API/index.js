import express, { response } from "express";
import path from "path";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import registrationRoutes from "./routes/registration.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import userRoutes from "./routes/user.routes.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./middleware/session.middleware.js";
import Event from "./models/Event.js";
const __dirname = import.meta.dirname;

// Environment variable check for session secret
if (!process.env.SESSION_SECRET) {
  console.error("FATAL ERROR: SESSION_SECRET is not defined in the .env file.");
  process.exit(1);
}

// Establish connection to the MongoDB database
connectDB();

const app = express();
const PORT = process.env.PORT || "8080";

// --- Middleware Configuration ---

// Body parsing middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded

// CORS middleware to allow cross-origin requests
app.use(cors({ origin: "*" }));

// Cookie parsing middleware
app.use(cookieParser());

// Session middleware for managing user sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Should be true in a production environment with HTTPS
  })
);

// --- View Engine and Static Files ---

// Set Pug as the template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// --- API Routes ---
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);

// --- Page Routes ---

/**
 * @route   GET /dashboard
 * @desc    Renders the dashboard page for authenticated users.
 * @access  Private
 */
app.get("/dashboard", isAuthenticated, async (req, res) => {
  try {
    const events = await Event.find({}).populate("organizer", "name");
    res.render("dashboard", { user: req.session.user, events });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

/**
 * @route   GET /
 * @desc    Redirects to the main events listing page.
 * @access  Public
 */
app.get("/", (req, res) => {
  // res.status(200).json({ message: "Page loaded successfully!" });
  res.redirect("/api/events");
});

// --- Server Initialization ---
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
