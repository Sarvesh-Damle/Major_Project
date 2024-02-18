import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 8000;
dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to backend");
    });
    app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!", err);
  });

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});