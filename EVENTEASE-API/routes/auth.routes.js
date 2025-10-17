import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { check } from "express-validator";

const router = express.Router();

/**
 * @route   GET /api/auth/register
 * @desc    Renders the registration page.
 * @access  Public
 */
router.get("/register", (req, res) => {
  res.render("register");
});

/**
 * @route   POST /api/auth/register
 * @desc    Handles the registration of a new user, with validation.
 * @access  Public
 */
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  registerUser
);

/**
 * @route   GET /api/auth/login
 * @desc    Renders the login page.
 * @access  Public
 */
router.get("/login", (req, res) => {
  res.render("login");
});

/**
 * @route   POST /api/auth/login
 * @desc    Handles user login, with validation.
 * @access  Public
 */
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

/**
 * @route   GET /api/auth/logout
 * @desc    Logs the user out by destroying the session.
 * @access  Private (accessible only to authenticated users)
 */
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/dashboard");
    }
    res.clearCookie("connect.sid");
    res.redirect("/api/auth/login");
  });
});

export default router;
