import mongoose from "mongoose";

/**
 * Mongoose schema for the Notification model.
 * Defines the structure of a notification document in the database.
 */
const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    type: {
      type: String,
      enum: ["email", "in-app"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { 
    timestamps: true 
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
