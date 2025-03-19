import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Conectado");
  } catch (error) {
    console.log(error);
  }
}

connect();
