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

/**
 * @route   GET /api/notifications
 * @desc    Get all notifications for the authenticated user.
 * @access  Private
 */
router.route("/").get(protect, getNotifications);

/**
 * @route   POST /api/notifications
 * @desc    Create a new notification.
 * @access  Private
 */
router.route("/").post(protect, createNotification);

/**
 * @route   GET /api/notifications/:id
 * @desc    Get a single notification by its ID.
 * @access  Private
 * 
 * @route   PUT /api/notifications/:id
 * @desc    Update a notification.
 * @access  Private
 * 
 * @route   DELETE /api/notifications/:id
 * @desc    Delete a notification.
 * @access  Private
 */
router
  .route("/:id")
  .get(protect, getNotificationById)
  .put(protect, updateNotification)
  .delete(protect, deleteNotification);

export default router;
