import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 8000;
dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
    app.on("error", (error) => {
      logger.error("Server error", { error: error.message });
      throw error;
    });
  })
  .catch((err) => {
    logger.error("MongoDB connection failed", { error: err.message });
  });

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});