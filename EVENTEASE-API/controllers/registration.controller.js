import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import connectDB from "../config/db.js";
import { validationResult } from "express-validator";
// @desc    Get registrations for an event
// @route   GET /api/events/:id/registrations
// @access  Private/Organizer
export const getEventRegistrations = async (req, res) => {
    try {
      await connectDB();
      const registrations = await Registration.find({}).populate("attendee", "name email");
      res.json(registrations);  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
};

  // @desc    Get a registration by ID
  // @route   GET /api/registrations/:id
  // @access  Private
export const getRegistrationById = async (req, res) => {
    try {
      await connectDB();
      const registration = await Registration.findById(req.params.id);
      res.json(registration);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }

  // @desc    Create a new registration
  // @route   POST /api/registrations
  // @access  Private
  export const createRegistration = async (req, res) => {
    try {
      await connectDB();
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const registration = await Registration.create(req.body);
      res.json(registration);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
}

  // @desc    Update a registration
  // @route   PUT /api/registrations/:id
  // @access  Private
export const updateRegistration = async (req, res) => {
    try {
      await connectDB();
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const registration = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(registration);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
}

  // @desc    Delete a registration
  // @route   DELETE /api/registrations/:id
  // @access  Private
export const deleteRegistration = async (req, res) => {
    try {
      await connectDB();
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      await Registration.findByIdAndDelete(req.params.id);
      res.json({ message: "Registration deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
}