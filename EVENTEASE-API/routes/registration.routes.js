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

router.route("/").get(protect, getEventRegistrations);
router.route("/").post(protect, createRegistration);
router
  .route("/:id")
  .get(protect, getRegistrationById)
  .put(protect, updateRegistration)
  .delete(protect, deleteRegistration);

export default router;
