import User from "../models/User.js";
import connectDB from "../config/db.js";
import bcrypt from "bcrypt";

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
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
}

async function getUsers() {
    try {
        await connectDB();
        const users = await User.find();
        return users;
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
}

async function getUserById(id) {
    try {
        await connectDB();
        const user = await User.findById(id);
        return user;
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
}

async function updateUserById(id, updateFields) {
    try {
        await connectDB();
        const user = await User.findByIdAndUpdate(id, updateFields);
        return user;
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
}

async function deleteUserById(id) {
    try {
        await connectDB();
        const user = await User.findByIdAndDelete(id);
        return user;
    }
    catch (error) {
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
}
