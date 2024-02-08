import express from "express";
import Room from "../models/rooms.models.js";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom } from "../controllers/rooms.controllers.js";
// import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createRoom);
// UPDATE
router.put("/:id", verifyAdmin,updateRoom);
// DELETE
router.delete("/:id", verifyAdmin, deleteRoom);
// GET
router.get("/:id", getRoom);
// GET ALL
router.get("/", getAllRoom);

export default router;