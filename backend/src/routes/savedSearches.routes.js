import express from "express";
import {
  createSavedSearch,
  getMySavedSearches,
  getSavedSearch,
  updateSavedSearch,
  deleteSavedSearch,
} from "../controllers/savedSearches.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All routes require authentication
router.use(verifyJWT);

// CRUD operations
router.post("/", createSavedSearch);
router.get("/", getMySavedSearches);
router.get("/:id", getSavedSearch);
router.put("/:id", updateSavedSearch);
router.delete("/:id", deleteSavedSearch);

export default router;
