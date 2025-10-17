import mongoose from "mongoose";
import bcrypt from "bcrypt";

/**
 * Mongoose schema for the User model.
 * Defines the structure of a user document in the database.
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Organizer", "Attendee", "Admin"],
      default: "Attendee",
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  { 
    timestamps: true 
  }
);

/**
 * Mongoose pre-save hook to hash the user's password before saving it to the database.
 * The hashing is only performed if the password field has been modified.
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Method on the user schema to compare an entered password with the hashed password in the database.
 * @param {string} enteredPassword - The password to compare.
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise.
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
