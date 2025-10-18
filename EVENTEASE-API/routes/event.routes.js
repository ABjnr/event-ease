import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  notifyAttendees,
  saveEvent,
  unsaveEvent,
} from "../controllers/event.controller.js";
import { getEventRegistrations } from "../controllers/registration.controller.js";
import { protect, organizer } from "../middleware/auth.middleware.js";
import { check } from "express-validator";

const router = express.Router();

/**
 * @route   GET /api/events
 * @desc    Get all events.
 * @access  Public
 *
 * @route   POST /api/events
 * @desc    Create a new event, with validation.
 * @access  Private (Organizer)
 */
router
  .route("/")
  .get(getEvents)
  .post(
    protect,
    organizer,
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("dateTime", "Date and time are required").not().isEmpty(),
      check("location", "Location is required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
    ],
    createEvent
  );

/**
 * @route   GET /api/events/:id
 * @desc    Get a single event by its ID.
 * @access  Public
 *
 * @route   PUT /api/events/:id
 * @desc    Update an event.
 * @access  Private (Organizer)
 *
 * @route   DELETE /api/events/:id
 * @desc    Delete an event.
 * @access  Private (Organizer)
 */
router
  .route("/:id")
  .get(getEventById)
  .put(protect, organizer, updateEvent)
  .delete(protect, organizer, deleteEvent);

/**
 * @route   POST /api/events/:id/rsvp
 * @desc    RSVP to an event.
 * @access  Private (Authenticated User)
 */
router.route("/:id/rsvp").post(protect, rsvpEvent);

router
  .route("/:id/notify")
  .post(
    protect,
    organizer,
    [check("message", "Message is required").not().isEmpty()],
    notifyAttendees
  );

router
  .route("/:id/registrations")
  .get(protect, organizer, getEventRegistrations);

router
  .route("/:id/save")
  .post(protect, saveEvent)
  .delete(protect, unsaveEvent);

export default router;
