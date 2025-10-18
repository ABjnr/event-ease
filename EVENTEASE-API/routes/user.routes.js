import express from "express";
import { protect, admin } from "../middleware/auth.middleware.js";
import { check } from "express-validator";

const router = express.Router();

import db from "../controllers/user.controller.js";

/**
 * @route   GET /api/users/initialize
 * @desc    Initializes a default user in the database.
 * @access  Public
 */
router.get("/initialize", async (req, res) => {
  try {
    let user = await db.initializeUser();
    res.json({ message: "User initialized successfully" });
    console.log(user);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

/**
 * @route   GET /api/users/saved-events
 * @desc    Get the saved events for the current user.
 * @access  Private
 */
router.get("/saved-events", protect, async (req, res) => {
  try {
    const savedEvents = await db.getSavedEvents(req.user.id);
    res.json(savedEvents);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   PUT /api/users/profile
 * @desc    Update current user's profile.
 * @access  Private
 */
router.put("/profile", protect, async (req, res) => {
  const { name } = req.body;
  const updateFields = { updatedAt: Date.now() };
  if (name) updateFields.name = name;

  try {
    let user = await db.updateUserById(req.user.id, updateFields);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Return the updated user data
    const updatedUser = await db.getUserById(req.user.id);
    res.json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   GET /api/users
 * @desc    Get all users.
 * @access  Private (Admin)
 */
router.get("/", protect, admin, async (req, res) => {
  try {
    let users = await db.getUsers();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

/**
 * @route   GET /api/users/:id
 * @desc    Get a single user by their ID.
 * @access  Private (Admin)
 */
router.get("/:id", protect, admin, async (req, res) => {
  try {
    let user = await db.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

/**
 * @route   PUT /api/users/:id
 * @desc    Update a user's details.
 * @access  Private (Admin)
 */
router.put("/:id", protect, admin, async (req, res) => {
  const updateFields = req.body;
  updateFields.updatedAt = Date.now();
  try {
    let user = await db.updateUserById(req.params.id, updateFields);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

/**
 * @route   PUT /api/users/:id/status
 * @desc    Update a user's status (for Admins).
 * @access  Private (Admin)
 */
router.put(
  "/:id/status",
  protect,
  admin,
  [
    check("status", "Status is required").not().isEmpty(),
    check("status", "Invalid status").isIn(["active", "suspended", "banned"]),
  ],
  async (req, res) => {
    const errors = check(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await db.updateUserStatus(req.params.id, req.body.status);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User status updated successfully", user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user.
 * @access  Private (Admin)
 */
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    let user = await db.deleteUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

export default router;
