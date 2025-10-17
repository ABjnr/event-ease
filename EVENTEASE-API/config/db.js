import mongoose from "mongoose";
import "dotenv/config";

/**
 * Establishes a connection to the MongoDB database.
 * If a connection is already established, it will do nothing.
 * The database connection URL is constructed from environment variables.
 * Exits the process if the connection fails.
 */
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return; // Already connected
  }
  const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
    // throw error;
  }
};

export default connectDB;
