import express from "express";
import {
  createRegistration,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
} from "../controllers/registration.controller.js";
import { protect, organizer } from "../middleware/auth.middleware.js";

const router = express.Router();

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
