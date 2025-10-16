import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config";



// @desc    Check if user is an admin
// @route   GET /api/auth/admin
// @access  Private
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
export const organizer = (req, res, next) => {
  if (req.user && req.user.role === "Organizer" || req.user.role === "Admin") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized, you are not an organizer" });
  }
};
