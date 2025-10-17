import express from "express";
import {
  createRegistration,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
  getEventRegistrations,
} from "../controllers/registration.controller.js";
import { protect, organizer } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @route   GET /api/registrations
 * @desc    Get all registrations for an event (organizer access).
 * @access  Private (Organizer)
 */
router.route("/").get(protect, getEventRegistrations);

/**
 * @route   POST /api/registrations
 * @desc    Create a new registration.
 * @access  Private
 */
router.route("/").post(protect, createRegistration);

/**
 * @route   GET /api/registrations/:id
 * @desc    Get a single registration by its ID.
 * @access  Private
 * 
 * @route   PUT /api/registrations/:id
 * @desc    Update a registration.
 * @access  Private
 * 
 * @route   DELETE /api/registrations/:id
 * @desc    Delete a registration.
 * @access  Private
 */
router
  .route("/:id")
  .get(protect, getRegistrationById)
  .put(protect, updateRegistration)
  .delete(protect, deleteRegistration);

export default router;
