import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { check } from "express-validator";

const router = express.Router();

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.get("/register", (req, res) => {
  res.render("register");
});
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

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

// @desc    Logout user and clear session
// @route   GET /api/auth/logout
// @access  Private
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
