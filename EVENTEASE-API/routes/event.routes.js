import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  rsvpEvent,
} from "../controllers/event.controller.js";
import { protect, organizer } from "../middleware/auth.middleware.js";
import { check } from "express-validator";

const router = express.Router();

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

router
  .route("/:id")
  .get(getEventById)
  .put(protect, organizer, updateEvent)
  .delete(protect, organizer, deleteEvent);

router.route("/:id/rsvp").post(protect, rsvpEvent);

export default router;
