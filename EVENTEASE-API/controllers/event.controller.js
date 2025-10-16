import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import { validationResult } from "express-validator";

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Organizer
export const createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, dateTime, location, category, ticketPrice } =
    req.body;

  try {
    const event = new Event({
      title,
      description,
      dateTime,
      location,
      category,
      ticketPrice,
      organizer: req.user._id, // This works because 'protect' middleware creates req.user
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).populate("organizer", "name email");
    res.json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "organizer",
      "name email"
    );

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Organizer
export const updateEvent = async (req, res) => {
  const { title, description, dateTime, location, category, ticketPrice } =
    req.body;

  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "User not authorized" });
      }

      event.title = title || event.title;
      event.description = description || event.description;
      event.dateTime = dateTime || event.dateTime;
      event.location = location || event.location;
      event.category = category || event.category;
      event.ticketPrice = ticketPrice ?? event.ticketPrice;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Organizer
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      // if (event.organizer.toString() !== req.user._id.toString()) {
      //   return res.status(401).json({ message: "User not authorized" });
      // }

      await Event.deleteOne({ _id: req.params.id });
      res.json({ message: "Event removed" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    RSVP to an event
// @route   POST /api/events/:id/rsvp
// @access  Private
export const rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const existingRegistration = await Registration.findOne({
      event: req.params.id,
      attendee: req.user._id,
    });

    if (existingRegistration) {
      return res
        .status(400)
        .json({ message: "Already registered for this event" });
    }

    const registration = new Registration({
      event: req.params.id,
      attendee: req.user._id,
    });

    await registration.save();
    res.status(201).json({ message: "RSVP successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
