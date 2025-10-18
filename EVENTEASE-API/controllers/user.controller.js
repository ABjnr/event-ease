import User from "../models/User.js";
import connectDB from "../config/db.js";
import bcrypt from "bcrypt";

/**
 * Initializes a default organizer user in the database.
 * This is useful for seeding the database with an initial user.
 */
async function initializeUser() {
  try {
    await connectDB();
    const newUser = new User({
      name: "Organizer",
      email: "organizer@gmail.com",
      // password: bcrypt.hashSync("123456", 10),
      password: "123456",
      role: "Organizer",
      status: "active",
    });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

/**
 * Retrieves all users from the database.
 */
async function getUsers() {
  try {
    await connectDB();
    const users = await User.find();
    return users;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

/**
 * Retrieves a single user by their ID.
 */
async function getUserById(id) {
  try {
    await connectDB();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

/**
 * Updates a user's details by their ID.
 */
async function updateUserById(id, updateFields) {
  try {
    await connectDB();
    const user = await User.findByIdAndUpdate(id, updateFields);
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

/**
 * Deletes a user by their ID.
 */
async function deleteUserById(id) {
  try {
    await connectDB();
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

/**
 * Updates a user's status by their ID. Intended for Admin use.
 * @param {string} id - The ID of the user to update.
 * @param {string} status - The new status to set ('active', 'suspended', 'banned').
 * @returns {Promise<object|null>} The updated user object if found, otherwise null.
 */
async function updateUserStatus(id, status) {
  try {
    await connectDB();
    const user = await User.findByIdAndUpdate(id, { status }, { new: true });
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

/**
 * Gets the saved events for the currently logged-in user, populated with event details.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array<object>>} An array of populated event objects.
 */
async function getSavedEvents(userId) {
  try {
    await connectDB();
    const user = await User.findById(userId).populate("savedEvents");
    return user.savedEvents;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export default {
  initializeUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  updateUserStatus,
  getSavedEvents,
};
