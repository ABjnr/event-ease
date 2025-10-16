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

// Crash the app if critical environment variables are missing
if (!process.env.SESSION_SECRET) {
  console.error("FATAL ERROR: SESSION_SECRET is not defined in the .env file.");
  process.exit(1); // Exit the process with an error code
}

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || "8080";

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded
app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);

app.get("/dashboard", isAuthenticated, async (req, res) => {
  try {
    const events = await Event.find({}).populate("organizer", "name");
    res.render("dashboard", { user: req.session.user, events });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.get("/", (req, res) => {
  // res.status(200).json({ message: "Page loaded successfully!" });
  res.redirect("/api/events");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
