import mongoose from "mongoose";

/**
 * Mongoose schema for the Registration model.
 * Represents a user's registration for an event.
 */
const registrationSchema = new mongoose.Schema(
  {
   
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    attendee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { 
    timestamps: true 
  }
);

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
