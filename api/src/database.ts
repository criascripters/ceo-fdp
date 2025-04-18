import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("[ONLINE] Connected to mongoDB:", process.env.DATABASE_URL);
  } catch (error) {
    console.log("[OFFLINE] Error connecting to mongoDB:", error);
  }
}

connect();
