import express from "express";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "../controllers/notificationPreferences.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All routes require authentication
router.use(verifyJWT);

router.get("/", getNotificationPreferences);
router.put("/", updateNotificationPreferences);

export default router;
