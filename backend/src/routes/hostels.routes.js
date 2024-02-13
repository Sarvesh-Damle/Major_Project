import express from "express";
import Hostel from "../models/hostels.models.js";
import {
  countByAddress,
  countByType,
  createHostel,
  deleteHostel,
  getAllHostel,
  getHostel,
  updateHostel,
} from "../controllers/hostels.controllers.js";
// import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHostel);
// UPDATE
router.put("/:id", verifyAdmin, updateHostel);
// DELETE
router.delete("/:id", verifyAdmin, deleteHostel);
// GET
router.get("/find/:id", getHostel);
// GET ALL
router.get("/", getAllHostel);
router.get("/countByAddress", countByAddress);
router.get("/countByType", countByType);

export default router;
