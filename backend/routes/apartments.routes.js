import express from "express";
import Apartment from "../models/apartments.models.js";
import { countByAddress, countByType, createApartment, deleteApartment, getAllApartment, getApartment, updateApartment } from "../controllers/apartments.controllers.js";
// import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createApartment);
// UPDATE
router.put("/:id", verifyAdmin,updateApartment);
// DELETE
router.delete("/:id", verifyAdmin, deleteApartment);
// GET
router.get("/find/:id", getApartment);
// GET ALL
router.get("/", getAllApartment);
router.get("/countByAddress", countByAddress);
router.get("/countByType", countByType);

export default router;