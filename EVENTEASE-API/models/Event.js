import mongoose from "mongoose";

/**
 * Mongoose schema for the Event model.
 * Defines the structure of an event document in the database.
 */
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ticketPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "flagged"],
      default: "active",
    },
  },
  { 
    timestamps: true 
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
