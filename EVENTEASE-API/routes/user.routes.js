import express from "express";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

import db from "../controllers/user.controller.js";


/**
 * @route   GET /api/users/initialize
 * @desc    Initializes a default user in the database.
 * @access  Public
 */
router.get("/initialize", async (req, res) => {
    try{
        let user = await db.initializeUser();
        res.json({ message: "User initialized successfully" });
        console.log(user);
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
});

/**
 * @route   GET /api/users
 * @desc    Get all users.
 * @access  Private (Admin)
 */
router.get("/", protect, admin, async (req, res) => {
    try{
        let users = await db.getUsers();
        if(!users){
            return res.status(404).json({ message: "No users found" });
        }
        res.json(users);
    }
    catch (error) {
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
    try{
        let user = await db.getUserById(req.params.id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
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
    try{
        let user = await db.updateUserById(req.params.id, updateFields);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully" });
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
});

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user.
 * @access  Private (Admin)
 */
router.delete("/:id", protect, admin, async (req, res) => {
    try{
        let user = await db.deleteUserById(req.params.id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
});

export default router;