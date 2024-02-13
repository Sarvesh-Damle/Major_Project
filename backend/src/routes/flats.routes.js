import express from "express";
import Flat from "../models/flats.models.js";
import {
  createFlat,
  deleteFlat,
  getAllFlat,
  getFlat,
  updateFlat,
} from "../controllers/flats.controllers.js";
// import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createFlat);
// UPDATE
router.put("/:id", verifyAdmin, updateFlat);
// DELETE
router.delete("/:id", verifyAdmin, deleteFlat);
// GET
router.get("/:id", getFlat);
// GET ALL
router.get("/", getAllFlat);

export default router;
