import express from "express";
import {
  getNotifications,
  createNotification,
  getNotificationById,
  updateNotification,
  deleteNotification,
} from "../controllers/notification.controller.js";
import { protect, organizer } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(protect, getNotifications);
router.route("/").post(protect, createNotification);
router
  .route("/:id")
  .get(protect, getNotificationById)
  .put(protect, updateNotification)
  .delete(protect, deleteNotification);

export default router;
