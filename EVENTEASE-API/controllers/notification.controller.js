import Notification from "../models/Notification.js";
import { validationResult } from "express-validator";
import connectDB from "../config/db.js";
// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Private
/**
 * Retrieves all notifications.
 */
export const getNotifications = async (req, res) => {
    try {
      await connectDB();
      const notifications = await Notification.find();
      res.json(notifications);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }

// @desc    Create a new notification
// @route   POST /api/notifications
// @access  Private
/**
 * Creates a new notification.
 * Notification details are taken from the request body.
 */
export const createNotification = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      await connectDB();
      const notification = await Notification.create(req.body);
      res.json(notification);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
  
  
  // @desc    Get a notification by ID
  // @route   GET /api/notifications/:id
  // @access  Private
  /**
   * Retrieves a single notification by its ID.
   */
  export const getNotificationById = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      await connectDB();
      const notification = await Notification.findById(req.params.id);
      res.json(notification);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
  
  // @desc    Update a notification
  // @route   PUT /api/notifications/:id
  // @access  Private
  /**
   * Updates a notification by its ID.
   * The update details are taken from the request body.
   */
  export const updateNotification = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      await connectDB();
      const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(notification);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
  
  // @desc    Delete a notification
  // @route   DELETE /api/notifications/:id
  // @access  Private
  /**
   * Deletes a notification by its ID.
   */
  export const deleteNotification = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      await connectDB();
      await Notification.findByIdAndDelete(req.params.id);
      res.json({ message: "Notification deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }