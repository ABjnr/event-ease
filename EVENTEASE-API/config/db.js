import mongoose from "mongoose";
import "dotenv/config";

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



 
