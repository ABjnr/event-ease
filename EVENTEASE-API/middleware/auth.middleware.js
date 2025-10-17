import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config";



// @desc    Check if user is an admin
// @route   GET /api/auth/admin
// @access  Private
/**
 * Middleware to check if the user has an 'Admin' role.
 * Proceeds to the next middleware if the user is an admin, otherwise sends a 401 Unauthorized response.
 */
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized, you are not an admin" });
  }
};

// @desc    Protect routes
// @route   GET /api/auth/protect
// @access  Private
/**
 * Middleware to protect routes by verifying a JWT token.
 * It checks for a token in the 'Authorization' header, verifies it, and attaches the user to the request object.
 */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// @desc    Check if user is an organizer
// @route   GET /api/auth/organizer
// @access  Private
/**
 * Middleware to check if the user has an 'Organizer' or 'Admin' role.
 * Proceeds to the next middleware if the user is an organizer or admin, otherwise sends a 401 Unauthorized response.
 */
export const organizer = (req, res, next) => {
  if (req.user && (req.user.role === "Organizer" || req.user.role === "Admin")) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized, you are not an organizer" });
  }
};
